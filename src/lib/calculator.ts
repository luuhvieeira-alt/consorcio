export interface ConsorcioParams {
  clientName: string;
  credit: number;
  terms: number;
  admFee: number;
  reserveFund: number;
  insurance: number; // monthly %
  ownResources: number;
  embeddedBidPercent: number; // percentage of credit
  redutor: number; // % reduction in installment
  targetRepresentativenessPercent: number; // New: threshold for winning in a group
  contemplationMonth: number; // month of contemplation for estimation
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
  // Post-contemplation fields
  fullBaseInstallment: number;
  remainingTerms: number;
  balanceAtContemplation: number;
  balanceAfterBid: number;
  installmentReductions: {
    reduceValue: {
      newInstallment: number;
      remainingTerms: number;
    };
    reduceTerm: {
      newInstallment: number;
      remainingTerms: number;
    };
  };
}

export interface FinancingResult {
  monthlyInstallment: number;
  totalPaid: number;
  totalInterest: number;
}

export function calculateConsorcio(params: ConsorcioParams): ConsorcioResult {
  const { 
    credit, terms, admFee, reserveFund, insurance, 
    ownResources, embeddedBidPercent, redutor, 
    targetRepresentativenessPercent, contemplationMonth 
  } = params;

  const totalAdminFee = (credit * (admFee / 100));
  const totalReserveFund = (credit * (reserveFund / 100));
  
  const totalDebt = credit + totalAdminFee + totalReserveFund;
  
  // Porto logic: Full installment (Integral) is baseline for everything
  const fullBaseInstallment = totalDebt / terms;
  const reducedBaseInstallment = fullBaseInstallment * (1 - redutor / 100);

  const insuranceValue = credit * (insurance / 100);
  
  // Installment while under redutor
  const currentTotalInstallment = reducedBaseInstallment + insuranceValue;
  
  // After bid
  const embeddedBidValue = credit * (embeddedBidPercent / 100);
  const lanceTotal = ownResources + embeddedBidValue;
  const effectiveCredit = credit - embeddedBidValue;
  
  // Bid representativeness calculation (Lance Total / Total Debt)
  const bidRepresentativeness = (lanceTotal / totalDebt) * 100;

  // New: Target calculations
  const requiredTotalBidValue = totalDebt * (targetRepresentativenessPercent / 100);
  const missingOwnResourcesValue = Math.max(0, requiredTotalBidValue - embeddedBidValue - ownResources);
  
  // Post-Contemplation Logic
  // Approximation of balance at contemplation: 
  // We pay (reducedBaseInstallment) each month. 
  // Remaining Balance = TotalDebt - (Months * reducedBaseInstallment)
  const balanceAtContemplation = Math.max(0, totalDebt - (contemplationMonth * reducedBaseInstallment));
  const balanceAfterBid = Math.max(0, balanceAtContemplation - lanceTotal);
  const remainingTermsAtContemplation = Math.max(1, terms - contemplationMonth);

  // Scenario 1: Reduce Value
  // After contemplation, redutor often ends, but if we choose to reduce value, 
  // we divide balance by the remaining months.
  const newInstallmentValueOnly = balanceAfterBid / remainingTermsAtContemplation;
  
  // Scenario 2: Reduce Term
  // Balance remains divided by the FULL integral installment value to find how many months are left.
  const newRemainingTermsOnly = Math.ceil(balanceAfterBid / fullBaseInstallment);

  return {
    totalAdminFee,
    totalReserveFund,
    baseInstallment: reducedBaseInstallment,
    insuranceValue,
    totalInstallment: currentTotalInstallment,
    totalDebt,
    totalPaid: totalDebt + (insuranceValue * terms),
    effectiveCredit,
    embeddedBidValue,
    remainingBalanceAfterBid: balanceAfterBid,
    newInstallmentAfterBid: newInstallmentValueOnly + insuranceValue,
    bidRepresentativeness,
    requiredTotalBidValue,
    missingOwnResourcesValue,
    fullBaseInstallment: fullBaseInstallment + insuranceValue,
    remainingTerms: remainingTermsAtContemplation,
    balanceAtContemplation,
    balanceAfterBid,
    installmentReductions: {
      reduceValue: {
        newInstallment: newInstallmentValueOnly + insuranceValue,
        remainingTerms: remainingTermsAtContemplation
      },
      reduceTerm: {
        newInstallment: fullBaseInstallment + insuranceValue,
        remainingTerms: newRemainingTermsOnly
      }
    }
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
