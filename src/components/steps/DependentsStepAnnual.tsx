import { useState } from 'react';
import { StepProps, ChildData, TAX_CONSTANTS } from '../../types/taxForm';

const CURRENT_YEAR = new Date().getFullYear();

const DependentsStepAnnual: React.FC<StepProps> = ({ formData, setFormData, showValidationErrors }) => {
  const [hasEligibleChildren, setHasEligibleChildren] = useState(formData.childrenEligibilityConfirmed || formData.children.length > 0);
  const [hasEligibleParents, setHasEligibleParents] = useState(formData.parentsEligibilityConfirmed || formData.numberOfParents > 0);

  const calculateAge = (birthYear: number): number => {
    return CURRENT_YEAR - birthYear;
  };

  const isStudentAgeRange = (birthYear: number): boolean => {
    const age = calculateAge(birthYear);
    return age >= 20 && age <= 25;
  };

  const calculateChildAllowance = (child: ChildData, index: number): number => {
    let allowance = TAX_CONSTANTS.CHILD_ALLOWANCE_BASE;
    // Bonus for 2nd+ child born 2018 or later
    if (index >= 1 && child.birthYear >= TAX_CONSTANTS.CHILD_BONUS_BIRTH_YEAR) {
      allowance += TAX_CONSTANTS.CHILD_ALLOWANCE_BONUS;
    }
    return allowance;
  };

  const getTotalChildAllowance = (): number => {
    return formData.children.reduce((total, child, index) => {
      return total + calculateChildAllowance(child, index);
    }, 0);
  };

  const handleAddChild = () => {
    const newChildren = [...formData.children, { birthYear: CURRENT_YEAR - 10, isStudent: false }];
    setFormData({ ...formData, children: newChildren });
  };

  const handleRemoveChild = () => {
    if (formData.children.length > 0) {
      const newChildren = formData.children.slice(0, -1);
      setFormData({ ...formData, children: newChildren });
    }
  };

  const handleChildBirthYearChange = (index: number, birthYear: number) => {
    const newChildren = [...formData.children];
    newChildren[index] = { ...newChildren[index], birthYear };
    // Reset student status if not in student age range
    if (!isStudentAgeRange(birthYear)) {
      newChildren[index].isStudent = false;
    }
    setFormData({ ...formData, children: newChildren });
  };

  const handleChildStudentChange = (index: number, isStudent: boolean) => {
    const newChildren = [...formData.children];
    newChildren[index] = { ...newChildren[index], isStudent };
    setFormData({ ...formData, children: newChildren });
  };

  const handleParentsChange = (delta: number) => {
    const newValue = Math.max(0, Math.min(TAX_CONSTANTS.MAX_PARENTS, formData.numberOfParents + delta));
    setFormData({ ...formData, numberOfParents: newValue });
  };

  const totalAllowance =
    TAX_CONSTANTS.PERSONAL_ALLOWANCE +
    (formData.maritalStatus === 'married' && formData.spouseHasNoIncome ? TAX_CONSTANTS.SPOUSE_ALLOWANCE : 0) +
    (formData.isAge65OrOlder ? TAX_CONSTANTS.SENIOR_ALLOWANCE : 0) +
    getTotalChildAllowance() +
    formData.numberOfParents * TAX_CONSTANTS.PARENT_ALLOWANCE;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Dependents & Allowances</h2>
      <p className="text-gray-600 mb-6">Tell us about your dependents to calculate your allowances.</p>

      {/* Children Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Children</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          {/* Eligibility Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm">
            <p className="font-medium text-blue-800 mb-1">Eligibility Criteria:</p>
            <ul className="text-blue-700 space-y-1">
              <li>• Under 20 years old, OR under 25 and studying, OR legally incompetent</li>
              <li>• Earning less than ฿30,000 per year</li>
            </ul>
          </div>

          {/* Eligibility Checkbox */}
          <label className={`flex items-center gap-3 cursor-pointer p-3 border rounded-lg bg-white ${
            showValidationErrors && hasEligibleChildren && formData.children.length === 0
              ? 'border-red-500'
              : 'border-gray-200'
          }`}>
            <input
              type="checkbox"
              checked={hasEligibleChildren}
              onChange={(e) => {
                setHasEligibleChildren(e.target.checked);
                if (e.target.checked) {
                  setFormData({ ...formData, childrenEligibilityConfirmed: true });
                } else {
                  setFormData({ ...formData, children: [], childrenEligibilityConfirmed: false });
                }
              }}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-800">I have children who meet these criteria</span>
          </label>

          {/* Validation Error */}
          {showValidationErrors && hasEligibleChildren && formData.children.length === 0 && (
            <p className="mt-2 text-sm text-red-600">
              Please add at least one child or uncheck the box above.
            </p>
          )}

          {/* Number of Children - only shown when checkbox is checked */}
          {hasEligibleChildren && (
            <div className="mt-4">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-700">Number of children:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRemoveChild}
                    disabled={formData.children.length === 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Remove child"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{formData.children.length}</span>
                  <button
                    onClick={handleAddChild}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    aria-label="Add child"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Child Details */}
              {formData.children.map((child, index) => {
                const age = calculateAge(child.birthYear);
                const showStudentOption = isStudentAgeRange(child.birthYear);
                const allowance = calculateChildAllowance(child, index);
                const hasBonus = index >= 1 && child.birthYear >= TAX_CONSTANTS.CHILD_BONUS_BIRTH_YEAR;

                return (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Child {index + 1}</span>
                      <span className="text-sm text-green-600 font-medium">
                        ฿{allowance.toLocaleString()}
                        {hasBonus && (
                          <span className="text-xs text-green-500 ml-1">(+฿30k bonus)</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm text-gray-600">Birth year:</label>
                      <input
                        type="number"
                        value={child.birthYear}
                        onChange={(e) => handleChildBirthYearChange(index, parseInt(e.target.value) || CURRENT_YEAR)}
                        min={1900}
                        max={CURRENT_YEAR}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                      <span className="text-sm text-gray-500">Age: {age}</span>
                    </div>
                    {showStudentOption && (
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={child.isStudent || false}
                          onChange={(e) => handleChildStudentChange(index, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">Currently studying (required for ages 20-25)</span>
                      </label>
                    )}
                  </div>
                );
              })}

              {formData.children.length > 0 && (
                <div className="text-right text-sm text-gray-600">
                  Total children allowance: <span className="font-medium text-green-600">฿{getTotalChildAllowance().toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Parents Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Parents</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          {/* Eligibility Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm">
            <p className="font-medium text-blue-800 mb-1">Eligibility Criteria:</p>
            <ul className="text-blue-700 space-y-1">
              <li>• Parent is 60 years or older</li>
              <li>• Parent's annual income is less than ฿30,000</li>
              <li>• You can claim up to {TAX_CONSTANTS.MAX_PARENTS} parents (yours and spouse's)</li>
            </ul>
            <p className="text-blue-600 mt-2">
              Allowance: ฿{TAX_CONSTANTS.PARENT_ALLOWANCE.toLocaleString()} per eligible parent
            </p>
          </div>

          {/* Eligibility Checkbox */}
          <label className={`flex items-center gap-3 cursor-pointer p-3 border rounded-lg bg-white ${
            showValidationErrors && hasEligibleParents && formData.numberOfParents === 0
              ? 'border-red-500'
              : 'border-gray-200'
          }`}>
            <input
              type="checkbox"
              checked={hasEligibleParents}
              onChange={(e) => {
                setHasEligibleParents(e.target.checked);
                if (e.target.checked) {
                  setFormData({ ...formData, parentsEligibilityConfirmed: true });
                } else {
                  setFormData({ ...formData, numberOfParents: 0, parentsEligibilityConfirmed: false });
                }
              }}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-800">I have parents who meet these criteria</span>
          </label>

          {/* Validation Error */}
          {showValidationErrors && hasEligibleParents && formData.numberOfParents === 0 && (
            <p className="mt-2 text-sm text-red-600">
              Please add at least one parent or uncheck the box above.
            </p>
          )}

          {/* Number of Parents - only shown when checkbox is checked */}
          {hasEligibleParents && (
            <div className="mt-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Number of parents:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleParentsChange(-1)}
                    disabled={formData.numberOfParents === 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Remove parent"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{formData.numberOfParents}</span>
                  <button
                    onClick={() => handleParentsChange(1)}
                    disabled={formData.numberOfParents >= TAX_CONSTANTS.MAX_PARENTS}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Add parent"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  ฿{(formData.numberOfParents * TAX_CONSTANTS.PARENT_ALLOWANCE).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Allowance Summary */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-800 mb-2">Total Allowances</h3>
        <div className="text-sm text-green-700 space-y-1">
          <div className="flex justify-between">
            <span>Personal:</span>
            <span>฿{TAX_CONSTANTS.PERSONAL_ALLOWANCE.toLocaleString()}</span>
          </div>
          {formData.maritalStatus === 'married' && formData.spouseHasNoIncome && (
            <div className="flex justify-between">
              <span>Spouse:</span>
              <span>฿{TAX_CONSTANTS.SPOUSE_ALLOWANCE.toLocaleString()}</span>
            </div>
          )}
          {formData.isAge65OrOlder && (
            <div className="flex justify-between">
              <span>Senior (65+):</span>
              <span>฿{TAX_CONSTANTS.SENIOR_ALLOWANCE.toLocaleString()}</span>
            </div>
          )}
          {formData.children.length > 0 && (
            <div className="flex justify-between">
              <span>Children:</span>
              <span>฿{getTotalChildAllowance().toLocaleString()}</span>
            </div>
          )}
          {formData.numberOfParents > 0 && (
            <div className="flex justify-between">
              <span>Parents:</span>
              <span>฿{(formData.numberOfParents * TAX_CONSTANTS.PARENT_ALLOWANCE).toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold border-t border-green-300 pt-1 mt-2">
            <span>Total:</span>
            <span>฿{totalAllowance.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DependentsStepAnnual;
