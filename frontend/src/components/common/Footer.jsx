import React from 'react'
import { Link } from './Link'

const SocialLink = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-black/20 hover:bg-white/10 hover:border-white/20 transition text-gray-200 hover:text-[var(--colorAccent)]"
  >
    {children}
  </a>
);

const FooterNavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-sm text-gray-300 hover:text-white transition underline-offset-4 hover:underline decoration-[var(--colorAccent)]"
  >
    {children}
  </Link>
);

export const Footer = ({ className = "" }) => {
  const year = new Date().getFullYear();

  return (
    <footer className={`w-full max-w-[100vw] mt-24 border-t-2 border-t-white px-10 overflow-hidden bg-gradient-to-b from-[var(--bgColor)] to-[var(--colorAccent)]/12 pt-2`}>
      <div className="">
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col gap-3">
              <div className="flex justify-center md:justify-start items-center gap-3">
                <img
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10"
                  src="/1fb4eb9d-c23b-4dcb-9818-c037389947c8.png"
                  alt="CineRate"
                />
                <div className="min-w-0">
                  <div className="text-lg font-bold tracking-wide truncate">
                    <span className="text-[var(--colorAccent)]">Cine</span>
                    <span className="text-white">Rate</span>
                  </div>
                  <div className="text-xs text-gray-400">Discover • Save • Rate</div>
                </div>
              </div>

              <p className="text-md text-gray-300 max-w-md">
                The information is provided from external sources. All rights belong to their respective owners.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-2">
                <SocialLink href="https://github.com/juancruzperalta/CineRate" label="GitHub">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                    <path d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.5-1.8-1.5-1.8-1.2-.8.1-.8.1-.8 1.3.1 2 .9 2 .9 1.2 2 3.2 1.4 4 .9.1-.9.5-1.4.8-1.7-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C16.7 4.7 17.8 5 17.8 5c.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.2.9 2.3V22c0 .3.2.7.8.6A11.2 11.2 0 0 0 12 .8Z" />
                  </svg>
                </SocialLink>
                <FooterNavLink to="/privacity">Politicas de Privacidad</FooterNavLink>
                <FooterNavLink to="/cookies">Politicas de Cookies</FooterNavLink>
              </div>
            </div>

            <div className="justify-start flex flex-col items-center">
              <div className="text-sm font-semibold text-white mb-3">Explore</div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <FooterNavLink to="/">Home</FooterNavLink>
                <FooterNavLink to="/search">Search</FooterNavLink>
                <FooterNavLink to="/series/premiere">Premiere series</FooterNavLink>
                <FooterNavLink to="/movies/premiere">Premiere movies</FooterNavLink>
              </div>
            </div>

            <div className="justify-start items-center flex  flex-col text-center">
              <div className="text-sm font-semibold text-white mb-3">TMDB</div>
              <p className="text-sm text-gray-300 max-w-sm">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
              </p>
              <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="inline-flex mt-4">
                <img
                  className="w-32 opacity-90 hover:opacity-100 transition"
                  src="/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                  alt="TMDB"
                />
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2">
            <div className="text-md text-gray-400">©CineRate {year}</div>
            <div className="text-md text-gray-500">Built for learning and entertainment.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
