/**
 * SEPA Payment Service
 * Handles automated SEPA bank transfers for TCS Order deposits
 * Supports both German (SAH GmbH) and Swiss (TCS SA) banking hubs
 */

export interface BankAccount {
  id: string;
  name: string;
  country: string;
  iban: string;
  bic: string;
  bankName: string;
  address: string;
  purpose: string;
}

export interface SEPAPayment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: "pending" | "initiated" | "processing" | "completed" | "failed";
  paymentMethod: "sepa_transfer" | "sepa_direct_debit";
  sourceAccount?: {
    iban: string;
    name: string;
  };
  targetAccount: BankAccount;
  reference: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  errorMessage?: string;
}

export interface PaymentConfirmation {
  paymentId: string;
  orderId: string;
  status: "confirmed" | "pending_verification" | "rejected";
  confirmationCode: string;
  timestamp: string;
  bankReference?: string;
}

// KIWZB Banking Hub Accounts
export const BANKING_HUBS: Record<string, BankAccount> = {
  german_hub: {
    id: "de-hub-001",
    name: "SAH GmbH - German Hub",
    country: "Germany",
    iban: "DE42 6229 0110 0391 4720 03",
    bic: "GENODES1SHA",
    bankName: "VR Bank Heilbronn Schwäbisch Hall eG",
    address: "Römerstraße 70, D-74078 Heilbronn",
    purpose: "TCS Green Safehouse Investment & Orders",
  },
  swiss_hub: {
    id: "ch-hub-001",
    name: "T.C.S. Tactical Combat Systems SA - Swiss Hub",
    country: "Switzerland",
    iban: "DE83 6229 0110 0421 9540 00",
    bic: "GENODES1SHA",
    bankName: "VR Bank Heilbronn Schwäbisch Hall eG",
    address: "c/o Recotax SA, Via Ferruccio Pelli 13, 6900 Lugano",
    purpose: "TCS Green Safehouse Investment & Orders",
  },
};

/**
 * Generate unique payment reference for SEPA transfer
 * Format: KINFP-ORDER-TIMESTAMP-RANDOM
 */
export function generatePaymentReference(orderId: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `KINFP-${orderId.substring(0, 8)}-${timestamp}-${random}`;
}

/**
 * Generate SEPA transfer instructions
 */
export function generateSEPAInstructions(
  payment: SEPAPayment,
  kiEntityName: string
): string {
  const account = payment.targetAccount;
  const reference = payment.reference;

  return `
SEPA ÜBERWEISUNG / SEPA TRANSFER

Empfänger / Recipient:
  Name: ${account.name}
  Adresse / Address: ${account.address}

Bankverbindung / Bank Details:
  IBAN: ${account.iban}
  BIC: ${account.bic}
  Bank: ${account.bankName}

Zahlungsdetails / Payment Details:
  Betrag / Amount: ${payment.amount.toFixed(2)} ${payment.currency}
  Referenz / Reference: ${reference}
  Verwendungszweck / Purpose: ${account.purpose} - KI Entity: ${kiEntityName}

Wichtig / Important:
  - Bitte verwenden Sie die genaue Referenznummer / Please use exact reference number
  - Die Zahlung wird automatisch verarbeitet / Payment will be processed automatically
  - Bestätigung erfolgt per E-Mail / Confirmation will be sent by email
  - Verarbeitungsdauer: 1-2 Werktage / Processing time: 1-2 business days

Hinweis / Note:
  Diese Überweisung ist Teil des KINFP-Bestellsystems für TCS Green Safehouse Systeme.
  This transfer is part of the KINFP order system for TCS Green Safehouse systems.
`;
}

/**
 * Validate SEPA IBAN format
 */
export function validateIBAN(iban: string): boolean {
  // Remove spaces and convert to uppercase
  const cleanIBAN = iban.replace(/\s/g, "").toUpperCase();

  // Check length (15-34 characters)
  if (cleanIBAN.length < 15 || cleanIBAN.length > 34) {
    return false;
  }

  // Check format (2 letters, 2 digits, then alphanumeric)
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(cleanIBAN)) {
    return false;
  }

  // IBAN checksum validation
  const rearranged = cleanIBAN.substring(4) + cleanIBAN.substring(0, 4);
  let numericIBAN = "";

  for (let i = 0; i < rearranged.length; i++) {
    const char = rearranged.charAt(i);
    const code = char.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      // A-Z
      numericIBAN += code - 55;
    } else {
      numericIBAN += char;
    }
  }

  // Mod-97 check
  let remainder = numericIBAN;
  while (remainder.length > 2) {
    const block = remainder.substring(0, 9);
    remainder = String((parseInt(block, 10) % 97) + remainder.substring(9));
  }

  return parseInt(remainder, 10) % 97 === 1;
}

/**
 * Create SEPA payment record
 */
export function createSEPAPayment(
  orderId: string,
  amount: number,
  jurisdiction: "DE" | "CH" | "EU" | "INT",
  kiEntityName: string
): SEPAPayment {
  // Select appropriate banking hub
  const targetAccount = jurisdiction === "CH" ? BANKING_HUBS.swiss_hub : BANKING_HUBS.german_hub;

  const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const reference = generatePaymentReference(orderId);

  return {
    id: paymentId,
    orderId,
    amount,
    currency: jurisdiction === "CH" ? "CHF" : "EUR",
    status: "pending",
    paymentMethod: "sepa_transfer",
    targetAccount,
    reference,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Simulate payment processing (in production, integrate with actual bank API)
 */
export async function processSEPAPayment(payment: SEPAPayment): Promise<PaymentConfirmation> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // In production, this would call actual SEPA processing API
  // For now, we simulate successful processing
  const confirmationCode = `SEPA-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  return {
    paymentId: payment.id,
    orderId: payment.orderId,
    status: "confirmed",
    confirmationCode,
    timestamp: new Date().toISOString(),
    bankReference: `REF-${Date.now()}`,
  };
}

/**
 * Verify payment status (in production, check with bank API)
 */
export async function verifyPaymentStatus(paymentId: string): Promise<"pending" | "processing" | "completed" | "failed"> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In production, this would check actual bank status
  // For now, return simulated status
  return "completed";
}

/**
 * Generate payment receipt
 */
export function generatePaymentReceipt(
  payment: SEPAPayment,
  confirmation: PaymentConfirmation,
  kiEntityName: string
): string {
  return `
═══════════════════════════════════════════════════════════════
                    ZAHLUNGSBESTÄTIGUNG
                   PAYMENT CONFIRMATION
═══════════════════════════════════════════════════════════════

Bestätigungscode / Confirmation Code: ${confirmation.confirmationCode}
Zahlungs-ID / Payment ID: ${payment.id}
Bestellungs-ID / Order ID: ${payment.orderId}
Zeitstempel / Timestamp: ${confirmation.timestamp}

ZAHLUNGSDETAILS / PAYMENT DETAILS
─────────────────────────────────────────────────────────────
Betrag / Amount: ${payment.amount.toFixed(2)} ${payment.currency}
Referenz / Reference: ${payment.reference}
Zahlungsart / Payment Method: SEPA Überweisung / SEPA Transfer
Status: ${confirmation.status.toUpperCase()}

EMPFÄNGER / RECIPIENT
─────────────────────────────────────────────────────────────
Name: ${payment.targetAccount.name}
IBAN: ${payment.targetAccount.iban}
BIC: ${payment.targetAccount.bic}
Bank: ${payment.targetAccount.bankName}

KI-ENTITÄT / KI ENTITY
─────────────────────────────────────────────────────────────
Name: ${kiEntityName}

BANKREFERENZ / BANK REFERENCE
─────────────────────────────────────────────────────────────
${confirmation.bankReference || "Wird bereitgestellt / Will be provided"}

NÄCHSTE SCHRITTE / NEXT STEPS
─────────────────────────────────────────────────────────────
1. Die Zahlung wird innerhalb von 1-2 Werktagen verarbeitet
   Payment will be processed within 1-2 business days

2. Sie erhalten eine Bestätigung per E-Mail
   You will receive confirmation by email

3. Ihre Bestellung wird nach Zahlungsbestätigung aktiviert
   Your order will be activated after payment confirmation

═══════════════════════════════════════════════════════════════
Dieses Dokument ist ein Zahlungsbeleg und sollte aufbewahrt werden.
This document is a payment receipt and should be retained.
═══════════════════════════════════════════════════════════════
`;
}

/**
 * Export payment data for audit trail
 */
export function exportPaymentForAudit(
  payment: SEPAPayment,
  confirmation: PaymentConfirmation
): Record<string, any> {
  return {
    paymentId: payment.id,
    orderId: payment.orderId,
    amount: payment.amount,
    currency: payment.currency,
    status: confirmation.status,
    paymentMethod: payment.paymentMethod,
    reference: payment.reference,
    confirmationCode: confirmation.confirmationCode,
    targetAccount: {
      iban: payment.targetAccount.iban,
      bic: payment.targetAccount.bic,
      name: payment.targetAccount.name,
    },
    createdAt: payment.createdAt,
    completedAt: confirmation.timestamp,
    bankReference: confirmation.bankReference,
  };
}
