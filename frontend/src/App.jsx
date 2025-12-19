
import { Footer } from "./components/common/Footer"
import { Header } from "./components/common/Header"
import { Home } from "./pages/Home"
import { Search } from "./pages/Search"
import { NotFoundPage } from "./pages/NotFoundPage"
import { useRouter } from "./hooks/useRouter"
import { Premiere } from "./pages/Premiere"

function App() {

  const {currentPath} = useRouter();

  let page = <NotFoundPage />;
  if (currentPath === '/') {
    page = <Home className="min-h-screen flex items-center justify-center" />
  } else if(currentPath == '/search'){
    page = <Search/> 
  } else if (currentPath == '/premiere') {
    page = <Premiere />
  }


  return (
    <>
      <div className="flex flex-col min-h-screen items-center w-dvw m-auto">
        <Header className={`${currentPath==="/" ? 'bg-transparent' : 'bg-[#06080a] backdrop-blur-md'} `} />
      <div className="text-white text-center flex items-center justify-center flex-col absolute top-0 m-auto left-0 right-0  w-full ">
          {page}
        <Footer className="mt-auto" />
        </div>
      </div>
    </>
  )
}

export default App
