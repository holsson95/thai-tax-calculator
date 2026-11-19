import React from 'react';
import { formatDisplayDate } from '../config/contentDates';

interface LastUpdatedProps {
  date: string; // ISO YYYY-MM-DD
  className?: string;
}

const LastUpdated: React.FC<LastUpdatedProps> = ({ date, className = '' }) => (
  <p className={`text-xs text-gray-500 ${className}`}>
    Last updated: <time dateTime={date}>{formatDisplayDate(date)}</time>
  </p>
);

export default LastUpdated;
