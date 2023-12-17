/* eslint-disable react/prop-types */

import { useState } from 'react'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const CreateComment = ({ postId }) => {
  const [textComment, setTextComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textComment }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        })
        setLoading(false)
        throw new Error(data.message || 'Failed to create comment')
      }

      toast.success('Comment created successfully', {
        position: toast.POSITION.BOTTOM_CENTER,
      })
      setTextComment('')
      setLoading(false)
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      })
      setLoading(false)
      // Handle error (e.g., show an error message to the user).
    }
  }

  return (
    <div className="w-[90%] mx-auto px-4">
      <form className="mb-6" onSubmit={handleCommentSubmit}>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          {loading ? 'Loading...' : 'Post Comment'}
        </button>
      </form>
    </div>
  )
}

export default CreateComment
