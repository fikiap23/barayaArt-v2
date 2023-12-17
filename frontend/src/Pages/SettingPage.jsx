import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import CreatePost from '../components/Reactions/CreatePost'
import { DropdownMenu } from '../components/Reactions/DropdownMenu'
import logoImage from '../assets/logo.png'
import { EditProfile } from '../components/Settings/EditProfile'

export const SettingPage = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const user = useRecoilValue(userAtom)
  // console.log(user)

  const inputValue = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      {/*  */}
      <div className="px-8  mb-3 md:mb-5">
        <div className="flex justify-between items-center w-full">
          <div className="w-[45px] flex items-center">
            <img
              src={logoImage}
              alt="logo"
              className="cursor-pointer"
              onClick={() => navigate('/')}
            />
            <div>
              <form className="search">
                <input
                  className="outline-none rounded-[50px] ml-[15px] px-[7px] py-[15px]"
                  id="top"
                  onChange={inputValue}
                  placeholder="Photos, people, or groups"
                  type="text"
                />
              </form>
            </div>
          </div>

          <div className="flex gap-8 ">
            <div className="md:flex align-center hidden items-center">
              {user ? (
                <button>Adversite</button>
              ) : (
                <Link to="/login">
                  <button>Login</button>
                </Link>
              )}
            </div>
            <div className="items-center user md:flex align-center hidden">
              {user ? (
                <CreatePost></CreatePost>
              ) : (
                <Link to="/register">
                  <button>Register</button>
                </Link>
              )}
              {user && (
                <Link to={`/u/${user.username}`}>
                  {' '}
                  <img
                    src={user.profilePic}
                    className="text-[35px] text-[#bebebe] ml-[20px] w-10 h-10 rounded-full cursor-pointer"
                  />
                </Link>
              )}
            </div>

            <DropdownMenu></DropdownMenu>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
            <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
            >
              Pubic Profile
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
            >
              Account Settings
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
            >
              Notifications
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
            >
              PRO Account
            </a>
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <EditProfile user={user}></EditProfile>
        </main>
      </div>
    </>
  )
}
