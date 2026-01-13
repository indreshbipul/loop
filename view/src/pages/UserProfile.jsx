import { useState, useEffect } from "react";
import useAuthHook from "../hooks/authHook";
import authService from "../services/authServices";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function UserProfile() {
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [updatedData, setUpdatedData] = useState("");
  const [userData, setUserData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { sessionData, setSessionData, setContext_Error } = useAuthHook();

  // Logic to generate initials from names
  const getInitials = () => {
    const first = userData?.firstName?.charAt(0) || "";
    const last = userData?.lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "??";
  };

  // --- useEffect remains untouched ---
  useEffect(() => {
    if (sessionData?.user) {
      authService.profile()
        .then(({ res, status }) => {
          if (status !== 200) {
            return setContext_Error({ req: "profile", message: res.message })
          }
          setUpdatedData("")
          setUserData(res.data)
        })
        .catch((error) => {
          setContext_Error({ req: "profile", message: "Server is not responding" })
        });
    }
  }, [sessionData])

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handelUpdateUserData = () => {
    if (updatedData) {
      setLoading(true)
      authService.updateUserData(updatedData)
        .then(({ res, status }) => {
          setLoading(false)
          if (status === 401) {
            authService.userLogout()
            setSessionData(null)
            setUserData("")
            navigate('/signin')
          }
          if (status !== 200) {
            return setError(res.message)
          }
          setError("")
          setUserData(res.data)
          setSessionData({
            user: {
              firstName: res.data.firstName,
              email: res.data.email
            }
          })
        })
        .catch((error) => {
          setLoading(false)
          setError("Please try again later")
        });
    }
  }

  if (loading) {return (<Loader />) }

  return (
    <div className=" flex items-center justify-center md:pt-10 font-sans selection:bg-slate-900 selection:text-white">
      {/* max-w-5xl ensures the card feels substantial on laptop screens */}
      <main className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        
        {error && (
          <div className="bg-rose-50 border-b border-rose-100 py-4 px-8 animate-slide-down">
            <p className="text-rose-600 text-xs font-bold tracking-widest text-center uppercase">
              Error: {error}
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row">
          {/* Sidebar Area */}
          <aside className="w-full md:w-1/3 bg-indigo-100 p-10 flex flex-col items-center border-r border-slate-100">
            {/* Initials Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-900 flex items-center justify-center text-white text-4xl font-light shadow-xl mb-8">
              {getInitials()}
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                {userData?.firstName} {userData?.lastName}
              </h2>
              <p className="text-slate-400 text-sm mt-2">{userData?.email}</p>
            </div>
            <div className="pt-5 md:pt-10">
              {!editable ? (
                <button onClick={() => setEditable(true)} className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-900 border border-slate-500 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300">
                  Edit Profile
                </button>
              ) : (
                <button onClick={() => { setEditable(false); setError("") }} className="text-xs font-bold text-rose-500 px-6 py-2.5 rounded-full border border-slate-500 uppercase tracking-widest hover:text-rose-700">
                  Cancel
                </button>
              )}
            </div>
          </aside>

          {/* Form Area */}
          <section className="flex-1 p-10 md:p-16">
            <header className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h3>
                <p className="text-slate-400 text-sm mt-1">Manage your identity and contact info</p>
              </div>
              
            </header>

            <form className={`${editable ? "space-y-0" : "space-y-10"}`}>
              {/* 2 columns on laptop to use up empty space */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {[
                  { label: "First Name", name: "firstName", type: "text" },
                  { label: "Last Name", name: "lastName", type: "text" },
                  { label: "Email Address", name: "email", type: "email" },
                  { label: "Mobile Number", name: "mobile", type: "tel" },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      disabled={!editable}
                      onChange={handelChange}
                      value={editable ? (updatedData[field.name] ?? userData?.[field.name] ?? '') : (userData?.[field.name] || '')}
                      className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 text-slate-800 font-medium ${
                        editable 
                          ? 'border-black bg-white shadow-lg shadow-slate-100 outline-none' 
                          : 'border-slate-100 bg-slate-50/50 cursor-not-allowed opacity-60'
                      }`}
                    />
                  </div>
                ))}

                <div className="">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    disabled={!editable}
                    onChange={handelChange}
                    value={editable ? (updatedData.gender ?? userData?.gender) : userData?.gender}
                    className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 text-slate-800 font-medium appearance-none ${
                      editable 
                        ? 'border-black bg-white shadow-lg shadow-slate-100 outline-none' 
                        : 'border-slate-100 bg-slate-50/50 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {editable && (
                <div className="flex justify-end pt-8 md:pt-0">
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handelUpdateUserData();
                      setEditable(false);
                    }}
                    className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl hover:bg-black hover:scale-[1.02] transition-all duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </section>
        </div>
      </main>

      <style>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default UserProfile;