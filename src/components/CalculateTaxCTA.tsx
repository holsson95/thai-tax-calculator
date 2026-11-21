import React from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from './ui/ArrowIcon';

interface CTAAction {
  label: string;
  to: string;
}

interface CalculateTaxCTAProps {
  heading: string;
  description: string;
  primary: CTAAction;
  secondary?: CTAAction;
  /** Use 'h3' when this CTA sits under a page's own <h2> section heading. Defaults to 'h2'. */
  headingLevel?: 'h2' | 'h3';
}

/** A sky-blue copy sheet that sends the reader to a calculator. */
const CalculateTaxCTA: React.FC<CalculateTaxCTAProps> = ({
  heading,
  description,
  primary,
  secondary,
  headingLevel = 'h2',
}) => {
  const Heading = headingLevel;
  return (
    <div className="on-paper bg-paper-sky px-5 py-6 text-ink shadow-sheet-sm sm:px-8">
      <Heading className="display text-xl text-ink">{heading}</Heading>
      <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-soft">{description}</p>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Link
          to={primary.to}
          className="group inline-flex items-center justify-center gap-2 bg-desk px-5 py-3 text-[15px] font-semibold text-paper-white transition-colors hover:bg-desk-deep"
        >
          {primary.label}
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        {secondary && (
          <Link
            to={secondary.to}
            className="text-[15px] font-semibold text-desk underline decoration-desk/40 underline-offset-4 hover:decoration-desk"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
};

export default CalculateTaxCTA;
