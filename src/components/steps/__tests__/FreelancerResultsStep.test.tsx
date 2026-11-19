import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FreelancerResultsStep from '../FreelancerResultsStep';
import { createDefaultFreelancerFormData } from '../../../types/freelancerForm';

const toBlobMock = vi.fn(() => Promise.resolve(new Blob(['pdf'], { type: 'application/pdf' })));
const pdfMock = vi.fn(() => ({ toBlob: toBlobMock }));

vi.mock('@react-pdf/renderer', () => ({
  pdf: () => pdfMock(),
}));

vi.mock('../../../pdf/TaxPacketPDF', () => ({
  default: () => null,
}));

describe('FreelancerResultsStep PDF download', () => {
  it('does not load @react-pdf/renderer until the user requests a PDF', () => {
    const formData = createDefaultFreelancerFormData();
    const onStartOver = vi.fn();

    render(<FreelancerResultsStep formData={formData} onStartOver={onStartOver} />);

    expect(pdfMock).not.toHaveBeenCalled();
  });

  it('generates and downloads a PDF when the button is clicked, showing a loading state meanwhile', async () => {
    const formData = createDefaultFreelancerFormData();
    const onStartOver = vi.fn();
    const createObjectURL = vi.fn(() => 'blob:mock-url');
    const revokeObjectURL = vi.fn();
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;

    render(<FreelancerResultsStep formData={formData} onStartOver={onStartOver} />);

    const button = screen.getByRole('button', { name: /download tax filing packet/i });
    fireEvent.click(button);

    expect(await screen.findByRole('button', { name: /generating pdf/i })).toBeInTheDocument();

    await waitFor(() => expect(pdfMock).toHaveBeenCalledTimes(1));
    expect(toBlobMock).toHaveBeenCalledTimes(1);
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledTimes(1);

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /download tax filing packet/i })).toBeInTheDocument()
    );
  });
});
