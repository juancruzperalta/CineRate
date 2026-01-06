import { useState } from "react"
import { Link } from "./Link"

export const Header = ({ className = "" }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <header className={`relative  top-0 w-screen xl:max-w-[1200px]  2xl:max-w-[96vw] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-[400px] z-10 transition-all pt-4 lg:pt-0 duration-300 ${className}`}>
      <div
        className="mx-auto flex items-start justify-start lg:items-center lg:justify-between h-18
         flex-col lg:flex-row
        "
      >
        <Link to="/" className="cursor-pointer">
          <span className="text-2xl font-bold tracking-wide">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        </Link>
        <div className="lg:hidden flex">
          <nav className={`lg:hidden flex flex-col items-start text-[1rem] font-medium
  bg-gray-900 mt-2 overflow-hidden
  transition-all duration-300 mb-2  border border-white/10 shadow-xl"
  }`}>
    <button className={`flex lg:hidden p-2  hover:bg-white/10 transition`} onClick={() => {
      isActive ? setIsActive(false) : setIsActive(true);
    }}>
     <svg
    className={`w-8 h-8 fill-white transition-transform duration-300 ${
      isActive ? "rotate-90" : ""
    }`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
    </button>
            <div className={`h-full w-full flex-col items-start justify-start ${isActive ? 'flex' : 'hidden'}`}>
              
            <Link to="/"  className="w-full px-4 py-3 hover:bg-white/10 rounded-md transition">  Home</Link>
            <Link to="/search" className="w-full px-4 py-3 hover:bg-white/10 rounded-md transition"> Search
            </Link>
            <Link  to="/series/premiere"  className="w-full px-4 py-3 hover:bg-white/10 rounded-md transition">
              Premiere Series
                </Link>
            <Link  to="/movies/premiere"  className="w-full px-4 py-3 hover:bg-white/10 rounded-md transition">
              Premiere Movies
            </Link>
            <Link to="/comparate" className="w-full px-4 py-3 hover:bg-white/10 rounded-md transition"
              >Comparate</Link>
                      <button
          className="w-full px-4 py-3 hover:bg-white/10 rounded-md transition" >
          <svg className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" /></svg>
        </button>
    </div>
          </nav>
        </div>
          <nav className={`flex items-center gap-8 text-[1rem] font-medium hidden lg:flex`}>
            <Link to="/"  className="     hover:bg-gray-400/20    rounded-lg px-3 py-2 transition-colors  ">  Home</Link>
      <Link to="/search" className="cursor-pointer      hover:bg-gray-400/20    rounded-lg px-3 py-2 transition-colors  "> Search
            </Link>
            <Link  to="/series/premiere"  className="hover:bg-gray-400/20    rounded-lg px-3 py-2 transition-colors ">
              Premiere Series
                </Link>
            <Link  to="/movies/premiere"  className="hover:bg-gray-400/20    rounded-lg px-3 py-2 transition-colors ">
              Premiere Movies
            </Link>
            <Link to="/comparate" className="hover:bg-gray-400/20   rounded-lg px-3 py-2 transition-colors "
            >Comparate</Link>
          </nav>
          <button
          className="hidden lg:flex px-4 py-3 hover:bg-white/10 rounded-md transition" >
          <svg className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" /></svg>
        </button>
      </div>
    </header>

  )
}