import { useEffect, useState } from "react"

export const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate',handleLocationChange)
    
    return () => {
      window.removeEventListener('popstate',handleLocationChange)
    }
  }, [])
  function navigateTo(to) {
    window.history.pushState({}, "", to); 
    window.dispatchEvent(new PopStateEvent("popstate"));
  } 
  
  return {
    currentPath,
    navigateTo,
    }
}
