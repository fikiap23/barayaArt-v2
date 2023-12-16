/* eslint-disable react/prop-types */
// Gallery.js
import { useState } from 'react'
import { GoDownload } from 'react-icons/go'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { saveAs } from 'file-saver'
import { FiMoreHorizontal } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const PhotoGallery = ({ photos, handlePopup }) => {
  const [hoveredPhoto, setHoveredPhoto] = useState(null)
  const downloadImage = (image_url, image_name) => {
    saveAs(image_url, image_name) // Put your image URL here.
  }

  // console.log(photos)

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 576: 2, 768: 3 }}>
      <Masonry gutter="10px">
        {photos?.map((photo) => (
          <>
            {/* {console.log(photo)} */}
            <div className="md:hidden flex justify-between items-center px-3">
              <Link to={`/u/${photo?.postedBy?.username}`}>
                <div className="flex items-center gap-3">
                  <img
                    src={photo?.postedBy?.profilePic}
                    alt={photo?.postedBy?.profilePic}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-black ">{photo?.postedBy?.name}</p>
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
                    <Link to={`/u/${photo?.postedBy?.username}`}>
                      <div className="flex items-center gap-3 ">
                        <img
                          src={photo?.postedBy?.profilePic}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                        <p className="text-white font-bold">
                          {photo?.postedBy?.name}
                        </p>
                      </div>
                    </Link>
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center cursor-pointer mr-[30px]">
                      <GoDownload
                        className="text-black text-3xl"
                        onClick={() =>
                          downloadImage(photo?.image, photo?.description)
                        }
                      />
                    </div>
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

export default PhotoGallery
