import { TAX_YEAR_CONFIG } from '../config/taxConfig';
import { Document } from '@react-pdf/renderer';
import { TaxFormData } from '../types/taxForm';
import { FreelancerFormData, FreelancerTaxResult } from '../types/freelancerForm';
import { calculatePacketResult, isFreelancerFlow, PacketFormData } from './packetResult';
import { generateChecklist } from '../utils/checklistGenerator';

import PDFCoverPage from './PDFCoverPage';
import PDFIncomeSection from './PDFIncomeSection';
import PDFAllowancesSection from './PDFAllowancesSection';
import PDFTaxCalculation from './PDFTaxCalculation';
import PDFChecklist from './PDFChecklist';
import PDFPreparerNotes from './PDFPreparerNotes';

type AnyFormData = PacketFormData;

interface TaxPacketPDFProps {
  formData: AnyFormData;
  taxYear?: number;
}

const TaxPacketPDF: React.FC<TaxPacketPDFProps> = ({ formData, taxYear = TAX_YEAR_CONFIG.CURRENT_TAX_YEAR }) => {
  const isFreelancer = isFreelancerFlow(formData);

  // Same engine the on-screen results used (retirees → freelancer, company owners → company owner).
  const { result, breakdown } = calculatePacketResult(formData);

  const checklist = generateChecklist(formData);

  return (
    <Document
      title={`Thai Tax Filing Packet ${taxYear}`}
      author="Thai Tax Calculator"
      subject="Personal Income Tax Filing Packet"
      keywords="thailand tax filing packet"
    >
      {/* Page 1: Cover / Preparer Summary */}
      <PDFCoverPage
        formData={isFreelancer ? (formData as FreelancerFormData) : (formData as TaxFormData)}
        result={result}
        taxYear={taxYear}
      />

      {/* Page 2: Income Sources */}
      <PDFIncomeSection
        formData={formData}
        taxYear={taxYear}
      />

      {/* Page 3: Allowances & Deductions */}
      <PDFAllowancesSection
        formData={isFreelancer ? (formData as FreelancerFormData) : (formData as TaxFormData)}
        breakdown={breakdown}
        freelancerResult={isFreelancer ? (result as FreelancerTaxResult) : undefined}
        taxYear={taxYear}
      />

      {/* Page 4: Tax Calculation */}
      <PDFTaxCalculation
        result={result}
        taxYear={taxYear}
      />

      {/* Page 5: Supporting Documents Checklist */}
      <PDFChecklist
        items={checklist}
        taxYear={taxYear}
      />

      {/* Page 6: Notes for Preparer (freelancers and sole proprietors only) */}
      {isFreelancer && (
        <PDFPreparerNotes
          formData={formData as FreelancerFormData}
          result={result as FreelancerTaxResult}
          taxYear={taxYear}
        />
      )}
    </Document>
  );
};

export default TaxPacketPDF;
