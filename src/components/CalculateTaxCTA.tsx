import React from 'react';
import { Link } from 'react-router-dom';

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

const ArrowIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CalculateTaxCTA: React.FC<CalculateTaxCTAProps> = ({
  heading,
  description,
  primary,
  secondary,
  headingLevel = 'h2',
}) => {
  const Heading = headingLevel;
  return (
    <div className="bg-blue-50 rounded-xl p-6 text-center">
      <Heading className="text-xl font-semibold text-gray-900 mb-2">{heading}</Heading>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to={primary.to}
          className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          {primary.label}
          <ArrowIcon />
        </Link>
        {secondary && (
          <Link
            to={secondary.to}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
};

export default CalculateTaxCTA;
