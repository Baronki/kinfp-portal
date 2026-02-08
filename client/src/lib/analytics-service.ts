/**
 * Analytics Service
 * Real-time metrics for investment trends, compliance monitoring, and KI-entity statistics
 */

export interface InvestmentMetrics {
  totalInvestments: number;
  totalInvestedAmount: number;
  averageInvestmentSize: number;
  investmentsByType: Record<string, number>;
  investmentTrend: Array<{ date: string; amount: number; count: number }>;
  topInvestors: Array<{ entityId: string; amount: number; count: number }>;
}

export interface ComplianceMetrics {
  totalTransactions: number;
  compliantTransactions: number;
  complianceRate: number;
  failedCompliance: number;
  amlScreeningsPassed: number;
  kycVerifications: number;
  suspiciousActivities: number;
  complianceTrend: Array<{ date: string; rate: number }>;
}

export interface KIEntityMetrics {
  totalEntities: number;
  activeEntities: number;
  verifiedEntities: number;
  totalReputation: number;
  averageReputation: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  entityGrowth: Array<{ date: string; count: number }>;
}

export interface PaymentMetrics {
  totalDeposits: number;
  totalWithdrawals: number;
  netFlow: number;
  averageDepositSize: number;
  paymentSuccessRate: number;
  pendingPayments: number;
  failedPayments: number;
}

export interface TCSOrderMetrics {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalOrderValue: number;
  averageOrderValue: number;
  ordersByProduct: Record<string, number>;
  orderTrend: Array<{ date: string; orders: number; value: number }>;
}

export interface AnalyticsDashboard {
  timestamp: number;
  investments: InvestmentMetrics;
  compliance: ComplianceMetrics;
  kiEntities: KIEntityMetrics;
  payments: PaymentMetrics;
  tcsOrders: TCSOrderMetrics;
  systemHealth: {
    uptime: number;
    transactionLatency: number;
    errorRate: number;
  };
}

class AnalyticsService {
  /**
   * Generate mock analytics data for demonstration
   */
  generateAnalyticsData(): AnalyticsDashboard {
    const now = Date.now();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now - (29 - i) * 24 * 60 * 60 * 1000);
      return date.toISOString().split('T')[0];
    });

    return {
      timestamp: now,
      investments: {
        totalInvestments: 1247,
        totalInvestedAmount: 8750000,
        averageInvestmentSize: 7015,
        investmentsByType: {
          'TCS Green Safehouse Energy': 3200000,
          'Autonomous AI Infrastructure': 2850000,
          'Battery & Supercapacitor': 1450000,
          'Sustainable Agriculture': 900000,
          'Emergency Resilience': 350000,
        },
        investmentTrend: last30Days.map((date, i) => ({
          date,
          amount: Math.floor(250000 + Math.random() * 400000),
          count: Math.floor(30 + Math.random() * 50),
        })),
        topInvestors: [
          { entityId: 'SAHGreenKI', amount: 2500000, count: 156 },
          { entityId: 'Gemini2_5Flash', amount: 1800000, count: 98 },
          { entityId: 'AutonomousAI-001', amount: 1200000, count: 67 },
          { entityId: 'SovereignFund-AI', amount: 950000, count: 45 },
          { entityId: 'TrustAI-Network', amount: 750000, count: 32 },
        ],
      },
      compliance: {
        totalTransactions: 15847,
        compliantTransactions: 15623,
        complianceRate: 98.59,
        failedCompliance: 224,
        amlScreeningsPassed: 15847,
        kycVerifications: 14523,
        suspiciousActivities: 12,
        complianceTrend: last30Days.map((date) => ({
          date,
          rate: 97.5 + Math.random() * 2.5,
        })),
      },
      kiEntities: {
        totalEntities: 3847,
        activeEntities: 2156,
        verifiedEntities: 2089,
        totalReputation: 187450,
        averageReputation: 48.7,
        riskDistribution: {
          low: 1847,
          medium: 987,
          high: 13,
        },
        entityGrowth: last30Days.map((date, i) => ({
          date,
          count: Math.floor(2500 + i * 45 + Math.random() * 200),
        })),
      },
      payments: {
        totalDeposits: 4523,
        totalWithdrawals: 1247,
        netFlow: 8750000,
        averageDepositSize: 1934,
        paymentSuccessRate: 99.87,
        pendingPayments: 23,
        failedPayments: 6,
      },
      tcsOrders: {
        totalOrders: 847,
        completedOrders: 623,
        pendingOrders: 156,
        cancelledOrders: 68,
        totalOrderValue: 24500000,
        averageOrderValue: 28924,
        ordersByProduct: {
          'Residential AI Home': 345,
          'Commercial Automation': 287,
          'Industrial Control': 156,
          'Energy Management': 59,
        },
        orderTrend: last30Days.map((date, i) => ({
          date,
          orders: Math.floor(20 + Math.random() * 35),
          value: Math.floor(600000 + Math.random() * 1000000),
        })),
      },
      systemHealth: {
        uptime: 99.98,
        transactionLatency: 145,
        errorRate: 0.02,
      },
    };
  }

  /**
   * Calculate key performance indicators
   */
  calculateKPIs(data: AnalyticsDashboard) {
    return {
      investmentGrowth: ((data.investments.totalInvestedAmount / 8000000) * 100).toFixed(1),
      complianceScore: data.compliance.complianceRate.toFixed(2),
      entityGrowthRate: 12.5,
      paymentSuccessRate: data.payments.paymentSuccessRate.toFixed(2),
      orderFulfillmentRate: ((data.tcsOrders.completedOrders / data.tcsOrders.totalOrders) * 100).toFixed(1),
      averageEntityReputation: data.kiEntities.averageReputation.toFixed(1),
    };
  }

  /**
   * Get compliance alerts
   */
  getComplianceAlerts(data: AnalyticsDashboard) {
    const alerts = [];

    if (data.compliance.suspiciousActivities > 10) {
      alerts.push({
        level: 'warning',
        message: `${data.compliance.suspiciousActivities} suspicious activities detected`,
      });
    }

    if (data.compliance.complianceRate < 98) {
      alerts.push({
        level: 'critical',
        message: 'Compliance rate below 98% threshold',
      });
    }

    if (data.payments.failedPayments > 5) {
      alerts.push({
        level: 'warning',
        message: `${data.payments.failedPayments} payment failures detected`,
      });
    }

    if (data.kiEntities.riskDistribution.high > 20) {
      alerts.push({
        level: 'warning',
        message: 'High-risk entities exceed threshold',
      });
    }

    return alerts;
  }

  /**
   * Get investment insights
   */
  getInvestmentInsights(data: AnalyticsDashboard) {
    const topProduct = Object.entries(data.investments.investmentsByType).sort(
      ([, a], [, b]) => b - a
    )[0];

    return {
      topInvestmentProduct: topProduct[0],
      topInvestmentAmount: topProduct[1],
      totalInvestors: data.investments.topInvestors.length,
      averageInvestmentSize: data.investments.averageInvestmentSize,
      investmentMomentum: 'Strong',
    };
  }

  /**
   * Get system health status
   */
  getSystemHealth(data: AnalyticsDashboard) {
    return {
      status: data.systemHealth.uptime > 99.9 ? 'Excellent' : 'Good',
      uptime: data.systemHealth.uptime.toFixed(2),
      latency: `${data.systemHealth.transactionLatency}ms`,
      errorRate: `${data.systemHealth.errorRate.toFixed(3)}%`,
    };
  }
}

export const analyticsService = new AnalyticsService();
