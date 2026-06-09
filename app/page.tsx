'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import HomeScreen from '@/components/HomeScreen';
import DiaryApp from '@/components/DiaryApp';
import ProfilePage from '@/components/ProfilePage';
import { getTrack } from '@/lib/tracks';

const THEME_KEY = 'diary-theme';

function AppContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.getItem(THEME_KEY) === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDark = useCallback(() => setIsDark(d => !d), []);

  const trackId = searchParams.get('track');
  const view    = searchParams.get('view');

  const selectedTrack = trackId ? (getTrack(trackId) ?? null) : null;

  if (view === 'profile') {
    return <ProfilePage onBack={() => router.push('/')} isDark={isDark} onToggleDark={toggleDark} />;
  }

  if (selectedTrack) {
    return <DiaryApp track={selectedTrack} onBack={() => router.push('/')} isDark={isDark} onToggleDark={toggleDark} />;
  }

  return (
    <HomeScreen
      onSelectTrack={(id) => router.push(`?track=${id}`)}
      onShowProfile={() => router.push('?view=profile')}
      isDark={isDark}
      onToggleDark={toggleDark}
    />
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <AppContent />
    </Suspense>
  );
}
