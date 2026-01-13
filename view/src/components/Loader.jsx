function Loader(){
    return(
        <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex flex-col items-center justify-center fixed inset-0 min-h-screen ">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500 border-solid mb-2"></div>
            <div className="text-purple-600 text-center">Loading...</div>
        </div>
    )
}

export default Loader