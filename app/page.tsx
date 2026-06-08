'use client';

import { useState, useEffect, useCallback } from 'react';
import HomeScreen from '@/components/HomeScreen';
import DiaryApp from '@/components/DiaryApp';
import ProfilePage from '@/components/ProfilePage';
import { getTrack } from '@/lib/tracks';
import type { Track } from '@/lib/types';

const LAST_TRACK_KEY = 'diary-last-track';
const THEME_KEY = 'diary-theme';

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.getItem(THEME_KEY) === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDark = useCallback(() => setIsDark(d => !d), []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LAST_TRACK_KEY);
      if (saved) {
        const track = getTrack(saved);
        if (track) setSelectedTrack(track);
      }
    } catch { /* storage unavailable */ }
  }, []);

  function handleSelectTrack(trackId: string) {
    const track = getTrack(trackId);
    if (!track) return;
    try { localStorage.setItem(LAST_TRACK_KEY, trackId); } catch { /* quota */ }
    setSelectedTrack(track);
  }

  function handleBack() {
    setSelectedTrack(null);
    try { localStorage.removeItem(LAST_TRACK_KEY); } catch { /* quota */ }
  }

  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} isDark={isDark} onToggleDark={toggleDark} />;
  }

  if (!selectedTrack) {
    return <HomeScreen onSelectTrack={handleSelectTrack} onShowProfile={() => setShowProfile(true)} isDark={isDark} onToggleDark={toggleDark} />;
  }

  return <DiaryApp track={selectedTrack} onBack={handleBack} isDark={isDark} onToggleDark={toggleDark} />;
}
