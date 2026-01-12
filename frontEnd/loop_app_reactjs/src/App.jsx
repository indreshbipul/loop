import Nav from "./components/Nav"
import useAuthHook from "./hooks/authHook";
import Routing from "./routes/routing"
import Loader from './components/Loader'

function App() {
  const {loading} = useAuthHook()
  if(loading){
    return(< Loader />    )
  }
  return (
    <div className=" bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] h-full w-full border-box min-h-screen">
      <Nav /> 
      <div className='pt-20'>
        <Routing /> 
      </div>   
    </div>    
      
  )
}

export default App;