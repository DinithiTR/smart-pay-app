import { useEffect, useState } from 'react';

function getViewportWidth() {
  if (typeof window === 'undefined') {
    return 1440;
  }

  return window.innerWidth;
}

export default function useViewportWidth() {
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewportWidth;
}
