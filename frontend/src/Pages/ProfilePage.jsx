/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header'

import bg from '../assets/bg.jpeg'
import noProfile from '../assets/profile.png'
import PhotoGalleryProfile from '../components/PhotoGallery/PhotoGalleryProfile'
import PopupImgProfile from '../components/Popup/PopupImgProfile'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const ProfilePage = () => {
  const [photos, setPhotos] = useState([])
  const [popupArry, setPopupArry] = useState([])
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState(false)

  const [updating, setUpdating] = useState(false)
  const currentUser = useRecoilValue(userAtom)

  const { username } = useParams()
  const [userData, setuserData] = useState({})
  const [following, setFollowing] = useState(
    currentUser?.following?.includes(userData?._id)
  )

  const handleFollowUnfollow = async (user) => {
    if (!currentUser) {
      toast.error('Please login to follow', {
        position: toast.POSITION.BOTTOM_CENTER,
      })
      return
    }
    if (updating) return

    setUpdating(true)
    try {
      const res = await fetch(
        `/api/users/follow/${user._id ? user._id : user.userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
      if (data.error) {
        toast.error(data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
        })
        return
      }

      if (following) {
        toast.success(` Unfollowed ${user.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
        })
        user.followers.pop()
      } else {
        toast.success(` Followed ${user.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
        })
        user.followers.push(currentUser?._id)
      }
      setFollowing(!following)

      console.log(data)
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {
    const fetchPostByUser = async () => {
      try {
        setLoading(true)
        const url = `/api/posts/user/${username}`
        const response = await fetch(url)
        const newData = await response.json()
        setuserData(newData.userData)
        setPhotos(newData.postData)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching more data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPostByUser()
  }, [username])

  useEffect(() => {
    setFollowing(userData.followers?.includes(currentUser?._id))
  }, [currentUser?._id, userData.followers])

  const handlePopup = (event) => {
    let id = event?.target?.getAttribute('id')
    console.log('Id', id)

    let popupPhotos = photos?.filter((photo) => photo?.image_public_id === id)
    // console.log('popupPhotos', popupPhotos[0])
    setPopupArry(popupPhotos[0])
    setToggle(true)
  }

  const handleHide = () => {
    setToggle(false)
  }

  return (
    <>
      <Header />
      {/* Hero Start*/}
      <div
        className="w-full h-[200px] md:h-[350px] bg-cover bg-center bg-no-repeat hero_bannar "
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="flex items-center gap-5 relative top-[80px] left-0  md:top-[180px] md:left-[130px] w-fit text-white font-medium">
          <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] bg-white overflow-hidden  rounded-full shadow-xl shadow-black">
            <img
              src={userData?.profilePic || noProfile}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl">{userData?.name}</h1>
            <div className="flex gap-2 md:gap-4 lg:gap-8">
              <p>@{userData?.username}</p>
              <p>
                {userData.followers
                  ? `${userData.followers.length} followers`
                  : 'Loading followers...'}{' '}
              </p>
              <p>
                {userData.following
                  ? `${userData.following.length} following`
                  : 'Loading following...'}{' '}
              </p>
            </div>
            {userData && currentUser?._id !== userData?._id && (
              <button
                onClick={() => handleFollowUnfollow(userData)}
                type="button"
                className="text-white bg-gradient-to-r mt-5 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                {following ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Hero End */}

      {/* Tabs Start*/}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 text-gray-600 overflow-x-auto">
        <ul
          className="flex flex-nowrap md:ml-8 md:gap-8 -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-black"
              id="about-tab"
              data-tabs-target="#about"
              type="button"
              role="tab"
              aria-controls="about"
              aria-selected="false"
            >
              About
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-black hover:border-gray-300 dark:hover:text-gray-300"
              id="photostream-tab"
              data-tabs-target="#photostream"
              type="button"
              role="tab"
              aria-controls="photostream"
              aria-selected="false"
            >
              Photostream
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg text-black border-black dark:hover:text-gray-300"
              id="albums-tab"
              data-tabs-target="#albums"
              type="button"
              role="tab"
              aria-controls="albums"
              aria-selected="false"
            >
              Albums
            </button>
          </li>
          <li role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-black hover:border-gray-300 dark:hover:text-gray-300"
              id="favorites-tab"
              data-tabs-target="#favorites"
              type="button"
              role="tab"
              aria-controls="favorites"
              aria-selected="false"
            >
              Favorites
            </button>
          </li>
          <li role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-black hover:border-gray-300 dark:hover:text-gray-300"
              id="galleries-tab"
              data-tabs-target="#galleries"
              type="button"
              role="tab"
              aria-controls="galleries"
              aria-selected="false"
            >
              Galleries
            </button>
          </li>
          <li role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-black hover:border-gray-300 dark:hover:text-gray-300"
              id="groups-tab"
              data-tabs-target="#groups"
              type="button"
              role="tab"
              aria-controls="groups"
              aria-selected="false"
            >
              Groups
            </button>
          </li>
          <li role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-black hover:border-gray-300 dark:hover:text-gray-300"
              id="stats-tab"
              data-tabs-target="#stats"
              type="button"
              role="tab"
              aria-controls="stats"
              aria-selected="false"
            >
              Stats
            </button>
          </li>
          <li role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-black hover:border-gray-300 dark:hover:text-gray-300"
              id="gears-tab"
              data-tabs-target="#gears"
              type="button"
              role="tab"
              aria-controls="gears"
              aria-selected="false"
            >
              Gears
            </button>
          </li>
        </ul>
      </div>
      <div id="default-tab-content">
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{' '}
            <strong className="font-medium text-gray-800 dark:text-white">
              About tabs associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="photostream"
          role="tabpanel"
          aria-labelledby="photostream-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{' '}
            <strong className="font-medium text-gray-800 dark:text-white">
              photostream tabs associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="albums"
          role="tabpanel"
          aria-labelledby="albums-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{' '}
            <strong className="font-medium text-gray-800 dark:text-white">
              albums tabs associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="favorites"
          role="tabpanel"
          aria-labelledby="favorites-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{' '}
            <strong className="font-medium text-gray-800 dark:text-white">
              favorites tabs associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
      </div>
      {/* Tabs End */}

      {/* Use the Gallery component */}
      <PhotoGalleryProfile
        photos={photos}
        handlePopup={handlePopup}
        userData={userData}
      />
      {loading && <p>Loading...</p>}
      {toggle && (
        <div className="popudp">
          <PopupImgProfile
            handlePopup={popupArry}
            handleHide={handleHide}
            userData={userData}
          />
        </div>
      )}
    </>
  )
}

export default ProfilePage
