import { useEffect, useState } from "react"
import { Link } from "./Link"
import { useAuth } from "../helpers/AuthProvider";

export const Header = ({ className = "" }) => {
  const [isActive, setIsActive] = useState(false);
  const { isLogged, logout, user } = useAuth();
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
        <div className="lg:hidden flex">
          <button className={`flex lg:hidden p-2 items-center  hover:bg-white/10 transition`} onClick={() => {
              isActive ? setIsActive(false) : setIsActive(true);
          }}>
          <svg className={`w-6 h-6 fill-white transition-transform duration-300 ${isActive ? "rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
          </button>
          <nav  className={`absolute rounded-md bg-black/60 backdrop-blur-sm top-0 right-0 w-full shadow-2xl shadow-black/50 bg-[radial-gradient(circle,_rgba(12,61,47,0.7)_30%,_rgba(0,0,0,0.7)_100%)] shadow-2xl z-50 mt-[4.5rem] transform transition-transform duration-300 ease-in-out ${isActive ? "translate-y-0" : "-translate-y-full"} lg:hidden z-50`}>
            <div className={`flex items-center justify-between md:justify-center md:gap-8 px-6 py-5 border-b border-white/10 ${isActive ? 'flex' : 'hidden'}`} onClick={() => setIsActive(false)}>
              <button onClick={() => setIsActive(false)}>
                <svg className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
              </button>
                <div className="flex flex-col px-6 gap-4 text-gray-200 font-semibold  font-medium" onClick={() => setIsActive(false)}>
                  <div className="flex items-center border-b-2 border-gray-400/10 max-w-[200px]">
                    <svg className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>                <Link to="/"  className="px-4 py-3 rounded-lg hover:bg-white/5 transition">Home</Link>
                    </div>
                    <div className="flex items-center border-b-2 border-gray-400/10 max-w-[200px]">
                      <svg className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>               
                       <Link to="/search" className="px-4 py-3 rounded-lg hover:bg-white/5 transition"> Search
                      </Link>
                    </div>
                    <div className="flex items-center border-b-2 border-gray-400/10 max-w-[200px]">
                        <svg className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>                <Link  to="/series/premiere"  className="px-4 py-3 rounded-lg hover:bg-white/5 transition">
                        Premiere Series
                          </Link>
                    </div>
                      <div className="flex items-center border-b-2 border-gray-400/10 max-w-[200px]">
                          <svg className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M512 128C514 128 515.9 128.1 517.8 128.3L422.1 224L490 224L562 152C570.8 163 576 176.9 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192C64 156.7 92.7 128 128 128L198.1 128L102.1 224L170 224L265 129L266 128L358.1 128L262.1 224L330 224L425 129L426 128L512.1 128z"/></svg>                  <Link  to="/movies/premiere"  className="px-4 py-3 rounded-lg hover:bg-white/5 transition">
                          Premiere Movies
                          </Link>
                      </div>
                      <div className={`${isLogged ? 'hidden' : 'flex'} flex items-center border-b-2 border-gray-400/10 max-w-[200px]`}>
                      <svg className={`w-6 h-6 fill-white`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" /></svg>
                      <Link to="/auth" className="px-4 py-3 rounded-lg hover:bg-white/5 transition flex items-center justify-start" > 
                        Profile
                      </Link>
                    </div>
                    <div className={`${isLogged ? 'flex' : 'hidden'} items-center justify-center  max-w-[200px]`}>
                      <img className="w-6 h-6 rounded-full" src="/1fb4eb9d-c23b-4dcb-9818-c037389947c8.png" alt="Logo" />
                        <Link to="/user/account" className="px-4 min-w-0 py-3 rounded-lg hover:bg-white/5 transition flex items-center justify-start truncate 
                    " >{user?.email}</Link>
                    </div>
               <button className={`lg:hidden ${isLogged ? 'flex' : 'hidden'} cursor-pointer hover:bg-white/10 px-4 py-3 rounded-md transition`} onClick={() => logout()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-7 h-7 fill-white"><path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"/></svg></button>
              </div>
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
        <div className="hidden lg:flex items-center justify-center">

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