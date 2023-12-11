/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import PhotoGallery from '../components/PhotoGallery/PhotoGallery'
import Popup from '../components/Popup/Popup'
import bg from '../assets/bg.jpeg'

const ProfilePage = () => {
  const [photos, setPhotos] = useState([])
  const [popupArry, setPopupArry] = useState([])
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState(false)

  const { username } = useParams()
  const [usernameData, setUsernameData] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://api.unsplash.com/users/${username}?client_id=7rZCr4g4T9pmpdZ9Chw8B60qfv6PotjqGkXE6uMAUyM`
      )
      const data = await response.json()

      setUsernameData(data)
    }

    const fetchMoreData = async () => {
      setLoading(true)

      try {
        const url = `https://api.unsplash.com/users/${username}/photos?&per_page=100&client_id=7rZCr4g4T9pmpdZ9Chw8B60qfv6PotjqGkXE6uMAUyM`
        const response = await fetch(url)
        const newData = await response.json()
        // console.log(newData)

        setPhotos(newData)
      } catch (error) {
        console.error('Error fetching more data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
    fetchMoreData()
  }, [username])

  const handlePopup = (event) => {
    let id = event?.target?.getAttribute('id')
    let popupPhotos = photos?.filter((photo) => photo?.id === id)
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
          <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] overflow-hidden bg-[#686868] rounded-full shadow-xl shadow-black">
            <img
              src={usernameData?.profile_image?.large}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl">{usernameData?.name}</h1>
            <div className="flex  gap-2 md:gap-4 lg:gap-8">
              <p>@{usernameData?.username}</p>
              <p>{usernameData?.followers_count} Followers</p>
              <p>{usernameData?.following_count} Following</p>
            </div>
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
      <PhotoGallery photos={photos} handlePopup={handlePopup} />
      {loading && <p>Loading...</p>}
      {toggle && (
        <div onClick={handleHide} className="popudp">
          <Popup handlePopup={popupArry} />
        </div>
      )}
    </>
  )
}

export default ProfilePage
