import React from 'react'

export const Skeleton = ({ w = 150, h = 200, error = false }) => {
  if (error) {
    return (
      <div className={`w-[${w}px] h-[${h}px] rounded-md bg-gray-700/50 animate-pulse`}>
   <svg
    width="100%"
          height="100%"
          opacity="40%"
              viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    {/* Marco */}
    <rect x="8" y="10" width="48" height="44" rx="4" fill="#374151" />
    <rect x="12" y="14" width="40" height="36" rx="2" fill="#0d1016" />

    {/* Montañas */}
    <path d="M14 44 L26 30 L36 40 L44 32 L52 44 Z" fill="#374151" />

    {/* Sol */}
    <circle cx="22" cy="22" r="3" fill="#6B7280" />

  </svg>
      </div>
    );
  }

  return (
      <div className={`w-[${w}px] h-[${h}px] rounded-md bg-gray-700/50 animate-pulse`}/>
  );
}
