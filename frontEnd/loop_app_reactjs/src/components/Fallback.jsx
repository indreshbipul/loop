import { useNavigate } from 'react-router-dom';

const Fallback = ({message,setReload }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 min-h-screen w-full  flex flex-col items-center justify-center p-6 selection:bg-black selection:text-white">

      <div className="max-w-md w-full text-center animate-in fade-in zoom-in duration-500">
        <div className="mb-10 flex justify-center">
          <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-medium text-slate-900 mb-4 tracking-tight">
          Connection Interrupted
        </h1>
        <p className="text-slate-500 leading-relaxed mb-12 text-sm">
          {message || "We’re having trouble retrieving the latest luxury collections. Please check your connection and try again."}
        </p>

        {/* Center Actions */}
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={()=>{setReload((prev)=>({...prev}))}}
            className="w-full max-w-[240px] py-4 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
          >
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-black transition-colors py-2"
          >
            Return Home
          </button>
        </div>
      </div>

      {/* Subtle background detail to fill empty space on laptop */}
      <div className="absolute bottom-12 text-[10px] text-slate-300 uppercase tracking-widest font-medium">
        Error Code: 0x82_DATA_FETCH
      </div>
    </div>
  );
};

export default Fallback;