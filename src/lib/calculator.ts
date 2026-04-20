export interface ConsorcioParams {
  credit: number;
  terms: number;
  admFee: number;
  reserveFund: number;
  insurance: number; // monthly %
  ownResources: number;
  embeddedBid: number;
  redutor: number; // % reduction in installment
}

export interface FinancingParams {
  credit: number;
  terms: number;
  monthlyInterestRate: number; // e.g., 1.5
}

export interface ConsorcioResult {
  totalAdminFee: number;
  totalReserveFund: number;
  baseInstallment: number;
  insuranceValue: number;
  totalInstallment: number;
  totalDebt: number;
  totalPaid: number;
  effectiveCredit: number;
  remainingBalanceAfterBid: number;
  newInstallmentAfterBid: number;
}

export interface FinancingResult {
  monthlyInstallment: number;
  totalPaid: number;
  totalInterest: number;
}

export function calculateConsorcio(params: ConsorcioParams): ConsorcioResult {
  const { credit, terms, admFee, reserveFund, insurance, ownResources, embeddedBid, redutor } = params;

  const totalAdminFee = (credit * (admFee / 100));
  const totalReserveFund = (credit * (reserveFund / 100));
  
  const totalDebtWithFees = credit + totalAdminFee + totalReserveFund;
  const baseInstallment = (totalDebtWithFees * (1 - redutor / 100)) / terms;

  const insuranceValue = credit * (insurance / 100);
  const totalInstallment = baseInstallment + insuranceValue;
  
  const totalDebt = credit + totalAdminFee + totalReserveFund;
  
  // After bid
  const effectiveCredit = credit - embeddedBid;
  const lanceTotal = ownResources + embeddedBid;
  
  // Porto usually reduces the balance with the bid
  const remainingBalance = totalDebt - lanceTotal;
  // If reducing installment value:
  const newInstallmentAfterBid = (remainingBalance / terms) + insuranceValue;

  return {
    totalAdminFee,
    totalReserveFund,
    baseInstallment,
    insuranceValue,
    totalInstallment,
    totalDebt,
    totalPaid: totalDebt + (insuranceValue * terms),
    effectiveCredit,
    remainingBalanceAfterBid: remainingBalance,
    newInstallmentAfterBid,
  };
}

export function calculateFinancing(params: FinancingParams): FinancingResult {
  const { credit, terms, monthlyInterestRate } = params;
  const i = monthlyInterestRate / 100;
  
  if (i === 0) {
    return {
      monthlyInstallment: credit / terms,
      totalPaid: credit,
      totalInterest: 0
    };
  }

  const installment = (credit * i * Math.pow(1 + i, terms)) / (Math.pow(1 + i, terms) - 1);
  const totalPaid = installment * terms;
  const totalInterest = totalPaid - credit;

  return {
    monthlyInstallment: installment,
    totalPaid,
    totalInterest,
  };
}
