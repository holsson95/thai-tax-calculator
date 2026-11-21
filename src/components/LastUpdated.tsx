import React from 'react';
import { formatDisplayDate } from '../config/contentDates';

interface LastUpdatedProps {
  date: string; // ISO YYYY-MM-DD
  className?: string;
  /** 'desk' sets it in white for the ultramarine desk; default is ink on paper. */
  tone?: 'paper' | 'desk';
}

const LastUpdated: React.FC<LastUpdatedProps> = ({ date, className = '', tone = 'paper' }) => (
  <p className={`text-xs ${tone === 'desk' ? 'text-white/70' : 'text-ink-mute'} ${className}`}>
    Last updated: <time dateTime={date}>{formatDisplayDate(date)}</time>
  </p>
);

export default LastUpdated;
