
import { Footer } from "./components/common/Footer"
import { Header } from "./components/common/Header"
import { Home } from "./pages/Home"
import { Search } from "./pages/Search"
import { NotFoundPage } from "./pages/NotFoundPage"
import { Premiere } from "./pages/Premiere"
import { Route, Routes, useLocation } from "react-router-dom"

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen items-center w-dvw m-auto">
        <Header className={`${<Route path="/"/> ? 'bg-transparent' : 'bg-[#06080a] backdrop-blur-md'} `} />
      <div className="text-white text-center flex items-center justify-center flex-col absolute top-0 m-auto left-0 right-0  w-full ">
        <Routes>
          <Route path="/" element={<Home className="min-h-screen flex items-center justify-center" />} />
          <Route path="/search" element={<Search />} />
            <Route path="/premiere" element={<Premiere />} />
            <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer className="mt-auto" />
        </div>
      </div>
    </>
  )
}

export default App
