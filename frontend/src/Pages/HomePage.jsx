/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import PhotoGallery from '../components/PhotoGallery/PhotoGallery'
import Popup from '../components/Popup/Popup'
import { MdKeyboardDoubleArrowUp } from 'react-icons/md'
import bg from '../assets/bg.jpeg'

const HomePage = ({ comName }) => {
  const [photos, setPhotos] = useState([])
  const [popupArry, setPopupArry] = useState([])
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState(false)
  // const [currentPage, setCurrentPage] = useState(1)
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    setShowScrollToTop(window.scrollY > 200)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.title = `BarayaArt | ${comName}`
    if (comName === 'Random') {
      fetchRequest()
    } else if (comName === 'people') {
      fetchFeedRequest()
    } else {
      fetchPostByCategory()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comName])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //         document.body.offsetHeight - 200 &&
  //       !loading
  //     ) {
  //       loadMoreData()
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [loading])

  // const loadMoreData = async () => {
  //   setLoading(true)

  //   try {
  //     const newData = await fetchNewData()
  //     setPhotos((prevPhotos) => [...prevPhotos, ...newData])
  //     setCurrentPage((prevPage) => prevPage + 1)
  //   } catch (error) {
  //     console.error('Error fetching new data', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const fetchRequest = async () => {
    const url = `/api/posts/`

    try {
      setLoading(true)
      const data = await fetch(url)
      const dataJ = await data.json()
      const result = dataJ.posts
      // console.log(result)
      setPhotos(result)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  const fetchFeedRequest = async () => {
    const url = `/api/posts/feed`

    try {
      setLoading(true)
      const data = await fetch(url)
      const dataJ = await data.json()

      // console.log(result)
      setPhotos(dataJ)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  const fetchPostByCategory = async () => {
    const url = `/api/posts/category/${comName}`

    try {
      setLoading(true)
      const data = await fetch(url)
      const dataJ = await data.json()
      const result = dataJ.posts
      // console.log(result)
      setPhotos(result)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  // const fetchNewData = async () => {
  //   const newUrl = `https://api.unsplash.com/search/photos?page=${
  //     currentPage + 1
  //   }&per_page=30&query=${featured}&client_id=7rZCr4g4T9pmpdZ9Chw8B60qfv6PotjqGkXE6uMAUyM`
  //   const response = await fetch(newUrl)
  //   const data = await response.json()
  //   return data.results
  // }

  const handlePopup = (event) => {
    let id = event?.target?.getAttribute('id')
    console.log('Id', id)

    let popupPhotos = photos?.filter((photo) => photo?.image_public_id === id)
    // console.log('popupPhotos', popupPhotos[0])
    setPopupArry(popupPhotos[0])
    setToggle(true)
  }

  const handleHide = () => {
    setToggle(false)
  }

  return (
    <>
      <Header />

      <div className="hero">
        {
          <div
            className="hero_bannar"
            style={{
              background: `linear-gradient( #00000060, #000000c7), url('${
                comName === 'Random' ? bg : photos[0]?.image
              }')`,
            }}
          >
            <div className="hero_banner_text">
              <h1>Baraya Art</h1>
              <p>{photos[16]?.alt_description}</p>
              <button>Search to {comName}</button>
            </div>
          </div>
        }
      </div>
      {/* Use the Gallery component */}
      <PhotoGallery photos={photos} handlePopup={handlePopup} />
      {loading && <p>Loading...</p>}
      {toggle && (
        <div className="popudp">
          <Popup handlePopup={popupArry} handleHide={handleHide} />
        </div>
      )}

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
        >
          <MdKeyboardDoubleArrowUp size={30} />
        </button>
      )}
    </>
  )
}

export default HomePage
