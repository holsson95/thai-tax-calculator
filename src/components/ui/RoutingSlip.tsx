import React from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';

interface RoutingSlipProps {
  to: string;
  title: string;
  description?: string;
  paper?: 'sky' | 'pink';
  className?: string;
}

const PAPER = { sky: 'bg-paper-sky', pink: 'bg-paper-pink' };

/** A full-width coloured link sheet that routes the reader to another page. */
const RoutingSlip: React.FC<RoutingSlipProps> = ({ to, title, description, paper = 'sky', className = '' }) => (
  <Link
    to={to}
    className={`group flex items-center justify-between gap-6 px-6 py-5 text-ink shadow-sheet-sm transition-transform duration-200 hover:-translate-y-0.5 ${PAPER[paper]} ${className}`}
  >
    <span>
      <span className="display block text-lg">{title}</span>
      {description && <span className="mt-1 block text-sm text-ink-soft">{description}</span>}
    </span>
    <ArrowIcon className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
  </Link>
);

export default RoutingSlip;
