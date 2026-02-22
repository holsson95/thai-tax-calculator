import { Document } from '@react-pdf/renderer';
import { TaxFormData, TaxCalculationResult } from '../types/taxForm';
import { FreelancerFormData, FreelancerTaxResult } from '../types/freelancerForm';
import { SoleProprietorFormData } from '../types/soleProprietorForm';
import { CompanyOwnerFormData } from '../types/companyOwnerForm';
import { calculateAnnualTax, calculateFreelancerTax } from '../utils/taxCalculations';
import { generateChecklist } from '../utils/checklistGenerator';

import PDFCoverPage from './PDFCoverPage';
import PDFIncomeSection from './PDFIncomeSection';
import PDFAllowancesSection from './PDFAllowancesSection';
import PDFTaxCalculation from './PDFTaxCalculation';
import PDFChecklist from './PDFChecklist';
import PDFPreparerNotes from './PDFPreparerNotes';

type AnyFormData =
  | TaxFormData
  | FreelancerFormData
  | SoleProprietorFormData
  | CompanyOwnerFormData;

interface TaxPacketPDFProps {
  formData: AnyFormData;
  taxYear?: number;
}

function isFreelancerLike(data: AnyFormData): data is FreelancerFormData {
  return data.employmentType === 'freelancer' ||
    data.employmentType === 'self-employed' ||
    data.employmentType === 'sole_proprietor' ||
    data.employmentType === 'business';
}

const TaxPacketPDF: React.FC<TaxPacketPDFProps> = ({ formData, taxYear = 2025 }) => {
  const isFreelancer = isFreelancerLike(formData);

  let result: TaxCalculationResult | FreelancerTaxResult;
  let breakdown: TaxCalculationResult['breakdown'] | undefined;

  if (isFreelancer) {
    result = calculateFreelancerTax(formData as FreelancerFormData);
    breakdown = undefined;
  } else {
    const annualResult = calculateAnnualTax(formData as TaxFormData);
    result = annualResult;
    breakdown = annualResult.breakdown;
  }

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
