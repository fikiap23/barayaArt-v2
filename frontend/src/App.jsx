import './App.css'

import { Navigate, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import { createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import RegisterPage from './Pages/RegisterPage'
import { SettingPage } from './Pages/SettingPage'

function App() {
  const user = useRecoilValue(userAtom)
  // console.log(user)

  const Route = createBrowserRouter([
    {
      path: '/register',
      element: user ? <Navigate to={'/'} /> : <RegisterPage />,
    },
    {
      path: '/login',
      element: user ? <Navigate to={'/'} /> : <LoginPage />,
    },
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: '/',
          element: <HomePage comName="Random" />,
        },
        {
          path: '/following',
          element: <HomePage comName="people" />,
        },
        {
          path: '/ai_art',
          element: <HomePage comName="ai art" />,
        },
        {
          path: '/wallpaper',
          element: <HomePage comName="Wallpaper" />,
        },
        {
          path: '/3dranders',
          element: <HomePage comName="3D Randers" />,
        },
        {
          path: '/travel',
          element: <HomePage comName="Travel" />,
        },
        {
          path: '/nature',
          element: <HomePage comName="Nature" />,
        },
        {
          path: '/streetphotography',
          element: <HomePage comName="Street Photography" />,
        },
        {
          path: '/experimental',
          element: <HomePage comName="Experimental" />,
        },
        {
          path: '/textures-patterns',
          element: <HomePage comName="Textures & Patterns" />,
        },
        {
          path: '/animals',
          element: <HomePage comName="Animals" />,
        },
        {
          path: '/architecture-interiors',
          element: <HomePage comName="Architecture & Interiors" />,
        },
        {
          path: '/fashion-beauty',
          element: <HomePage comName="Fashion & Beauty" />,
        },
        {
          path: '/flim',
          element: <HomePage comName="Flim" />,
        },
        {
          path: '/food-drink',
          element: <HomePage comName="Food & Drink" />,
        },
      ],
    },
    {
      path: '/u/:username',
      element: <ProfilePage />,
    },
    {
      path: 'settings',
      element: user ? <SettingPage /> : <LoginPage />,
    },
  ])

  return (
    <>
      <RouterProvider router={Route} user={user} />
      <ToastContainer />
    </>
  )
}

export default App
