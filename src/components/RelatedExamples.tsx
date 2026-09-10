import React from 'react';
import { Link } from 'react-router-dom';
import { getTaxExampleById } from '../data/taxExamples';
import { formatThb } from '../utils/taxCalculations';

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
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">See it worked out</h2>
      <ul className="space-y-2">
        {examples.map((example) => (
          <li key={example.id} className="flex gap-2">
            <span className="text-blue-500">→</span>
            <Link to={`/tax-examples/#${example.id}`} className="text-blue-600 hover:underline">
              {example.title}
            </Link>
            <span className="text-gray-400 text-sm">({formatThb(example.taxableIncome)} taxable income)</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedExamples;
