import React from 'react';
import { Link } from 'react-router-dom';
import { getTaxExampleById } from '../data/taxExamples';
import { formatThb } from '../utils/taxCalculations';
import ArrowIcon from './ui/ArrowIcon';

interface RelatedExamplesProps {
  exampleIds: string[];
}

const RelatedExamples: React.FC<RelatedExamplesProps> = ({ exampleIds }) => {
  const examples = exampleIds
    .map((id) => getTaxExampleById(id))
    .filter((e): e is NonNullable<typeof e> => e !== undefined);

  if (examples.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-examples-heading">
      <h2 id="related-examples-heading" className="display border-b-2 border-desk pb-2 text-xl text-ink">
        See it worked out
      </h2>
      <ul>
        {examples.map((example) => (
          <li
            key={example.id}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-paper-rule py-3"
          >
            <Link
              to={`/tax-examples/#${example.id}`}
              className="group inline-flex items-baseline gap-2 text-[15px] font-semibold text-ink transition-colors hover:text-desk"
            >
              {example.title}
              <ArrowIcon className="h-4 w-4 shrink-0 self-center text-ink-mute transition-transform group-hover:translate-x-0.5 group-hover:text-desk" />
            </Link>
            <span className="font-mono text-xs tabular-nums text-ink-mute">
              {formatThb(example.taxableIncome)} taxable
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedExamples;
