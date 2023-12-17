/* eslint-disable react/prop-types */

export const CategoryPost = ({ selectedCategories, setSelectedCategories }) => {
  const categories = [
    'Random',
    'People',
    'AI Art',
    'Wallpaper',
    '3D Randers',
    'Travel',
    'Nature',
    'Street Photography',
    'Experimental',
    'Textures & Patterns',
    'Animals',
    'Architecture & Interiors',
    'Fashion & Beauty',
    'Flim',
    'Food & Drink',
    'Other',
  ]

  const handleCategoryChange = (event) => {
    const { value } = event.target

    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If the category is already selected, remove it
        return prevSelected.filter((category) => category !== value)
      } else {
        // If the category is not selected, add it
        return [...prevSelected, value]
      }
    })
    // console.log(selectedCategories)
  }

  //   const maxCategoriesPerRow = 4

  return (
    <>
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
        Category
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <input
              id={`${category.toLowerCase()}-checkbox-list`}
              type="checkbox"
              value={category}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            <label
              htmlFor={`${category.toLowerCase()}-checkbox-list`}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </>
  )
}
