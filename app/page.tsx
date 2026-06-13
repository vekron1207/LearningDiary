'use client';

import { useState, useEffect, useCallback, useTransition, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import HomeScreen from '@/components/HomeScreen';
import DiaryApp from '@/components/DiaryApp';
import ProfilePage from '@/components/ProfilePage';
import { FriendsProgressProvider } from '@/components/FriendsProgressContext';
import { getTrack } from '@/lib/tracks';

const THEME_KEY = 'diary-theme';

function AppContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startNav] = useTransition();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.getItem(THEME_KEY) === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDark = useCallback(() => setIsDark(d => !d), []);

  /* Wrap every navigation in a transition so the current view stays
     visible while the next view loads — prevents Suspense flashing null
     and eating click events mid-transition. */
  const nav = useCallback((url: string) => {
    startNav(() => router.push(url));
  }, [router]);

  const trackId = searchParams.get('track');
  const view    = searchParams.get('view');

  const selectedTrack = trackId ? (getTrack(trackId) ?? null) : null;

  if (view === 'profile') {
    return <ProfilePage onBack={() => nav('/')} isDark={isDark} onToggleDark={toggleDark} />;
  }

  if (selectedTrack) {
    return <DiaryApp track={selectedTrack} onBack={() => nav('/')} onShowProfile={() => nav('?view=profile')} isDark={isDark} onToggleDark={toggleDark} />;
  }

  return (
    <HomeScreen
      onSelectTrack={(id) => nav(`?track=${id}`)}
      onShowProfile={() => nav('?view=profile')}
      isDark={isDark}
      onToggleDark={toggleDark}
    />
  );
}

export default function Home() {
  return (
    <FriendsProgressProvider>
      <Suspense fallback={null}>
        <AppContent />
      </Suspense>
    </FriendsProgressProvider>
  );
}
