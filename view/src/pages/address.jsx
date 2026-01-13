import React from 'react'

function address() {
  return (
    <div class="bg-gray-50 min-h-screen p-6 flex justify-center items-start sm:items-center">
        <div class="max-w-6xl w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            
            {/* <!-- Address Card 1 --> */}
            <section aria-label="Saved address 1" class="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col">
            <header class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-900">Home</h2>
                <nav class="flex space-x-3">
                <button aria-label="Edit home address" type="button" class="p-2 rounded-md hover:bg-indigo-100 focus-visible-outline transition" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" role="img" aria-hidden="true">
                    <title>Edit Icon</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5h2m-2 6h2m-2 6h2M16.5 3.5l4 4L8 20l-4 1 1-4L16.5 3.5z" />
                    </svg>
                </button>
                <button aria-label="Delete home address" type="button" class="p-2 rounded-md hover:bg-red-100 focus-visible-outline transition" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" role="img" aria-hidden="true">
                    <title>Delete Icon</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z" />
                    </svg>
                </button>
                </nav>
            </header>
            <address class="not-italic mt-4 text-gray-700 text-sm space-y-1 leading-relaxed flex-grow">
                <p>John Doe</p>
                <p>1234 Elm Street</p>
                <p>Apartment 56B</p>
                <p>Springfield, IL 62704</p>
                <p>United States</p>
                <p>Phone: <a href="tel:+11234567890" class="text-indigo-600 hover:underline focus-visible-outline" aria-label="Call John Doe at +1 (123) 456-7890">+1 (123) 456-7890</a></p>
            </address>
            </section>

            {/* <!-- Address Card 2 --> */}
            <section aria-label="Saved address 2" class="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col">
            <header class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-900">Office</h2>
                <nav class="flex space-x-3">
                <button aria-label="Edit office address" type="button" class="p-2 rounded-md hover:bg-indigo-100 focus-visible-outline transition" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" role="img" aria-hidden="true">
                    <title>Edit Icon</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5h2m-2 6h2m-2 6h2M16.5 3.5l4 4L8 20l-4 1 1-4L16.5 3.5z" />
                    </svg>
                </button>
                <button aria-label="Delete office address" type="button" class="p-2 rounded-md hover:bg-red-100 focus-visible-outline transition" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" role="img" aria-hidden="true">
                    <title>Delete Icon</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z" />
                    </svg>
                </button>
                </nav>
            </header>
            <address class="not-italic mt-4 text-gray-700 text-sm space-y-1 leading-relaxed flex-grow">
                <p>Mary Johnson</p>
                <p>4321 Oak Avenue</p>
                <p>Suite 105</p>
                <p>Oakland, CA 94607</p>
                <p>United States</p>
                <p>Phone: <a href="tel:+14085551234" class="text-indigo-600 hover:underline focus-visible-outline" aria-label="Call Mary Johnson at +1 (408) 555-1234">+1 (408) 555-1234</a></p>
            </address>
            </section>

            {/* <!-- Address Card 3 --> */}
            <section aria-label="Saved address 3" class="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col">
            <header class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-900">Parents' Home</h2>
                <nav class="flex space-x-3">
                <button aria-label="Edit parents' home address" type="button" class="p-2 rounded-md hover:bg-indigo-100 focus-visible-outline transition" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" role="img" aria-hidden="true">
                    <title>Edit Icon</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5h2m-2 6h2m-2 6h2M16.5 3.5l4 4L8 20l-4 1 1-4L16.5 3.5z" />
                    </svg>
                </button>
                <button aria-label="Delete parents' home address" type="button" class="p-2 rounded-md hover:bg-red-100 focus-visible-outline transition" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" role="img" aria-hidden="true">
                    <title>Delete Icon</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z" />
                    </svg>
                </button>
                </nav>
            </header>
            <address class="not-italic mt-4 text-gray-700 text-sm space-y-1 leading-relaxed flex-grow">
                <p>Robert Brown</p>
                <p>987 Pine Street</p>
                <p>Roseville, MN 55113</p>
                <p>United States</p>
                <p>Phone: <a href="tel:+16125559999" class="text-indigo-600 hover:underline focus-visible-outline" aria-label="Call Robert Brown at +1 (612) 555-9999">+1 (612) 555-9999</a></p>
            </address>
            </section>

        </div>
    </div>
  )
}

export default address