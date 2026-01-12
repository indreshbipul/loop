import React from 'react'

function mainpage() {
  return (

  <main className="flex-1 p-8 overflow-auto">
   
    {/* <!-- Products List --> */}

    <section id="productListSection" className="bg-white rounded-lg shadow-md p-6">
     <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Product List</h2>
        <div>
          <input type="search" id="searchInput" name="searchInput" placeholder="Search products..." className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"></input>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold transition">Search</button>
        </div>
     </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (₹)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Delete</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">

            {/* <!-- Sample Product Row --> */}

            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">classNameic Linen Shirt</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">Clothing</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">$79.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">25</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                {/* <!-- Placeholder: JS to open edit modal/form --> */}

              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-red-600 hover:text-red-900">Delete</button>
                {/* <!-- Placeholder: JS to confirm and delete product --> */}

              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">Elegant Wooden Chair</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">Home</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">$249.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">10</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>

  )
}

export default mainpage