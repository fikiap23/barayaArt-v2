/* eslint-disable react/prop-types */

import './Popup.css'

import { Link } from 'react-router-dom'
import CreateComment from '../Reactions/CreateComment'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import { Comment } from '../Reactions/Comment'
import { AlertDownload } from '../Reactions/AlertDownload'
import postsAtom from '../../atoms/postsAtom'

const PopupImgProfile = ({ handlePopup, handleHide, userData }) => {
  const [comments, setComments] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useRecoilValue(userAtom)
  const [isLiking, setIsLiking] = useState(false)
  const [liked, setLiked] = useState(handlePopup.likes?.includes(user?._id))
  const [posts, setPosts] = useRecoilState(postsAtom)

  let [likeCount, setLikeCount] = useState(handlePopup?.likes?.length)
  const handleLikeAndUnlike = async () => {
    if (!user)
      return console.log(
        'Error',
        'You must be logged in to like a post',
        'error'
      )
    if (isLiking) return
    setIsLiking(true)
    try {
      const res = await fetch('/api/posts/like/' + handlePopup._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (data.error) return console.log('Error', data.error, 'error')

      if (!liked) {
        // add the id of the current user to handlePopup.likes array
        const updatedPosts = posts.map((p) => {
          if (p._id === handlePopup._id) {
            return { ...p, likes: [...p.likes, user._id] }
          }
          return p
        })
        setPosts(updatedPosts)
        setLikeCount(likeCount + 1)
      } else {
        // remove the id of the current user from handlePopup.likes array
        const updatedPosts = posts.map((p) => {
          if (p._id === handlePopup._id) {
            return {
              ...p,
              likes: p.likes.filter((id) => id !== user._id),
            }
          }
          return p
        })
        setPosts(updatedPosts)
        setLikeCount(likeCount - 1)
      }

      setLiked(!liked)
    } catch (error) {
      // console.log('Error', error.message, 'error')
    } finally {
      setIsLiking(false)
    }
  }

  useEffect(() => {
    const fetchRequest = async () => {
      const url = `/api/comments/${handlePopup?._id}`

      try {
        setLoading(true)
        const data = await fetch(url)
        const dataJ = await data.json()
        // console.log(dataJ.comments)
        const result = dataJ.comments
        //  console.log(result)
        setComments(result)
        // console.log(comments)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchRequest()
  }, [comments, handlePopup?._id])

  return (
    <div>
      {handlePopup?._id && (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full md:w-[70%] h-full bg-slate-100 p-[10px] m-auto flex flex-col items-center rounded-[4px] z-10 overflow-auto  ">
          <div className="flex justify-between items-center w-full p-4">
            <Link to={`/u/${userData?.username}`}>
              <div className="userInfo">
                <img
                  src={userData?.profilePic}
                  alt="user"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <b>{userData?.name}</b>
                  <p>{userData?.username}</p>
                </div>
              </div>
            </Link>
            <div className="closeBtn">
              <button
                className="downloadButton"
                title="close"
                onClick={() => handleHide()}
              >
                X
              </button>
            </div>
          </div>
          <div>
            <img
              className="object-contain"
              src={handlePopup?.image}
              alt={handlePopup?.description}
            />
          </div>

          <div className="additionalInfo p-4 border-t border-gray-300 w-full">
            <div className="flex items-center ">
              <AlertDownload
                image_url={handlePopup.image}
                image_name={handlePopup.description}
                isButton={true}
              ></AlertDownload>
            </div>
            <p className="text-gray-700">
              <span className="font-bold">Likes:</span>{' '}
              {likeCount ? likeCount : 0}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Description:</span>{' '}
              {handlePopup?.description}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Publish Time:</span>{' '}
              {handlePopup?.createdAt}
            </p>
          </div>
          <div className="flex justify-evenly items-center w-full">
            <div className="flex">
              <button
                onClick={() => handleLikeAndUnlike()}
                className="py-1 pl-1 pr-2 text-gray-600 text-sm rounded hover:bg-gray-100 hover:text-black"
              >
                <svg
                  className={`inline fill-current ${
                    liked ? 'text-red-500' : ''
                  }`}
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
                </svg>
                {likeCount ? likeCount : 0}
                <span className="hidden md:inline">&nbsp;reactions</span>
              </button>
              <a
                href="#"
                className="py-1 pl-1 pr-2 text-gray-600 text-sm rounded hover:bg-gray-100 hover:text-black"
              >
                <svg
                  className="inline fill-current"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
                </svg>
                {comments?.length}
                <span className="hidden md:inline">&nbsp;comments</span>
              </a>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="bg-gray-400 rounded text-sm px-3 py-2 text-current hover:text-black hover:bg-gray-500"
              >
                <span>Save</span>
              </button>
            </div>
          </div>
          <div className="flex justify-start items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
              Discussion
            </h2>
          </div>
          {user && <CreateComment postId={handlePopup._id}></CreateComment>}
          {comments?.length > 0 ? (
            comments?.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))
          ) : (
            <p>Be the first to comment</p>
          )}
        </div>
      )}
    </div>
  )
}

export default PopupImgProfile
