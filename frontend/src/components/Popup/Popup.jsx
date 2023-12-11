/* eslint-disable react/prop-types */

import './Popup.css'
import { saveAs } from 'file-saver'
import { Link } from 'react-router-dom'
import Comment from '../Reactions/Comment'

const Popup = ({ handlePopup, handleHide }) => {
  const downloadImage = (image_url, image_name) => {
    saveAs(image_url, image_name) // Put your image URL here.
  }

  return (
    <div>
      {handlePopup?.id && (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full bg-white p-[10px] m-auto flex flex-col items-center rounded-[4px] z-10 overflow-auto  ">
          <div>
            <img
              className=" w-[400px] h-[500px] object-contain"
              src={handlePopup?.urls?.regular}
              alt={handlePopup?.description}
            />
          </div>
          <div className="closeBtn">
            <button
              className="downloadButton"
              title="close"
              onClick={() => handleHide()}
            >
              X
            </button>
          </div>
          <Link to={`/u/${handlePopup?.user?.username}`}>
            <div className="userInfo">
              <img src={handlePopup?.user?.profile_image?.medium} alt="user" />
              <div>
                <b>{handlePopup?.user?.name}</b>
                <p>{handlePopup?.user?.username}</p>
              </div>
            </div>
          </Link>
          <div className="additionalInfo p-4 border-t border-gray-300 w-full">
            <div className="downloadBtn w-fit ">
              <button
                className="downloadButton"
                title="close"
                onClick={() =>
                  downloadImage(
                    handlePopup?.urls?.regular,
                    handlePopup?.description
                  )
                }
              >
                Download
              </button>
            </div>
            <p className="text-gray-700">
              <span className="font-bold">Likes:</span> {handlePopup?.likes}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Description:</span>{' '}
              {handlePopup?.description}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Publish Time:</span>{' '}
              {handlePopup?.created_at}
            </p>
          </div>
          <div className="flex justify-evenly items-center w-full">
            <div className="flex">
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
                  <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
                </svg>
                195<span className="hidden md:inline">&nbsp;reactions</span>
              </a>
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
                20<span className="hidden md:inline">&nbsp;comments</span>
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
          <Comment></Comment>
        </div>
      )}
    </div>
  )
}

export default Popup
