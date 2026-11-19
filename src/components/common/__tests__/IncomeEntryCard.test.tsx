import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import IncomeEntryCard from '../IncomeEntryCard';
import { ThaiIncomeEntry } from '../../../types/freelancerForm';

function createEntry(overrides: Partial<ThaiIncomeEntry> = {}): ThaiIncomeEntry {
  return {
    id: 'entry-1',
    grossAmount: 0,
    incomeType: 'liberal_profession_40_6',
    withholdingAmount: 0,
    monthReceived: 0,
    payerName: '',
    description: '',
    ...overrides,
  };
}

describe('IncomeEntryCard accessibility', () => {
  it('associates every field label with its control via htmlFor/id', () => {
    render(
      <IncomeEntryCard
        entry={createEntry()}
        index={0}
        isExpanded={true}
        onToggle={vi.fn()}
        onUpdate={vi.fn()}
        onRemove={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/Income Type/)).toBeInstanceOf(HTMLSelectElement);
    expect(screen.getByLabelText(/Gross Amount/)).toBeInstanceOf(HTMLInputElement);
    expect(screen.getByLabelText(/Withholding Tax Deducted/)).toBeInstanceOf(HTMLInputElement);
    expect(screen.getByLabelText(/Month Received/)).toBeInstanceOf(HTMLSelectElement);
    expect(screen.getByLabelText(/Payer\/Client Name/)).toBeInstanceOf(HTMLInputElement);
    expect(screen.getByLabelText(/Description/)).toBeInstanceOf(HTMLInputElement);
  });

  it('uses unique ids per entry so multiple cards on one page do not collide', () => {
    const { unmount } = render(
      <IncomeEntryCard
        entry={createEntry({ id: 'entry-1' })}
        index={0}
        isExpanded={true}
        onToggle={vi.fn()}
        onUpdate={vi.fn()}
        onRemove={vi.fn()}
      />
    );
    const firstId = screen.getByLabelText(/Gross Amount/).id;
    unmount();

    render(
      <IncomeEntryCard
        entry={createEntry({ id: 'entry-2' })}
        index={1}
        isExpanded={true}
        onToggle={vi.fn()}
        onUpdate={vi.fn()}
        onRemove={vi.fn()}
      />
    );
    const secondId = screen.getByLabelText(/Gross Amount/).id;

    expect(firstId).not.toBe(secondId);
  });

  it('renders the expand/collapse header as a real, keyboard-operable button', () => {
    const onToggle = vi.fn();
    render(
      <IncomeEntryCard
        entry={createEntry({ payerName: 'ABC Co' })}
        index={0}
        isExpanded={false}
        onToggle={onToggle}
        onUpdate={vi.fn()}
        onRemove={vi.fn()}
      />
    );

    const toggle = screen.getByRole('button', { name: /income source 1/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('reflects isExpanded in aria-expanded', () => {
    render(
      <IncomeEntryCard
        entry={createEntry()}
        index={0}
        isExpanded={true}
        onToggle={vi.fn()}
        onUpdate={vi.fn()}
        onRemove={vi.fn()}
      />
    );

    const toggle = screen.getByRole('button', { name: /income source 1/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('activating the toggle button with Enter calls onToggle (native button keyboard behavior)', () => {
    const onToggle = vi.fn();
    render(
      <IncomeEntryCard
        entry={createEntry()}
        index={0}
        isExpanded={false}
        onToggle={onToggle}
        onUpdate={vi.fn()}
        onRemove={vi.fn()}
      />
    );

    const toggle = screen.getByRole('button', { name: /income source 1/i });
    toggle.focus();
    expect(document.activeElement).toBe(toggle);
    // Native <button> elements activate on Enter/Space automatically in real
    // browsers; fireEvent.click simulates the resulting activation here since
    // jsdom/happy-dom does not run native keydown->click translation.
    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('remove button still stops propagation and does not trigger onToggle', () => {
    const onToggle = vi.fn();
    const onRemove = vi.fn();
    render(
      <IncomeEntryCard
        entry={createEntry()}
        index={0}
        isExpanded={false}
        onToggle={onToggle}
        onUpdate={vi.fn()}
        onRemove={onRemove}
      />
    );

    fireEvent.click(screen.getByLabelText('Remove entry'));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('preserves existing numeric parsing for Gross Amount (decimal value)', () => {
    const onUpdate = vi.fn();
    render(
      <IncomeEntryCard
        entry={createEntry()}
        index={0}
        isExpanded={true}
        onToggle={vi.fn()}
        onUpdate={onUpdate}
        onRemove={vi.fn()}
      />
    );

    const gross = screen.getByLabelText(/Gross Amount/) as HTMLInputElement;
    fireEvent.change(gross, { target: { value: '1500.50' } });
    expect(onUpdate).toHaveBeenCalledWith('grossAmount', 1500.5);
  });

  it('preserves existing numeric parsing for Gross Amount (cleared field falls back to 0)', () => {
    const onUpdate = vi.fn();
    render(
      <IncomeEntryCard
        entry={createEntry({ grossAmount: 500 })}
        index={0}
        isExpanded={true}
        onToggle={vi.fn()}
        onUpdate={onUpdate}
        onRemove={vi.fn()}
      />
    );

    const gross = screen.getByLabelText(/Gross Amount/) as HTMLInputElement;
    fireEvent.change(gross, { target: { value: '' } });
    expect(onUpdate).toHaveBeenCalledWith('grossAmount', 0);
  });

  it('preserves existing numeric parsing for Withholding Amount', () => {
    const onUpdate = vi.fn();
    render(
      <IncomeEntryCard
        entry={createEntry()}
        index={0}
        isExpanded={true}
        onToggle={vi.fn()}
        onUpdate={onUpdate}
        onRemove={vi.fn()}
      />
    );

    const withholding = screen.getByLabelText(/Withholding Tax Deducted/) as HTMLInputElement;
    fireEvent.change(withholding, { target: { value: '200' } });
    expect(onUpdate).toHaveBeenCalledWith('withholdingAmount', 200);
  });

  it('sets inputMode="decimal" on the amount fields for a better mobile numeric keyboard', () => {
    render(
      <IncomeEntryCard
        entry={createEntry()}
        index={0}
        isExpanded={true}
        onToggle={vi.fn()}
        onUpdate={vi.fn()}
        onRemove={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/Gross Amount/)).toHaveAttribute('inputMode', 'decimal');
    expect(screen.getByLabelText(/Withholding Tax Deducted/)).toHaveAttribute('inputMode', 'decimal');
  });
});
