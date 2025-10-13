import { useEffect } from 'react';

export function ControlViewport(): null {
  useEffect(() => {
    if (!window) return;
    const resizeViewport = () => {
      const viewport = document.querySelector('meta[name=viewport]');
      viewport?.setAttribute(
        'content',
        window.outerWidth > 604 ? 'width=device-width, initial-scale=1.0' : 'width=604'
      );
    };

    window.onresize = resizeViewport;
    resizeViewport();
    return () => {
      window.onresize = null;
    };
  }, []);

  return null;
}
