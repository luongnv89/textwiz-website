import { useEffect, useRef, useState } from 'react';

export default function Turnstile({
  siteKey,
  onSuccess,
  onError,
  onExpire,
  theme = 'auto',
  size = 'normal',
  resetTrigger,
}) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!siteKey || typeof siteKey !== 'string' || siteKey.trim() === '') {
      return;
    }

    const checkTurnstile = () => {
      if (window.turnstile) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    if (checkTurnstile()) return;

    const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const interval = setInterval(() => {
      if (checkTurnstile()) clearInterval(interval);
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!window.turnstile) {
        setLoadError(true);
        console.warn('Turnstile failed to load - falling back to honeypot-only protection');
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [siteKey]);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !siteKey || typeof siteKey !== 'string') return;

    if (widgetIdRef.current !== null) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch {
        /* already removed */
      }
      widgetIdRef.current = null;
    }

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        size,
        callback: (token) => onSuccessRef.current?.(token),
        'error-callback': () => onErrorRef.current?.(),
        'expired-callback': () => onExpireRef.current?.(),
      });
    } catch (err) {
      console.error('Turnstile render error:', err);
      setLoadError(true);
    }

    return () => {
      if (widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* already removed */
        }
        widgetIdRef.current = null;
      }
    };
  }, [isLoaded, siteKey, theme, size]);

  useEffect(() => {
    if (widgetIdRef.current !== null && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        /* widget may not exist */
      }
    }
  }, [resetTrigger]);

  if (loadError || !siteKey || typeof siteKey !== 'string' || siteKey.trim() === '') {
    return null;
  }

  return <div ref={containerRef} className="cf-turnstile flex justify-center" data-testid="turnstile-widget" />;
}
