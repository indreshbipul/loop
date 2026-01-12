import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";

import AddressCard from "../components/checkoutAddressCard.jsx"
import useAuthHook from "../hooks/authHook.jsx";
import productService from "../services/productServices.jsx";

function checkout() {
    const [address, setAddress] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const { userData } = useAuthHook();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (userData && !userData?.isLoggedIn) {
            navigate('/signin');
        }
    }, [userData, navigate]);

    useEffect(() => {
    if (userData?.user?._id) {
      productService.getCartitems(userData.user._id)
        .then((data) => {
          setCartItems(data.cart);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
          navigate('/error');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userData, navigate]);

  if (!userData || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500 border-solid mb-2"></div>
        <div className="text-purple-600 text-center">Loading...</div>
      </div>
    );
  }

  //total price calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.variants[item.variant].price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const shipping = (subtotal ) <= 500 ? 50 : 0; 
  const total = subtotal + shipping + tax;


  return (
    <>
        <div className="min-h-screen flex flex-col font-sans text-gray-700">
            {/* <!-- Page Hero --> */}
            <section className="max-w-6xl mx-auto px-6 sm:px-10 py-10 sm:py-16 text-center">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 select-none leading-tight">Secure Checkout</h1>
                <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto">Review your order, select your shipping address, choose a payment method, and complete your purchase securely.</p>
            </section>

            {/* <!-- Main Checkout Container --> */}
            <main className="mx-auto px-4 sm:px-10 pb-10 sm:pb-20 flex-grow flex flex-col gap-10 sm:gap-20 max-w-6xl">

                {/* <!-- Top Section: Address (left) & Order Summary (right) --> */}
                <section className="flex flex-col md:flex-row gap-8 md:gap-14 w-full">
                
                {/* <!-- Shipping Address --> */}
                <section aria-labelledby="shipping-address-heading" className="w-full md:w-1/2 flex-1 bg-white rounded-3xl shadow-md p-5 sm:p-10">
                    <h2 id="shipping-address-heading" className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 sm:mb-10 select-none">Shipping Address</h2>
                    <form className="space-y-6 sm:space-y-8">
                    <fieldset className="space-y-4 sm:space-y-6">
                        <legend className="sr-only">Select Shipping Address</legend>
                        < AddressCard />    

                    </fieldset>
                    <button type="button" className="mt-6 sm:mt-8 w-full bg-black text-white text-base sm:text-lg font-semibold rounded-3xl py-3 sm:py-4 hover:bg-gray-900 transition focus:outline-none focus:ring-4 focus:ring-black/60"
                    onClick={() => {
                        navigate('/add_address');
                    }}>
                        Add New Address
                    </button>
                    </form>
                </section>

                {/* <!-- Order Summary  --> */}
                <aside aria-labelledby="order-summary-heading" className="w-full md:max-w-md bg-white rounded-3xl shadow-md p-5 sm:p-10 flex flex-col mt-6 md:mt-0">
                    <h2 id="order-summary-heading" className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-10 text-gray-900 select-none">Order Summary</h2>
                     <ul role="list" className="divide-y divide-gray-200 mb-8 sm:mb-12 flex-grow">
                        {cartItems.map((item, index) => {
                            return(
                                    <li key={index} className="py-4 sm:py-6 flex justify-between items-start">
                                        <div>
                                        <p className="font-semibold text-gray-900 text-base sm:text-lg leading-snug">{item?.product?.title}</p>
                                        <p className="text-gray-500 text-xs sm:text-sm mt-1">Serial No : {item?.product.serialNumber ? item.product.serialNumber : 'NA'}</p>
                                        <p className="text-gray-500 text-xs sm:text-sm mt-1">Qty: {item?.quantity}</p>
                                        <p className="text-gray-400 text-xs mt-1 flex flex-col sm:flex-row gap-5">
                                            <span>Color: {item?.product?.variants[item.variant].color ? item.product.variants[item.variant].color : 'NA'}</span>
                                            <span>Size: {item?.product?.variants[item.variant].size ? item.product.variants[item.variant].size : 'NA'}</span>

                                        </p>
                                        </div>
                                        <p className="font-semibold text-gray-900 text-base sm:text-lg">₹{item?.product.variants[item.variant].price}</p>
                                    </li>
                            )
                        }
                        )}
                    </ul>

                    <div className="border-t border-gray-200 pt-6 sm:pt-8 space-y-3 sm:space-y-4">
                    <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                        <span>Subtotal (Without Taxes)</span>
                        <span>₹ {(subtotal).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                        <span>Tax</span>
                        <span>₹ {(tax).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                        <span>Shipping Charge</span>
                        <span>₹ {(subtotal * 1.05).toFixed(2) <= 500 ? 50 : 0}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-semibold text-lg sm:text-xl">
                        <span>Total</span>
                        <span>{total.toFixed(2)}</span>
                    </div>
                    </div>
                </aside>
                </section>

                {/* <!-- Payment Options  --> */}
                <section aria-labelledby="payment-options-heading" className="bg-white rounded-3xl shadow-md p-4 sm:p-10 max-w-7xl mx-auto w-full mt-6">
                <h2 id="payment-options-heading" className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 sm:mb-8 select-none max-w-3xl mx-auto text-center">Payment Options</h2>

                {/* <!-- Options Tabs --> */}
                <div className="max-w-3xl mx-auto flex flex-wrap gap-3 sm:gap-5 justify-center" role="tablist" aria-label="Payment Methods">
                    <button id="tab-card" type="button" role="tab" aria-controls="panel-card" aria-selected="false"  tabIndex="0"
                    className="pay-tab border border-gray-300 rounded-3xl py-4 px-8 font-semibold text-gray-900 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-black/60 transition flex items-center gap-3 cursor-pointer"
                    onClick = {()=>{
                        document.getElementById("cardpayment").classList.remove("hidden");
                        document.getElementById("netbanking").classList.add("hidden");
                        document.getElementById("paylater").classList.add("hidden");
                        document.getElementById("emipayment").classList.add("hidden");
                        document.getElementById("upipayment").classList.add("hidden");                        
                        document.getElementById("tab-card")?.setAttribute("aria-selected", "true");
                    }}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
                        <path d="M2 11h20" />
                        <path d="M7 7v4" />
                    </svg>
                    Credit / Debit Card
                    </button>
                    <button id="tab-netbanking" type="button" role="tab" aria-controls="panel-netbanking" aria-selected="false" tabIndex="-1"
                    className="pay-tab border border-gray-300 rounded-3xl py-4 px-8 font-semibold text-gray-700 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-black/30 transition flex items-center gap-3 cursor-pointer"
                    onClick = {()=>{
                        document.getElementById("cardpayment").classList.add("hidden");
                        document.getElementById("netbanking").classList.remove("hidden");
                        document.getElementById("paylater").classList.add("hidden");
                        document.getElementById("emipayment").classList.add("hidden");
                        document.getElementById("upipayment").classList.add("hidden");                        
                        document.getElementById("tab-netbanking")?.setAttribute("aria-selected", "true");
                    }}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 10h18" />
                        <path d="M5 10v8" />
                        <path d="M9 10v8" />
                        <path d="M15 10v8" />
                        <path d="M19 10v8" />
                        <path d="M3 18h18" />
                        <path d="M12 3L2 9h20L12 3z" />
                    </svg>

                    Netbanking
                    </button>
                    <button id="tab-upi" type="button" role="tab" aria-controls="panel-upi" aria-selected="false" tabIndex="-1"
                    className="pay-tab border border-gray-300 rounded-3xl py-4 px-8 font-semibold text-gray-700 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-black/30 transition flex items-center gap-3 cursor-pointer"
                    onClick = {()=>{
                        document.getElementById("cardpayment").classList.add("hidden");
                        document.getElementById("netbanking").classList.add("hidden");
                        document.getElementById("paylater").classList.add("hidden");
                        document.getElementById("emipayment").classList.add("hidden");
                        document.getElementById("upipayment").classList.remove("hidden");                        
                        document.getElementById("tab-upi")?.setAttribute("aria-selected", "true");
                    }}
                    >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> 
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 7h6M9 10h6M9 10c0 3 3 3 3 3H9m0 3h6" />
                        <path d="M15 16l2 2-2 2" />
                        <path d="M9 16l-2 2 2 2" />
                    </svg>
                    UPI
                    </button>
                    <button id="tab-paylater" type="button" role="tab" aria-controls="panel-paylater" aria-selected="false" tabIndex="-1"
                    className="pay-tab border border-gray-300 rounded-3xl py-4 px-8 font-semibold text-gray-700 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-black/30 transition flex items-center gap-3 cursor-pointer"
                    onClick = {()=>{
                        document.getElementById("cardpayment").classList.add("hidden");
                        document.getElementById("netbanking").classList.add("hidden");
                        document.getElementById("paylater").classList.remove("hidden");
                        document.getElementById("emipayment").classList.add("hidden");
                        document.getElementById("upipayment").classList.add("hidden");                        
                        document.getElementById("tab-paylater")?.setAttribute("aria-selected", "true");
                    }}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 6v6l4 2" />
                        <circle cx="12" cy="12" r="9" />
                    </svg>
                    PayLater
                    </button>
                    <button id="tab-emi" type="button" role="tab" aria-controls="panel-emi" aria-selected="false" tabIndex="-1"
                    className="pay-tab border border-gray-300 rounded-3xl py-4 px-8 font-semibold text-gray-700 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-black/30 transition flex items-center gap-3 cursor-pointer"
                    onClick = {()=>{
                        document.getElementById("cardpayment").classList.add("hidden");
                        document.getElementById("netbanking").classList.add("hidden");
                        document.getElementById("paylater").classList.add("hidden");
                        document.getElementById("emipayment").classList.remove("hidden");
                        document.getElementById("upipayment").classList.add("hidden");                        
                        document.getElementById("tab-emi")?.setAttribute("aria-selected", "true");
                    }}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M3 10h18" />
                        <circle cx="7" cy="14" r="1" />
                        <circle cx="12" cy="14" r="1" />
                        <circle cx="17" cy="14" r="1" />
                        <path d="M9 7h4M9 9h4M9 9c0 2 2 2 2 2H9" />
                    </svg>
                    EMI
                    </button>
                </div>

                {/* <!-- Payment Details --> */}

                {/* For Credit/ Debit Card */}
                <div className="hidden max-w-3xl mx-auto mt-6 sm:mt-8" id="cardpayment">
                    <div >
                        <form id="checkout-form" className="space-y-6 sm:space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <label className="flex flex-col text-gray-700 font-medium md:col-span-2">
                                Cardholder Name
                                <input type="text" name="cardname" placeholder="Jane Doe" autoComplete="cc-name" required
                                className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition" />
                            </label>
                            <label className="flex flex-col text-gray-700 font-medium md:col-span-2">
                                Card Number
                                <input type="text" name="cardnumber" placeholder="1234 5678 9012 3456" maxLength="19" inputMode="numeric" autoComplete="cc-number" required
                                className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition" />
                            </label>
                            <label className="flex flex-col text-gray-700 font-medium">
                                Expiration Date
                                <input type="text" name="expdate" placeholder="MM/YY" maxLength="5" inputMode="numeric" autoComplete="cc-exp" required
                                className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition" />
                            </label>
                            <label className="flex flex-col text-gray-700 font-medium">
                                CVV
                                <input type="password" name="cvv" placeholder="123" maxLength="4" inputMode="numeric" autoComplete="cc-csc" required
                                className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition" />
                            </label>
                            </div>
                        </form>
                    </div>                    
                </div>

                {/* for Netbanking */}
                <div className="hidden grid grid-cols-1 gap-4 sm:gap-6" id="netbanking">
                    <label className="flex flex-col text-gray-700 font-medium">
                        Bank Name
                        <select required className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition">
                        <option value="">Select your bank</option>
                        <option value="sbi">SBI</option>
                        <option value="hdfc">HDFC</option>
                        <option value="icici">ICICI</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak</option>
                        </select>
                    </label>
                    <label className="flex flex-col text-gray-700 font-medium">
                        Account Holder Name
                        <input type="text" name="netbankingName" placeholder="Full Name" required
                        className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition" />
                    </label>
                </div>

                {/* for paylater */}
                <div className=" hidden grid grid-cols-1 gap-4 sm:gap-6" id="paylater">
                    <label className="flex flex-col text-gray-700 font-medium">
                        Mobile Number
                        <input type="tel" name="paylaterMobile" placeholder="Enter your mobile number" required
                        className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition" />
                    </label>

                    <label className="flex flex-col text-gray-700 font-medium">
                        OTP
                        <input type="text" name="otp" placeholder="Enter OTP" required
                        className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition" />
                    </label>
                </div>

                {/* for Emi  */}
                <div className="hidden grid grid-cols-1 gap-4 sm:gap-6" id="emipayment">
                    <label className="flex flex-col text-gray-700 font-medium">
                        Card Type
                        <select name="emiCardType" required
                        className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition">
                        <option value="">Select Card Type</option>
                        <option value="credit">Credit Card</option>
                        <option value="debit">Debit Card</option>
                        </select>
                    </label>
                    <label className="flex flex-col text-gray-700 font-medium">
                        Card Number
                        <input type="text" name="emiCardNumber" placeholder="1234 5678 9012 3456" maxLength="19" inputMode="numeric" required
                        className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition" />
                    </label>
                    <label className="flex flex-col text-gray-700 font-medium">
                        Select Bank
                        <select name="emiBank" required
                        className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition">
                        <option value="">Select Bank</option>
                        <option value="hdfc">HDFC</option>
                        <option value="icici">ICICI</option>
                        <option value="axis">Axis Bank</option>
                        <option value="sbi">SBI</option>
                        <option value="kotak">Kotak</option>
                        </select>
                    </label>
                    <label className="flex flex-col text-gray-700 font-medium">
                        EMI Tenure
                        <select name="emiTenure" required
                        className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition">
                        <option value="">Select Tenure</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="9">9 Months</option>
                        <option value="12">12 Months</option>
                        </select>
                    </label>
                </div> {/* <-- This closing div was missing */}


                {/* For Upi payment */}
                <div className="hidden grid grid-cols-1 gap-4 sm:gap-6" id="upipayment">
                    <label className="flex flex-col text-gray-700 font-medium">
                        UPI ID
                        <input type="text" name="upiId" placeholder="yourname@bank" required
                        className="mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 transition" />
                    </label>
                </div>

                </section>

            </main>

            {/* <!-- Place Order button  --> */}
            <div className="max-w-6xl mx-auto px-4 sm:px-10 pb-10 sm:pb-20">
                <button type="submit" form="checkout-form" className="w-full max-w-md mx-auto block bg-black text-white text-lg sm:text-xl font-semibold rounded-3xl px-5 py-3 sm:py-4 hover:scale-110 transition focus:outline-none focus:ring-4 focus:ring-black/50">
                Place Order
                </button>
            </div>
        </div>

    </>
  )
}

export default checkout