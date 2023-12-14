import { useState } from 'react'

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setSelectedFile(file)
    } else {
      setSelectedFile(null)
    }
  }

  const handleImagePreviewClick = () => {
    document.getElementById('upload').click()
  }

  return (
    <section className="container w-full mx-auto items-center ">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
        <div className="px-4 py-6">
          <div
            id="image-preview"
            className={`max-w-sm p-6 mb-4 ${
              selectedFile ? 'bg-gray-100' : 'bg-gray-200'
            } border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer`}
            onClick={handleImagePreviewClick}
          >
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="upload" className="cursor-pointer">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  className="max-h-48 rounded-lg mx-auto"
                  alt="Image preview"
                />
              ) : (
                <div className="h-48 rounded-lg flex items-center justify-center text-gray-500">
                  No image preview
                </div>
              )}
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                Upload picture
              </h5>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                Choose photo size should be less than{' '}
                <b className="text-gray-600">2mb</b>
              </p>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                and should be in{' '}
                <b className="text-gray-600">JPG, PNG, or GIF</b> format.
              </p>
              <span id="filename" className="text-gray-500 bg-gray-200 z-50">
                {selectedFile ? selectedFile.name : ''}
              </span>
            </label>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full">
              <label
                className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer"
                htmlFor="upload"
              >
                <span className="text-center ml-2">Upload</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageUploader
