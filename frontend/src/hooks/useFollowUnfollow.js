import { useState } from 'react'

import userAtom from '../atoms/userAtom'
import { useRecoilValue } from 'recoil'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const useFollowUnfollow = (user) => {
  const currentUser = useRecoilValue(userAtom)
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  )
  const [updating, setUpdating] = useState(false)

  const handleFollowUnfollow = async () => {
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
        toast(` Unfollowed ${user.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
        })
        user.followers.pop() // simulate removing from followers
      } else {
        toast(` Followed ${user.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
        })
        user.followers.push(currentUser?._id) // simulate adding to followers
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

  return { handleFollowUnfollow, updating, following }
}

export default useFollowUnfollow
