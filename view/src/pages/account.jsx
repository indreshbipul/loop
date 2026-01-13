import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import useAuthHook from '../hooks/authHook.jsx';

function account() {
    const navigate = useNavigate();
    const { userData } = useAuthHook();
    useEffect(() => {
            if (userData && !userData?.isLoggedIn) {
                navigate('/signin');
            }
        }, [navigate, userData]);
  return (
   <>
        <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] min-h-screen font-sans text-gray-700 flex flex-col">        

            {/* <!-- Main Content --> */}
            <main className="flex-grow max-w-7xl mx-auto px-6 pt-16 pb-20 w-full">
                <h1 className="text-5xl font-extrabold mb-12 select-none text-gray-900">Account</h1>

                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

                {/* <!-- Profile --> */}
                <Link to="/userprofile" className="group block bg-white rounded-xl shadow-sm p-8 cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-4 focus:ring-blue-400/40" aria-label="Profile">
                    <div className="flex items-center justify-center mb-6 text-blue-600 group-hover:text-blue-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-8 0v2" />
                    <circle cx="12" cy="7" r="4" />
                    </svg>

                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Profile</h2>
                    <p className="text-gray-500">Manage your personal information</p>
                </Link>

                {/* <!-- Wishlist --> */}
                <Link to="/mywishlist" className="group block bg-white rounded-xl shadow-sm p-8 cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-4 focus:ring-pink-400/40" aria-label="Wishlist">
                    <div className="flex items-center justify-center mb-6 text-pink-600 group-hover:text-pink-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s-6-4.35-9-8.25C1.5 9 3.5 5.25 7 5.25c1.76 0 3.22 1.1 4 2.3 0.78-1.2 2.24-2.3 4-2.3 3.5 0 5.5 3.75 4 7.5C18 16.65 12 21 12 21z" />
                    </svg>

                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-700 transition-colors">Wishlist</h2>
                    <p className="text-gray-500">View your favorite saved items</p>
                </Link>

                {/* <!-- Saved Payments --> */}
                <Link to="" className="group block bg-white rounded-xl shadow-sm p-8 cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-4 focus:ring-green-400/40" aria-label="Saved Payments">
                    <div className="flex items-center justify-center mb-6 text-green-600 group-hover:text-green-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
                        <path d="M2 11h20" />
                        <path d="M7 7v4" />
                    </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">Saved Payments</h2>
                    <p className="text-gray-500">Manage your saved payment methods</p>
                </Link>

                {/* <!-- Saved Addresses --> */}
                <Link to="/savedaddress" className="group block bg-white rounded-xl shadow-sm p-8 cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-4 focus:ring-purple-400/40" aria-label="Saved Addresses">
                    <div className="flex items-center justify-center mb-6 text-purple-600 group-hover:text-purple-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s-6-4.686-6-10a6 6 0 1112 0c0 5.314-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2.5" />
                    </svg>

                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">Saved Addresses</h2>
                    <p className="text-gray-500">Manage your shipping and billing addresses</p>
                </Link>

                {/* <!-- Cart --> */}
                <Link to="/cart" className="group block bg-white rounded-xl shadow-sm p-8 cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-4 focus:ring-yellow-400/40" aria-label="Cart">
                    <div className="flex items-center justify-center mb-6 text-yellow-600 group-hover:text-yellow-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h2l.4 2M7 13h11a1 1 0 00.96-.73L21 6H5.4" />
                    <circle cx="7" cy="20" r="1" />
                    <circle cx="18" cy="20" r="1" />
                    </svg>

                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">Cart</h2>
                    <p className="text-gray-500">View items in your shopping cart</p>
                </Link>

                {/* <!-- My Orders --> */}
                <Link to="/myorders" className="group block bg-white rounded-xl shadow-sm p-8 cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-4 focus:ring-indigo-400/40" aria-label="My Orders">
                    <div className="flex items-center justify-center mb-6 text-indigo-600 group-hover:text-indigo-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2l1 4h10l1-4M3 6h18l-1.68 13.39A2 2 0 0117.34 21H6.66a2 2 0 01-1.98-1.61L3 6z" />
                    <path d="M16 10a4 4 0 01-8 0" />
                    </svg>

                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">My Orders</h2>
                    <p className="text-gray-500">Review your previous orders</p>
                </Link>
                </section>

                {/* <!-- About Us Section --> */}
                <section aria-labelledby="about-heading" className="mt-20 p-12 bg-white rounded-xl shadow-sm  mx-auto text-center">
                <h2 id="about-heading" className="text-4xl font-extrabold mb-6 text-gray-900 flex items-center justify-center gap-3 select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="8" r="2" />
                    <path d="M4 16v-.5a2.5 2.5 0 012.5-2.5h1" />                    
                    <circle cx="18" cy="8" r="2" />
                    <path d="M20 16v-.5a2.5 2.5 0 00-2.5-2.5h-1" />                    
                    <circle cx="12" cy="10" r="3" />
                    <path d="M9 21v-2a3 3 0 013-3h0a3 3 0 013 3v2" />
                    </svg>



                    About Us
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    Loop is your trusted shopping partner committed to delivering quality products and top-notch customer service. Our mission is to make shopping simple, secure, and enjoyable for everyone.
                </p>
                </section>

                {/* <!-- Contact Us Section --> */}
                <section aria-labelledby="contact-heading" className="mt-20 p-12 bg-white rounded-xl shadow-sm mx-auto text-center">
                <h2 id="contact-heading" className="text-4xl font-extrabold mb-6 text-gray-900 flex items-center justify-center gap-3 select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 stroke-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75l-9.75 6.75L2.25 6.75" />
                    </svg>

                    Contact Us
                </h2>
                <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-4">
                    Email: <a to="mailto:support@Loop.com" className="text-blue-600 hover:underline focus:outline-none">support@Loop.com</a><br />
                    Phone: <a to="tel:+18005551234" className="text-blue-600 hover:underline focus:outline-none">+1 (800) 555-1234</a>
                    
                </p>
                <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
                    Our support team is available Monday to Friday, 9 AM - 5 PM EST.
                </p>
                </section>
            </main>
        </div>
   </>
  )
}

export default account