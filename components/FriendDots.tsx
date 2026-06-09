'use client';

import { useFriendsProgress, getFriendColor } from './FriendsProgressContext';

export default function FriendDots({ trackId, itemId }: { trackId: string; itemId: string }) {
  const { getFriendsDoneItem } = useFriendsProgress();
  const completers = getFriendsDoneItem(trackId, itemId);
  if (completers.length === 0) return null;

  const visible  = completers.slice(0, 3);
  const overflow = completers.length - 3;

  return (
    <div
      className="friend-dots"
      aria-label={`${completers.length} friend${completers.length === 1 ? '' : 's'} completed this`}
    >
      {visible.map(f => (
        <div
          key={f.uid}
          className="friend-dot"
          style={{ background: getFriendColor(f.uid) }}
          title={`${f.displayName} completed this`}
        >
          {f.displayName[0].toUpperCase()}
        </div>
      ))}
      {overflow > 0 && (
        <div className="friend-dot friend-dot-overflow" title={`+${overflow} more`}>
          +{overflow}
        </div>
      )}
    </div>
  );
}
