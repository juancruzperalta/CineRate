
import { useEffect, useState } from "react"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Home } from "./pages/Home"
import { Search } from "./pages/Search"
import { NotFoundPage } from "./pages/NotFoundPage"

function App() {

  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  let page = <NotFoundPage />;
  if (currentPath === '/') {
    page = <Home className="min-h-screen flex items-center justify-center" />
  } else if(currentPath == '/search'){
    page = <Search/> 
  }

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate',handleLocationChange)
  
    return () => {
      window.removeEventListener('popstate',handleLocationChange)
    }
  }, [])
  

  return (
    <>
      <div className="w-dvw flex flex-col min-h-screen items-center xl:max-w-[1200px] 2xl:max-w-[96vw] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-[400px] m-auto">
    <Header/>
      <div className="text-white text-center gap-8 flex items-center justify-center flex-col absolute top-0 m-auto left-0 right-0">
          {page}
        <Footer className="mt-auto" />
        </div>
      </div>
    </>
  )
}

export default App
