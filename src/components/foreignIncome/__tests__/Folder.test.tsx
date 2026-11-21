import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Folder from '../Folder';

const Harness: React.FC<{ onNext?: () => void }> = ({ onNext = () => {} }) => {
  const [open, setOpen] = useState(true);
  return (
    <Folder id="about" title="About you" summary="About you · 200 days" n={1} open={open}
      onToggle={() => setOpen((o) => !o)} next={{ label: 'Money brought in', onClick: onNext }}>
      <p>Body content</p>
    </Folder>
  );
};

describe('Folder', () => {
  it('toggles open and closed from the tab', () => {
    render(<Harness />);
    const tab = screen.getByRole('button', { name: /About you/ });
    expect(tab).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Body content')).toBeVisible();
    fireEvent.click(tab);
    expect(tab).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('About you · 200 days')).toBeInTheDocument();
    expect(document.getElementById('about-panel')).toHaveAttribute('hidden');
  });

  it('labels the panel by its tab', () => {
    render(<Harness />);
    expect(screen.getByRole('region', { name: /About you/ })).toBe(document.getElementById('about-panel'));
  });

  it('calls next from the Next button', () => {
    const onNext = vi.fn();
    render(<Harness onNext={onNext} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next: Money brought in' }));
    expect(onNext).toHaveBeenCalled();
  });

  it('uses a native, focusable button for the tab (Enter/Space work without extra code)', () => {
    render(<Harness />);
    const tab = screen.getByRole('button', { name: /About you/ });
    expect(tab.tagName).toBe('BUTTON');
    expect(tab).toHaveAttribute('type', 'button');
    expect(tab).toHaveAttribute('aria-controls', 'about-panel');
    tab.focus();
    expect(tab).toHaveFocus();
  });
});
