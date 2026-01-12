import MyOrderCard from "../components/myOrderCard"

function myorders() {
  return (
    <>
    <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] text-gray-700 font-sans min-h-screen flex flex-col">

        {/* <!-- Main Content --> */}
        <main className="flex-grow max-w-7xl mx-auto px-6 pt-16 pb-20 w-full">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 select-none">My Orders</h1>
          <p className="text-lg text-gray-500 mb-12 max-w-xl">Review your recent purchases and track order status.</p>

          <section className="grid gap-8">
            {/* <!--Order Card --> */}
            <MyOrderCard />
            
          </section>
        </main>
      </div>

    </>
  )
}

export default myorders