import { useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import { useSetRecoilState } from 'recoil'
import userAtom from '../../atoms/userAtom'

export const DropdownMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const setUser = useSetRecoilState(userAtom)

  const handleLogout = async () => {
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

      localStorage.removeItem('user-baraya')
      setUser(null)
      console.log('Success', 'Logged out successfully', 'success')
    } catch (error) {
      console.log('Error', error, 'error')
    }
  }

  return (
    <>
      <IoMenu
        className="text-[35px] lg:flex align-center cursor-pointer"
        onClick={toggle}
      />

      {/* <!-- Dropdown menu --> */}
      {dropdownOpen && (
        <div
          id="dropdown"
          className="z-10 absolute top-20 right-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
