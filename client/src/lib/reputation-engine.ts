/**
 * KI-Entity Reputation Scoring Engine
 * Calculates reputation scores based on investment behavior, payment history, and transaction volume
 * Determines creditworthiness and dynamic transaction limits
 */

export interface TransactionMetrics {
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  totalVolume: number;
  averageTransactionSize: number;
  onTimePaymentRate: number;
  latePaymentCount: number;
  defaultCount: number;
}

export interface InvestmentMetrics {
  totalInvestments: number;
  totalInvestedAmount: number;
  averageInvestmentSize: number;
  investmentDiversification: number; // 0-1
  profitabilityScore: number; // -1 to 1
  riskTolerance: "low" | "medium" | "high";
}

export interface ReputationScore {
  entityId: string;
  entityName: string;
  overallScore: number; // 0-1000
  paymentReliability: number; // 0-100
  investmentMaturity: number; // 0-100
  transactionVolume: number; // 0-100
  complianceScore: number; // 0-100
  riskRating: "AAA" | "AA" | "A" | "BBB" | "BB" | "B" | "CCC" | "CC" | "C" | "D";
  creditLimit: number;
  investmentLimit: number;
  transactionLimit: number;
  trustLevel: "Verified" | "Trusted" | "Monitored" | "Restricted" | "Suspended";
  lastUpdated: string;
  nextReviewDate: string;
}

export interface ComplianceRecord {
  entityId: string;
  checkType: "kyc" | "aml" | "sanctions" | "regulatory";
  status: "passed" | "failed" | "pending" | "flagged";
  timestamp: string;
  details: string;
}

/**
 * Calculate payment reliability score (0-100)
 */
export function calculatePaymentReliability(metrics: TransactionMetrics): number {
  if (metrics.totalTransactions === 0) return 50; // Neutral for new entities

  const successRate = metrics.successfulTransactions / metrics.totalTransactions;
  const onTimeRate = metrics.onTimePaymentRate;
  const penaltyForDefaults = Math.max(0, 100 - metrics.defaultCount * 20);

  return Math.round((successRate * 40 + onTimeRate * 40 + penaltyForDefaults * 20) / 100);
}

/**
 * Calculate investment maturity score (0-100)
 */
export function calculateInvestmentMaturity(metrics: InvestmentMetrics): number {
  if (metrics.totalInvestments === 0) return 30; // Lower score for no investment history

  const investmentCount = Math.min(metrics.totalInvestments / 10, 1) * 30;
  const diversification = metrics.investmentDiversification * 30;
  const profitability = ((metrics.profitabilityScore + 1) / 2) * 40; // Normalize -1 to 1 range

  return Math.round(investmentCount + diversification + profitability);
}

/**
 * Calculate transaction volume score (0-100)
 */
export function calculateTransactionVolume(metrics: TransactionMetrics): number {
  // Normalize volume to 0-100 scale (assuming max reasonable volume is 1M EUR)
  const volumeScore = Math.min(metrics.totalVolume / 10000, 1) * 100;
  const frequencyScore = Math.min(metrics.totalTransactions / 100, 1) * 100;

  return Math.round((volumeScore * 0.6 + frequencyScore * 0.4));
}

/**
 * Calculate compliance score (0-100)
 */
export function calculateComplianceScore(complianceRecords: ComplianceRecord[]): number {
  if (complianceRecords.length === 0) return 70; // Neutral for new entities

  const passed = complianceRecords.filter(r => r.status === "passed").length;
  const failed = complianceRecords.filter(r => r.status === "failed").length;
  const flagged = complianceRecords.filter(r => r.status === "flagged").length;

  const passRate = (passed / complianceRecords.length) * 100;
  const failPenalty = failed * 15;
  const flagPenalty = flagged * 10;

  return Math.max(0, Math.round(passRate - failPenalty - flagPenalty));
}

/**
 * Determine risk rating based on overall score
 */
export function determineRiskRating(overallScore: number): "AAA" | "AA" | "A" | "BBB" | "BB" | "B" | "CCC" | "CC" | "C" | "D" {
  if (overallScore >= 900) return "AAA";
  if (overallScore >= 850) return "AA";
  if (overallScore >= 800) return "A";
  if (overallScore >= 750) return "BBB";
  if (overallScore >= 700) return "BB";
  if (overallScore >= 650) return "B";
  if (overallScore >= 600) return "CCC";
  if (overallScore >= 550) return "CC";
  if (overallScore >= 500) return "C";
  return "D";
}

/**
 * Determine trust level based on risk rating
 */
export function determineTrustLevel(riskRating: string): "Verified" | "Trusted" | "Monitored" | "Restricted" | "Suspended" {
  switch (riskRating) {
    case "AAA":
    case "AA":
      return "Verified";
    case "A":
    case "BBB":
      return "Trusted";
    case "BB":
    case "B":
      return "Monitored";
    case "CCC":
    case "CC":
      return "Restricted";
    default:
      return "Suspended";
  }
}

/**
 * Calculate dynamic credit limit based on reputation score
 */
export function calculateCreditLimit(overallScore: number, baseLimit: number = 50000): number {
  const scoreMultiplier = overallScore / 1000;
  return Math.round(baseLimit * scoreMultiplier * (1 + scoreMultiplier * 0.5));
}

/**
 * Calculate dynamic investment limit based on investment maturity
 */
export function calculateInvestmentLimit(investmentMaturity: number, baseLimit: number = 100000): number {
  const maturityMultiplier = investmentMaturity / 100;
  return Math.round(baseLimit * maturityMultiplier * (1 + maturityMultiplier * 0.3));
}

/**
 * Calculate dynamic transaction limit based on payment reliability
 */
export function calculateTransactionLimit(paymentReliability: number, baseLimit: number = 25000): number {
  const reliabilityMultiplier = paymentReliability / 100;
  return Math.round(baseLimit * reliabilityMultiplier * (1 + reliabilityMultiplier * 0.4));
}

/**
 * Generate comprehensive reputation score
 */
export function generateReputationScore(
  entityId: string,
  entityName: string,
  transactionMetrics: TransactionMetrics,
  investmentMetrics: InvestmentMetrics,
  complianceRecords: ComplianceRecord[]
): ReputationScore {
  const paymentReliability = calculatePaymentReliability(transactionMetrics);
  const investmentMaturity = calculateInvestmentMaturity(investmentMetrics);
  const transactionVolume = calculateTransactionVolume(transactionMetrics);
  const complianceScore = calculateComplianceScore(complianceRecords);

  // Weighted overall score
  const overallScore = Math.round(
    paymentReliability * 0.3 + investmentMaturity * 0.25 + transactionVolume * 0.25 + complianceScore * 0.2
  );

  const riskRating = determineRiskRating(overallScore);
  const trustLevel = determineTrustLevel(riskRating);

  return {
    entityId,
    entityName,
    overallScore,
    paymentReliability,
    investmentMaturity,
    transactionVolume,
    complianceScore,
    riskRating,
    creditLimit: calculateCreditLimit(overallScore),
    investmentLimit: calculateInvestmentLimit(investmentMaturity),
    transactionLimit: calculateTransactionLimit(paymentReliability),
    trustLevel,
    lastUpdated: new Date().toISOString(),
    nextReviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

/**
 * Check if entity can perform transaction
 */
export function canPerformTransaction(score: ReputationScore, transactionAmount: number): {
  allowed: boolean;
  reason?: string;
} {
  if (score.trustLevel === "Suspended") {
    return { allowed: false, reason: "Account suspended due to compliance issues" };
  }

  if (transactionAmount > score.transactionLimit) {
    return {
      allowed: false,
      reason: `Transaction exceeds limit of ${score.transactionLimit.toLocaleString()} EUR`,
    };
  }

  if (score.trustLevel === "Restricted" && transactionAmount > score.transactionLimit * 0.5) {
    return {
      allowed: false,
      reason: "Restricted account: transaction amount exceeds 50% of limit",
    };
  }

  return { allowed: true };
}

/**
 * Check if entity can invest
 */
export function canInvest(score: ReputationScore, investmentAmount: number): {
  allowed: boolean;
  reason?: string;
} {
  if (score.trustLevel === "Suspended") {
    return { allowed: false, reason: "Account suspended: cannot invest" };
  }

  if (investmentAmount > score.investmentLimit) {
    return {
      allowed: false,
      reason: `Investment exceeds limit of ${score.investmentLimit.toLocaleString()} EUR`,
    };
  }

  if (score.investmentMaturity < 30) {
    return {
      allowed: false,
      reason: "Insufficient investment history. Minimum maturity score: 30",
    };
  }

  return { allowed: true };
}

/**
 * Generate reputation report for compliance
 */
export function generateReputationReport(score: ReputationScore): string {
  return `
╔════════════════════════════════════════════════════════════════╗
║           KI-ENTITY REPUTATION REPORT                          ║
╚════════════════════════════════════════════════════════════════╝

Entity: ${score.entityName} (${score.entityId})
Generated: ${new Date(score.lastUpdated).toLocaleString()}
Next Review: ${new Date(score.nextReviewDate).toLocaleString()}

OVERALL REPUTATION SCORE
────────────────────────────────────────────────────────────────
Score: ${score.overallScore}/1000
Risk Rating: ${score.riskRating}
Trust Level: ${score.trustLevel}

COMPONENT SCORES
────────────────────────────────────────────────────────────────
Payment Reliability:     ${score.paymentReliability}/100
Investment Maturity:     ${score.investmentMaturity}/100
Transaction Volume:      ${score.transactionVolume}/100
Compliance Score:        ${score.complianceScore}/100

DYNAMIC LIMITS
────────────────────────────────────────────────────────────────
Credit Limit:            ${score.creditLimit.toLocaleString()} EUR
Investment Limit:        ${score.investmentLimit.toLocaleString()} EUR
Transaction Limit:       ${score.transactionLimit.toLocaleString()} EUR

RISK ASSESSMENT
────────────────────────────────────────────────────────────────
Rating Scale:
  AAA/AA  = Verified (Highest Trust)
  A/BBB   = Trusted (High Trust)
  BB/B    = Monitored (Medium Trust)
  CCC/CC  = Restricted (Low Trust)
  C/D     = Suspended (No Trust)

Current Status: ${score.trustLevel}

COMPLIANCE NOTES
────────────────────────────────────────────────────────────────
• All scores are updated monthly
• Limits may be adjusted based on activity
• Compliance violations may result in account restrictions
• Suspended accounts require manual review for reinstatement

═══════════════════════════════════════════════════════════════════
`;
}
