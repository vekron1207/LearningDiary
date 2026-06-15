'use client';

import { use } from 'react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import DiaryApp from '@/components/DiaryApp';
import { getTrack } from '@/lib/tracks';
import { useTheme } from '@/lib/useTheme';

export default function TrackPage({ params }: { params: Promise<{ trackId: string }> }) {
  const { trackId } = use(params);
  const router = useRouter();
  const { isDark, toggleDark } = useTheme();
  const track = getTrack(trackId);

  if (!track) {
    redirect('/');
  }

  return (
    <DiaryApp
      track={track}
      onBack={() => router.push('/')}
      onShowProfile={() => router.push('/profile')}
      isDark={isDark}
      onToggleDark={toggleDark}
    />
  );
}
