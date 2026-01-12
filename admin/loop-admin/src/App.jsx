import Nav from './components/nav'
import Routing from "./routes/routing";


function App() {
  return (
   <div className="bg-gray-50 font-sans min-h-screen flex">
      <Nav />
      <div className="flex-1 p-8">
      <Routing />
      </div>
   </div>
  )
}

export default App