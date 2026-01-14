import { useEffect, useState } from "react"
import { Link } from "./Link"
import { useAuth } from "../helpers/AuthProvider";

export const Header = ({ className = "" }) => {
  const [isActive, setIsActive] = useState(false);
  const { isLogged, logout } = useAuth();
  return (
    <header className={`relative  top-0 w-screen px-10 w-full z-10 transition-all pt-4 lg:pt-0 duration-300 flex items-center justify-between ${className}`}>
      <div
        className="w-full flex items-center justify-between lg:items-center lg:justify-between h-18
         flex-row relative
        "
      >
        <Link to="/" className="cursor-pointer">
          <span className="text-2xl font-bold tracking-wide">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        </Link>
        <div className="lg:hidden flex relative">
          <button className={`flex lg:hidden p-2 items-center  hover:bg-white/10 transition`} onClick={() => {
            isActive ? setIsActive(false) : setIsActive(true);
          }}>
           <svg
          className={`w-6 h-6 fill-white transition-transform duration-300 ${
            isActive ? "rotate-90" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
          </button>
          <nav className={`lg:hidden flex flex-col items-end text-[1rem] font-medium
          bg-gray-900 mt-2 overflow-hidden absolute top-full right-1
          transition-all duration-300 mb-2  border border-white/10 shadow-xl"
          }`}>
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
              <Link to="/auth"
              className="w-full px-4 py-3 cursor-pointer hover:bg-white/10 rounded-md transition" > 
                  <svg className={`w-8 h-8 `} fill={isLogged ? '#000' : '#fff'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" /></svg>
                </Link>
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
        </nav>
        <div className="flex items-center justify-center">

                      <Link to="/auth"
          className="hidden lg:flex cursor-pointer px-4 py-3 hover:bg-white/10 rounded-md transition" >
          <svg className={`w-7 h-7 ${isLogged ? 'fill-green-200' : 'fill-white'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" /></svg>
        </Link>
        <button className={`${isLogged ? 'flex' : 'hidden'} cursor-pointer hover:bg-white/10 px-4 py-3 rounded-md transition`} onClick={() => logout()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-7 h-7 fill-white"><path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"/></svg></button>
            </div>
      </div>
      </header>
    
    )
  }