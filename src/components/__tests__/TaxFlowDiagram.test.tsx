import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaxFlowDiagram, { TaxFlowStep } from '../TaxFlowDiagram';

describe('TaxFlowDiagram', () => {
  it('renders start, subtract, and result steps with formatted amounts', () => {
    const steps: TaxFlowStep[] = [
      { kind: 'start', label: 'Gross Income', amount: 500000 },
      { kind: 'subtract', label: 'Employment Deduction', amount: 100000 },
      { kind: 'result', label: 'Taxable Income', amount: 400000 },
    ];

    render(<TaxFlowDiagram steps={steps} />);

    expect(screen.getByText('Gross Income')).toBeInTheDocument();
    expect(screen.getByText('฿500,000')).toBeInTheDocument();
    expect(screen.getByText('Employment Deduction')).toBeInTheDocument();
    expect(screen.getByText('-฿100,000')).toBeInTheDocument();
    expect(screen.getByText('Taxable Income')).toBeInTheDocument();
    expect(screen.getByText('฿400,000')).toBeInTheDocument();
  });

  it('renders a bracket breakdown step', () => {
    const steps: TaxFlowStep[] = [
      {
        kind: 'brackets',
        label: 'Progressive Tax Calculation',
        brackets: [
          { label: '0 - 150,000', rate: 0, tax: 0 },
          { label: '150,001 - 300,000', rate: 5, tax: 7500 },
        ],
      },
    ];

    render(<TaxFlowDiagram steps={steps} />);

    expect(screen.getByText('Progressive Tax Calculation')).toBeInTheDocument();
    expect(screen.getByText('0 - 150,000 (0%)')).toBeInTheDocument();
    expect(screen.getByText('150,001 - 300,000 (5%)')).toBeInTheDocument();
    expect(screen.getByText('฿7,500')).toBeInTheDocument();
  });

  it('shows a message when there are no tax brackets', () => {
    const steps: TaxFlowStep[] = [
      { kind: 'brackets', label: 'Progressive Tax Calculation', brackets: [] },
    ];

    render(<TaxFlowDiagram steps={steps} />);

    expect(screen.getByText('No tax due at this income level')).toBeInTheDocument();
  });
});
