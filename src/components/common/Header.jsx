import { Link } from "./Link"

export const Header = () => {

  return (
    <header
      className="relative top-0 w-full z-10 transition-all duration-300 2xl:max-w-[96vw] xl:max-w-[1200px]   lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-[400px] "
>
  <div className="w-full flex items-center justify-between mx-0 py-4">
 <Link to="/" className="cursor-pointer">
          <span className="text-2xl font-bold tracking-wide">
            <span className="text-[var(--colorAccent)]">Cine</span>
            <span className="text-white">Rate</span>
          </span>
        </Link>

    <nav className="flex items-center gap-8 text-[1rem] font-medium">
      <Link to="/"
        className="
           hover:bg-gray-400/20
          rounded-lg px-3 py-2 transition-colors
        "
      >
        Inicio
      </Link>
 <Link to="/search" className="cursor-pointer      hover:bg-gray-400/20
          rounded-lg px-3 py-2 transition-colors
        "
      >
        Explorar
      </Link>
      <Link
        to="/premiere"
        className="
           hover:bg-gray-400/20
          rounded-lg px-3 py-2 transition-colors
        "
      >
        Premiere
      </Link>
      <Link
        to="/comparate"
        className="
           hover:bg-gray-400/20
          rounded-lg px-3 py-2 transition-colors
        "
      >
        Comparate
      </Link>
    </nav>
    <button
      className="
        bg-[var(--colorAccent)]
        text-[#0B0F19] font-semibold text-[1rem] px-5 py-2 rounded-full
        transition-all duration-500 hover:scale-[1.01] hover:bg-[var(--colorHover)] cursor-pointer
      "
    >
      Start
    </button>
  </div>
</header>

  )
}