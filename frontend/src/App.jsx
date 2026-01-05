
import { Footer } from "./components/common/Footer"
import { Header } from "./components/common/Header"
import { Home } from "./pages/Home"
import { Search } from "./pages/Search"
import { NotFoundPage } from "./pages/NotFoundPage"
import { Route, Routes } from "react-router-dom"
import { SeriesDetails } from "./pages/series/SeriesDetails"
import { MoviesDetails } from "./pages/movies/MoviesDetails"
import { SeriesPremierePage } from "./pages/series/SeriesPremierePage"
import { MoviesPremierePage } from "./pages/movies/MoviesPremierePage"

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen items-center w-dvw m-auto">
        <Header className={`${<Route path="/"/> ? 'bg-transparent' : 'bg-[#06080a] backdrop-blur-md'} `} />
      <div className="text-white text-center flex items-center justify-center flex-col absolute top-0 m-auto left-0 right-0  w-full ">
        <Routes>
          <Route path="/" element={<Home className="min-h-screen flex items-center justify-center" />} />
            <Route path="/search" element={<Search />} />
            <Route path="/series/details/:id" element={<SeriesDetails key={location.key} />}/>
            <Route path="/series/premiere" element={<SeriesPremierePage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/movies/details/:id" element={<MoviesDetails key={location.key} />}/>
            <Route path="/movies/premiere" element={<MoviesPremierePage />} />
        </Routes>
        <Footer className="mt-auto" />
        </div>
      </div>
    </>
  )
}

export default App
