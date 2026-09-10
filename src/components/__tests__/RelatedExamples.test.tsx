import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RelatedExamples from '../RelatedExamples';
import { getTaxExampleById } from '../../data/taxExamples';

describe('RelatedExamples', () => {
  it('renders a link to /tax-examples/ for each valid example id', () => {
    render(
      <MemoryRouter>
        <RelatedExamples exampleIds={['deductions-impact']} />
      </MemoryRouter>
    );

    const example = getTaxExampleById('deductions-impact')!;
    const link = screen.getByRole('link', { name: new RegExp(example.title) });
    expect(link).toHaveAttribute('href', '/tax-examples/#deductions-impact');
  });

  it('renders one link per example id, in order', () => {
    render(
      <MemoryRouter>
        <RelatedExamples exampleIds={['lower-income-employee', 'middle-income-employee', 'high-income-employee']} />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  it('silently skips an id that does not match any taxExamples entry', () => {
    render(
      <MemoryRouter>
        <RelatedExamples exampleIds={['deductions-impact', 'not-a-real-example-id']} />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('renders nothing when no ids resolve to a real example', () => {
    const { container } = render(
      <MemoryRouter>
        <RelatedExamples exampleIds={['not-a-real-example-id']} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
