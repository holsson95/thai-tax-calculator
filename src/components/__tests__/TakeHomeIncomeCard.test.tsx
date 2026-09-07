import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TakeHomeIncomeCard from '../TakeHomeIncomeCard';

describe('TakeHomeIncomeCard', () => {
  it('displays the annual take-home amount and its monthly equivalent', () => {
    render(<TakeHomeIncomeCard annualTakeHome={480000} />);

    expect(screen.getByText('Estimated Take-Home Income')).toBeInTheDocument();
    expect(screen.getByText('฿480,000')).toBeInTheDocument();
    expect(screen.getByText('≈ ฿40,000/month')).toBeInTheDocument();
  });
});
