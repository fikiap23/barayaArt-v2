import { useState } from 'react'
import usePreviewImg from '../../hooks/usePreviewImg'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
/* eslint-disable react/prop-types */
export const EditProfile = ({ user }) => {
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
  const [loading, setLoading] = useState(false)

  // Create a single state object for form fields
  const [formData, setFormData] = useState({
    name: user.name || '',
    profilePic: user.profilePic || '',
    username: user?.username || '',
    email: user?.email || '',
    // profession: '',
    // bio: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    console.log('Form Data:', formData)
  }

  const handleEditProfile = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          profilePic: imgUrl,
          username: formData.username,
          email: formData.email,
          // profession: formData.profession,
          // bio: formData.bio,
        }),
      })

      const data = await res.json()
      if (data.error) {
        console.log('Error', data.error, 'error')
        return
      }

      console.log('Success', 'Profile updated successfully', data)
      localStorage.setItem('user-baraya', JSON.stringify(data.user))
      toast.success('Profile updated successfully', {
        position: toast.POSITION.BOTTOM_CENTER,
      })

      setLoading(false)
    } catch (error) {
      console.log('Error', error, 'error')
      toast.error('Something went wrong', {
        position: toast.POSITION.BOTTOM_CENTER,
      })
      setLoading(false)
    }
  }
  return (
    <div>
      {' '}
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <img
                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                src={imgUrl || user.profilePic}
                alt="Bordered avatar"
              />

              <div className="flex flex-col space-y-5 sm:ml-8">
                <label
                  htmlFor="profilePic"
                  className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer"
                >
                  Change picture
                  <input
                    type="file"
                    id="profilePic"
                    name="newProfilePic"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>

                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                  onClick={() => setImgUrl('')}
                >
                  Delete picture
                </button>
              </div>
            </div>

            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="full_name"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your full name
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="name"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your full name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your username"
                    onChange={handleChange}
                    name="username"
                    value={formData.username}
                    required
                  />
                </div>
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="your.email@mail.com"
                  onChange={handleChange}
                  name="email"
                  value={user?.email}
                  required
                />
              </div>

              {/* <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="profession"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="your profession"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Bio
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                  placeholder="Write your bio here..."
                ></textarea>
              </div> */}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleEditProfile}
                  className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  {loading ? 'Loading...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
