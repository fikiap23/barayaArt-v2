import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import usePreviewImg from '../../hooks/usePreviewImg'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import postsAtom from '../../atoms/postsAtom'
export default function CreatePost() {
  const [showModal, setShowModal] = useState(false)
  const [postText, setPostText] = useState('')
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(false)
  const { username } = useParams()
  const [posts, setPosts] = useRecoilState(postsAtom)

  const handleTextChange = (e) => {
    const inputText = e.target.value
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'
    setPostText(inputText)
    // console.log(postText)
  }

  const handleCreatePost = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postedBy: user._id,
          description: postText,
          image: imgUrl,
        }),
      })

      const data = await res.json()
      if (data.error) {
        console.log('Error', data.error, 'error')
        return
      }
      console.log('Success', 'Post created successfully', 'success')
      if (username === user.username) {
        setPosts([data, ...posts])
      }

      setPostText('')
      setImgUrl('')
      setShowModal(false)
      setLoading(false)
    } catch (error) {
      console.log('Error', error, 'error')
    }
  }

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        Submit a photo
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center overflow-auto flex fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-full max-w-3xl h-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create Post</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto w-full">
                  {/* form image */}
                  <section className="container w-full mx-auto items-center ">
                    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                      <div className="px-4 py-6">
                        <div
                          id="image-preview"
                          className={`max-w-sm p-6 mb-4 ${
                            imgUrl ? 'bg-gray-100' : 'bg-gray-200'
                          } border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer`}
                        >
                          <input
                            id="upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          <label htmlFor="upload" className="cursor-pointer">
                            {imgUrl ? (
                              <img
                                src={imgUrl}
                                className="max-h-48 rounded-lg mx-auto"
                                alt="Image preview"
                              />
                            ) : (
                              <div className="h-48 rounded-lg flex items-center justify-center text-gray-500">
                                No image preview
                              </div>
                            )}
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                              Upload picture
                            </h5>
                            <p className="font-normal text-sm text-gray-400 md:px-6">
                              Choose photo size should be less than{' '}
                              <b className="text-gray-600">2mb</b>
                            </p>
                            <p className="font-normal text-sm text-gray-400 md:px-6">
                              and should be in{' '}
                              <b className="text-gray-600">JPG, PNG, or GIF</b>{' '}
                              format.
                            </p>
                            <span
                              id="filename"
                              className="text-gray-500 bg-gray-200 z-50"
                            >
                              {imgUrl ? imgUrl.name : ''}
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="w-full">
                            <label
                              className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer"
                              htmlFor="upload"
                            >
                              <span className="text-center ml-2">Upload</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* form image end */}
                  {/* form description */}
                  <div className="flex justify-center items-center">
                    <textarea
                      className="w-[100%]  bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                      spellCheck="false"
                      placeholder="Describe everything about this post here"
                      value={postText}
                      onChange={handleTextChange}
                    ></textarea>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCreatePost}
                    style={{ color: 'white' }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
