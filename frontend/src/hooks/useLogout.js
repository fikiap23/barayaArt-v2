import userAtom from '../atoms/userAtom'
import { useSetRecoilState } from 'recoil'

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom)

  const logout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      if (data.error) {
        console.log('Error', data.error, 'error')
        return
      }

      localStorage.removeItem('user-posivibes')
      setUser(null)
    } catch (error) {
      console.log('Error', error, 'error')
    }
  }

  return logout
}

export default useLogout
