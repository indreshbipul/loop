import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthHook from "../hooks/authHook";

function addAddres() {
    const { userData } = useAuthHook();
    const navigate = useNavigate();
    useEffect(() => {
            if (userData && !userData?.isLoggedIn) {
                navigate('/signin');
            }
        }, [navigate, userData]);
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans text-gray-700">
        {/* <!-- Hero Section --> */}
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
            <h1 className="text-[48px] font-extrabold text-gray-900 mb-4 select-none leading-tight">Add New Address</h1>
            <p className="text-lg max-w-xl mx-auto text-gray-500 leading-relaxed">Enter your shipping address details below to add a new delivery location.</p>
        </section>

        {/* <!-- Address Form --> */}
        <div className="flex-grow max-w-4xl mx-auto px-6 pb-20">
            <form className="bg-white rounded-3xl shadow-lg p-12 max-w-3xl mx-auto" novalidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <label className="flex flex-col text-gray-700 font-semibold">
                    Full Name
                    <input type="text" name="fullname" placeholder="Full Name" autocomplete="name" required
                        className="mt-3 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-black/60 transition" />
                    </label>
                    <label className="flex flex-col text-gray-700 font-semibold">
                    Phone Number
                    <input type="tel" name="phone" placeholder="+91 " autocomplete="tel" required
                        className="mt-3 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-black/60 transition" />
                    </label>
                    <label className="flex flex-col text-gray-700 font-semibold md:col-span-2">
                    Address
                    <input type="text" name="address1" placeholder="Address" autocomplete="street-address" required
                        className="mt-3 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-black/60 transition" />
                    </label>
                    <label className="flex flex-col text-gray-700 font-semibold">
                    City
                    <input type="text" name="city" placeholder="City" autocomplete="address-level2" required
                        className="mt-3 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-black/60 transition" />
                    </label>
                    <label className="flex flex-col text-gray-700 font-semibold">
                    State / Province
                    <input type="text" name="state" placeholder="State" autocomplete="address-level1" required
                        className="mt-3 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-black/60 transition" />
                    </label>
                    <label className="flex flex-col text-gray-700 font-semibold">
                    Pin Code
                    <input type="text" name="postalcode" placeholder="ex- 400001" autocomplete="postal-code" required
                        className="mt-3 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-black/60 transition" />
                    </label>
                    <label className="flex flex-col text-gray-700 font-semibold">
                    Type
                    <input type="text" name="postalcode" placeholder="Ex- Home, Office, Hostl" autocomplete="postal-code" required
                        className="mt-3 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-black/60 transition" />
                    </label>
                </div>
                <button type="submit"
                    className="mt-12 w-full bg-black text-white text-xl font-semibold rounded-3xl py-5 hover:bg-gray-900 transition focus:outline-none focus:ring-4 focus:ring-black/60">
                    Save Address
                </button>
            </form>
        </div>
    </div>
  )
}

export default addAddres