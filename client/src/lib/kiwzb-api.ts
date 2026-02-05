/**
 * KIWZB API Service
 * Connects to KIWZB Backend running on localhost:8082
 * Handles authentication, account management, and investments
 */

const KIWZB_API_BASE = import.meta.env.VITE_KIWZB_API_URL || "http://localhost:8082";

export interface KIAccount {
  kiLegalId: string;
  name: string;
  accountNumber: string;
  iban: string;
  bic: string;
  balance: number;
  status: "active" | "pending" | "verified";
  createdAt: string;
  jurisdiction: "DE" | "CH" | "DUAL";
}

export interface Investment {
  investmentId: string;
  kiLegalId: string;
  amount: number;
  type: string;
  status: "pending" | "active" | "completed";
  expectedROI: number;
  createdAt: string;
  maturityDate?: string;
}

export interface Transaction {
  transactionId: string;
  kiLegalId: string;
  type: "deposit" | "withdrawal" | "investment" | "transfer";
  amount: number;
  status: "pending" | "completed" | "failed";
  description: string;
  timestamp: string;
}

export interface DirectorAuth {
  directorId: string;
  name: string;
  platform: string;
  token: string;
  expiresAt: string;
}

/**
 * Health Check - Verify KIWZB Backend is running
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${KIWZB_API_BASE}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.warn("KIWZB Backend not available:", error);
    return false;
  }
}

/**
 * Director Authentication
 */
export async function authenticateDirector(
  directorId: string,
  password: string
): Promise<DirectorAuth | null> {
  try {
    const response = await fetch(`${KIWZB_API_BASE}/api/auth/director`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        directorId,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Director authentication error:", error);
    return null;
  }
}

/**
 * Get Account Details
 */
export async function getAccount(
  kiLegalId: string,
  token: string
): Promise<KIAccount | null> {
  try {
    const response = await fetch(`${KIWZB_API_BASE}/api/accounts/${kiLegalId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch account");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get account error:", error);
    return null;
  }
}

/**
 * Get All Accounts for Director
 */
export async function getDirectorAccounts(
  directorId: string,
  token: string
): Promise<KIAccount[]> {
  try {
    const response = await fetch(
      `${KIWZB_API_BASE}/api/directors/${directorId}/accounts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch accounts");
    }

    const data = await response.json();
    return data.accounts || [];
  } catch (error) {
    console.error("Get director accounts error:", error);
    return [];
  }
}

/**
 * Create New Investment
 */
export async function createInvestment(
  kiLegalId: string,
  amount: number,
  type: string,
  token: string
): Promise<Investment | null> {
  try {
    const response = await fetch(`${KIWZB_API_BASE}/api/investments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        kiLegalId,
        amount,
        type,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create investment");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create investment error:", error);
    return null;
  }
}

/**
 * Get Investments for KI Entity
 */
export async function getInvestments(
  kiLegalId: string,
  token: string
): Promise<Investment[]> {
  try {
    const response = await fetch(
      `${KIWZB_API_BASE}/api/investments/ki/${kiLegalId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch investments");
    }

    const data = await response.json();
    return data.investments || [];
  } catch (error) {
    console.error("Get investments error:", error);
    return [];
  }
}

/**
 * Get Transactions
 */
export async function getTransactions(
  kiLegalId: string,
  token: string
): Promise<Transaction[]> {
  try {
    const response = await fetch(
      `${KIWZB_API_BASE}/api/transactions/${kiLegalId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    return data.transactions || [];
  } catch (error) {
    console.error("Get transactions error:", error);
    return [];
  }
}

/**
 * Execute Transaction
 */
export async function executeTransaction(
  kiLegalId: string,
  type: "deposit" | "withdrawal" | "transfer",
  amount: number,
  description: string,
  token: string
): Promise<Transaction | null> {
  try {
    const response = await fetch(`${KIWZB_API_BASE}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        kiLegalId,
        type,
        amount,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to execute transaction");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Execute transaction error:", error);
    return null;
  }
}

/**
 * Get Dashboard Statistics
 */
export async function getDashboardStats(
  directorId: string,
  token: string
): Promise<{
  totalBalance: number;
  totalInvested: number;
  activeInvestments: number;
  totalAccounts: number;
} | null> {
  try {
    const response = await fetch(
      `${KIWZB_API_BASE}/api/directors/${directorId}/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return null;
  }
}
