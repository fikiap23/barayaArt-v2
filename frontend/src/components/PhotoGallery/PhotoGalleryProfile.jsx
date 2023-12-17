/* eslint-disable react/prop-types */
// Gallery.js
import { useState } from 'react'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { FiMoreHorizontal } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { AlertDownload } from '../Reactions/AlertDownload'

const PhotoGalleryProfile = ({ photos, handlePopup, userData }) => {
  const [hoveredPhoto, setHoveredPhoto] = useState(null)

  console.log(userData.username)

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 576: 2, 768: 3 }}>
      <Masonry gutter="10px">
        {photos?.map((photo) => (
          <>
            {/* {console.log(photo)} */}
            <div className="md:hidden flex justify-between items-center px-3">
              <Link to={`/u/${userData.username}`}>
                <div className="flex items-center gap-3">
                  <img
                    src={userData.profilePic}
                    alt={userData.profilePic}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-black ">{userData.name}</p>
                </div>
              </Link>
              <FiMoreHorizontal className="text-black text-2xl" />
            </div>

            <div
              key={photo?.image_public_id}
              className={`relative transition-opacity duration-300 ease-in-out ${
                hoveredPhoto === photo ? 'opacity-80' : 'opacity-100'
              }`}
              onMouseEnter={() => setHoveredPhoto(photo)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <img
                id={photo?.image_public_id}
                onClick={handlePopup}
                className="rounded-lg"
                src={photo?.image}
                alt={photo?.description}
                loading="lazy"
              />
              {hoveredPhoto === photo && (
                <div className="hidden md:block absolute bottom-5 left-5 items-center w-full  ">
                  {/* avatar */}
                  <div className="flex items-center justify-between ">
                    <Link to={`/u/${userData.username}`}>
                      <div className="flex items-center gap-3 ">
                        <img
                          src={userData.profilePic}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                        <p className="text-white font-bold">{userData.name}</p>
                      </div>
                    </Link>
                    <AlertDownload
                      image_url={photo?.image}
                      image_name={photo?.description}
                    ></AlertDownload>
                  </div>
                </div>
              )}
            </div>
          </>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}

export default PhotoGalleryProfile
