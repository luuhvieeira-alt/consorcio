export interface ConsorcioParams {
  credit: number;
  terms: number;
  admFee: number;
  reserveFund: number;
  insurance: number; // monthly %
  ownResources: number;
  embeddedBidPercent: number; // percentage of credit
  redutor: number; // % reduction in installment
  targetRepresentativenessPercent: number; // New: threshold for winning in a group
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
  embeddedBidValue: number;
  remainingBalanceAfterBid: number;
  newInstallmentAfterBid: number;
  bidRepresentativeness: number;
  requiredTotalBidValue: number;
  missingOwnResourcesValue: number;
}

export interface FinancingResult {
  monthlyInstallment: number;
  totalPaid: number;
  totalInterest: number;
}

export function calculateConsorcio(params: ConsorcioParams): ConsorcioResult {
  const { credit, terms, admFee, reserveFund, insurance, ownResources, embeddedBidPercent, redutor, targetRepresentativenessPercent } = params;

  const totalAdminFee = (credit * (admFee / 100));
  const totalReserveFund = (credit * (reserveFund / 100));
  
  const totalDebt = credit + totalAdminFee + totalReserveFund;
  const baseInstallment = (totalDebt * (1 - redutor / 100)) / terms;

  const insuranceValue = credit * (insurance / 100);
  const totalInstallment = baseInstallment + insuranceValue;
  
  // After bid
  const embeddedBidValue = credit * (embeddedBidPercent / 100);
  const lanceTotal = ownResources + embeddedBidValue;
  const effectiveCredit = credit - embeddedBidValue;
  
  // Bid representativeness calculation (Lance Total / Total Debt)
  const bidRepresentativeness = (lanceTotal / totalDebt) * 100;

  // New: Target calculations
  const requiredTotalBidValue = totalDebt * (targetRepresentativenessPercent / 100);
  const missingOwnResourcesValue = Math.max(0, requiredTotalBidValue - embeddedBidValue - ownResources);
  
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
    embeddedBidValue,
    remainingBalanceAfterBid: remainingBalance,
    newInstallmentAfterBid,
    bidRepresentativeness,
    requiredTotalBidValue,
    missingOwnResourcesValue,
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
