'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function VisitorTracker() {
  const { user } = useAuth();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        await fetch(`${apiUrl}/api/track-visit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user?.id,
            userEmail: user?.email,
            path: typeof window !== 'undefined' ? window.location.pathname : '/',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          }),
        });
      } catch (err) {
        console.warn('Visitor tracking error:', err);
      }
    };

    trackVisit();
  }, [user?.id, user?.email]);

  return null;
}
