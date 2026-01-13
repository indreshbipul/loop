function addressCard() {
  return (
    <>
        <label className="flex cursor-pointer items-start rounded-2xl border border-gray-300 bg-white p-4 sm:p-6 shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-black/70">
            <input type="radio" name="shipping-address" value="home" className="mt-1 h-5 w-5 text-black border-gray-300 focus:ring-black/70"/>
                <div className="ml-4 sm:ml-6 text-gray-700">
                    <p className="font-semibold text-base sm:text-lg">Home</p>
                    <p>1234 Maple Street</p>
                    <p>Springfield, IL 62704</p>
                    <p>United States</p>
                </div>
        </label>
    </>
  )
}

export default addressCard