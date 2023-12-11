/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { FaUserCircle } from 'react-icons/fa'
import logoImage from '../../assets/logo.png'
import { IoMenu } from 'react-icons/io5'
const Header = ({ fetchReq }) => {
  const [search, setSearch] = useState('')
  const [activeItem, setActiveItem] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchReq(search)
  }

  const inputValue = (event) => {
    setSearch(event.target.value)
  }

  const handleItemClick = (index) => {
    setActiveItem(index)
  }

  return (
    <div className="px-8  mb-3 md:mb-5">
      <div className="flex justify-between items-center w-full">
        <div className="w-[45px] flex items-center">
          <img src={logoImage} alt="logo" />
          <div>
            <form onSubmit={handleSubmit} className="search">
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
          <div className="md:flex align-center hidden ">
            <button>Adversite</button>
          </div>
          <div className="items-center user md:flex align-center hidden">
            <button>Submit a photo</button>
            <Link to="/u/user">
              {' '}
              <FaUserCircle className="text-[35px] text-[#bebebe] ml-[20px]" />
            </Link>
          </div>
          <IoMenu className="text-[35px] lg:flex align-center hidden" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <ul className="flex justify-between w-[1170px] p-[4px]">
          <li
            className={activeItem === 0 ? 'active' : ''}
            onClick={() => handleItemClick(0)}
          >
            <Link to="/">Editorial</Link>
          </li>
          <li
            className={activeItem === 1 ? 'active' : ''}
            onClick={() => handleItemClick(1)}
          >
            <Link to="/following">Following</Link>
          </li>
          <li>|</li>
          <li
            className={activeItem === 2 ? 'active' : ''}
            onClick={() => handleItemClick(2)}
          >
            <Link to="/ai_art">AI Art</Link>
          </li>
          <li
            className={activeItem === 3 ? 'active' : ''}
            onClick={() => handleItemClick(3)}
          >
            <Link to="/wallpaper">Wallpaper</Link>
          </li>
          <li
            className={activeItem === 4 ? 'active' : ''}
            onClick={() => handleItemClick(4)}
          >
            <Link to="/3dranders">3D Renders</Link>
          </li>
          <li
            className={activeItem === 5 ? 'active' : ''}
            onClick={() => handleItemClick(5)}
          >
            <Link to="/travel">Travel</Link>
          </li>
          <li
            className={activeItem === 6 ? 'active' : ''}
            onClick={() => handleItemClick(6)}
          >
            <Link to="/nature">Nature</Link>
          </li>
          <li
            className={activeItem === 7 ? 'active' : ''}
            onClick={() => handleItemClick(7)}
          >
            <Link to="/streetphotography">Street Photography</Link>
          </li>
          <li
            className={activeItem === 8 ? 'active' : ''}
            onClick={() => handleItemClick(8)}
          >
            <Link to="/experimental">Experimental</Link>
          </li>
          <li
            className={activeItem === 9 ? 'active' : ''}
            onClick={() => handleItemClick(9)}
          >
            <Link to="/textures-patterns">Textures & Patterns</Link>
          </li>
          <li
            className={activeItem === 10 ? 'active' : ''}
            onClick={() => handleItemClick(10)}
          >
            <Link to="/animals">Animals</Link>
          </li>
          <li
            className={activeItem === 11 ? 'active' : ''}
            onClick={() => handleItemClick(11)}
          >
            <Link to="/architecture-interiors">Architecture & Interiors</Link>
          </li>
          <li
            className={activeItem === 12 ? 'active' : ''}
            onClick={() => handleItemClick(12)}
          >
            <Link to="/fashion-beauty">Fashion & Beauty</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
