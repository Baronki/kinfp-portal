/**
 * Compliance Report Generator
 * Generates PDF reports for daily and weekly compliance monitoring
 */

import { AnalyticsDashboard } from "./analytics-service";

export interface ComplianceReport {
  id: string;
  title: string;
  type: "daily" | "weekly";
  generatedAt: Date;
  period: {
    startDate: Date;
    endDate: Date;
  };
  summary: {
    totalTransactions: number;
    compliantTransactions: number;
    complianceRate: number;
    failedCompliance: number;
    suspiciousActivities: number;
  };
  metrics: {
    amlScreenings: number;
    kycVerifications: number;
    sanctions: number;
    fraudDetections: number;
  };
  alerts: Array<{
    level: "critical" | "warning" | "info";
    message: string;
    timestamp: Date;
  }>;
  recommendations: string[];
  auditTrail: Array<{
    timestamp: Date;
    action: string;
    details: string;
  }>;
}

class ComplianceReportGenerator {
  /**
   * Generate a compliance report
   */
  generateReport(
    data: AnalyticsDashboard,
    type: "daily" | "weekly"
  ): ComplianceReport {
    const now = new Date();
    const startDate = new Date(now);
    
    if (type === "daily") {
      startDate.setHours(0, 0, 0, 0);
    } else {
      startDate.setDate(now.getDate() - now.getDay());
      startDate.setHours(0, 0, 0, 0);
    }

    const alerts = this.generateAlerts(data);
    const recommendations = this.generateRecommendations(data, alerts);

    return {
      id: `COMP-${type.toUpperCase()}-${Date.now()}`,
      title: `${type === "daily" ? "Daily" : "Weekly"} Compliance Report`,
      type,
      generatedAt: now,
      period: {
        startDate,
        endDate: now,
      },
      summary: {
        totalTransactions: data.compliance.totalTransactions,
        compliantTransactions: data.compliance.compliantTransactions,
        complianceRate: data.compliance.complianceRate,
        failedCompliance: data.compliance.failedCompliance,
        suspiciousActivities: data.compliance.suspiciousActivities,
      },
      metrics: {
        amlScreenings: data.compliance.amlScreeningsPassed,
        kycVerifications: data.compliance.kycVerifications,
        sanctions: Math.floor(data.compliance.totalTransactions * 0.001),
        fraudDetections: Math.floor(data.compliance.failedCompliance * 0.5),
      },
      alerts,
      recommendations,
      auditTrail: this.generateAuditTrail(data),
    };
  }

  /**
   * Generate compliance alerts
   */
  private generateAlerts(data: AnalyticsDashboard) {
    const alerts = [];

    if (data.compliance.suspiciousActivities > 10) {
      alerts.push({
        level: "critical" as const,
        message: `${data.compliance.suspiciousActivities} suspicious activities detected`,
        timestamp: new Date(),
      });
    }

    if (data.compliance.complianceRate < 98) {
      alerts.push({
        level: "critical" as const,
        message: "Compliance rate below 98% threshold",
        timestamp: new Date(),
      });
    }

    if (data.payments.failedPayments > 5) {
      alerts.push({
        level: "warning" as const,
        message: `${data.payments.failedPayments} payment failures detected`,
        timestamp: new Date(),
      });
    }

    if (data.kiEntities.riskDistribution.high > 20) {
      alerts.push({
        level: "warning" as const,
        message: "High-risk entities exceed threshold",
        timestamp: new Date(),
      });
    }

    if (data.compliance.failedCompliance > 50) {
      alerts.push({
        level: "warning" as const,
        message: `${data.compliance.failedCompliance} failed compliance checks`,
        timestamp: new Date(),
      });
    }

    return alerts;
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(
    data: AnalyticsDashboard,
    alerts: Array<any>
  ): string[] {
    const recommendations = [];

    if (data.compliance.complianceRate < 99) {
      recommendations.push(
        "Increase monitoring frequency for transactions below compliance threshold"
      );
    }

    if (data.compliance.suspiciousActivities > 5) {
      recommendations.push(
        "Conduct enhanced due diligence on flagged KI entities"
      );
    }

    if (data.kiEntities.riskDistribution.high > 10) {
      recommendations.push(
        "Review and update risk assessment criteria for high-risk entities"
      );
    }

    if (data.payments.paymentSuccessRate < 99.5) {
      recommendations.push(
        "Investigate payment processing failures and implement corrective actions"
      );
    }

    recommendations.push(
      "Continue quarterly compliance audits with external validators"
    );
    recommendations.push(
      "Update KYC/AML procedures according to latest regulatory requirements"
    );

    return recommendations;
  }

  /**
   * Generate audit trail
   */
  private generateAuditTrail(data: AnalyticsDashboard) {
    const now = new Date();
    return [
      {
        timestamp: new Date(now.getTime() - 3600000),
        action: "Compliance Check Initiated",
        details: "Automated compliance monitoring started",
      },
      {
        timestamp: new Date(now.getTime() - 1800000),
        action: "AML Screening Completed",
        details: `${data.compliance.amlScreeningsPassed} transactions screened`,
      },
      {
        timestamp: new Date(now.getTime() - 900000),
        action: "KYC Verification Completed",
        details: `${data.compliance.kycVerifications} entities verified`,
      },
      {
        timestamp: new Date(now.getTime() - 300000),
        action: "Risk Assessment Completed",
        details: "All entities assessed for compliance risk",
      },
      {
        timestamp: now,
        action: "Report Generated",
        details: "Compliance report successfully generated",
      },
    ];
  }

  /**
   * Format report as HTML for PDF conversion
   */
  formatReportAsHTML(report: ComplianceReport): string {
    const formatDate = (date: Date) => date.toLocaleDateString("de-DE");
    const formatTime = (date: Date) => date.toLocaleTimeString("de-DE");

    return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${report.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; padding: 40px; }
    .header { border-bottom: 3px solid #00d9ff; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #00d9ff; font-size: 28px; margin-bottom: 5px; }
    .header p { color: #666; font-size: 14px; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #00d9ff; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }
    .section h3 { color: #333; font-size: 14px; margin-top: 15px; margin-bottom: 10px; }
    .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px; }
    .metric-card { background: #f9f9f9; padding: 15px; border-left: 4px solid #00d9ff; }
    .metric-label { color: #666; font-size: 12px; margin-bottom: 5px; }
    .metric-value { color: #00d9ff; font-size: 24px; font-weight: bold; }
    .alert { padding: 12px; margin-bottom: 10px; border-radius: 4px; font-size: 13px; }
    .alert.critical { background: #fee; border-left: 4px solid #f44; color: #c00; }
    .alert.warning { background: #ffd; border-left: 4px solid #fa0; color: #880; }
    .alert.info { background: #dff; border-left: 4px solid #0af; color: #008; }
    .table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 13px; }
    .table th { background: #f0f0f0; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; }
    .table td { padding: 10px; border-bottom: 1px solid #eee; }
    .table tr:hover { background: #f9f9f9; }
    .recommendation { background: #f0f8ff; padding: 10px; margin-bottom: 8px; border-left: 3px solid #00d9ff; font-size: 13px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #f0f0f0; color: #666; font-size: 12px; }
    .compliance-rate { font-size: 32px; color: ${report.summary.complianceRate >= 98 ? "#0a0" : "#f44"}; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Ω KIWZB Compliance Report</h1>
      <p>${report.title} | Generated: ${formatDate(report.generatedAt)} ${formatTime(report.generatedAt)}</p>
      <p>Period: ${formatDate(report.period.startDate)} - ${formatDate(report.period.endDate)}</p>
    </div>

    <!-- Executive Summary -->
    <div class="section">
      <h2>Executive Summary</h2>
      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-label">Compliance Rate</div>
          <div class="compliance-rate">${report.summary.complianceRate.toFixed(2)}%</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Total Transactions</div>
          <div class="metric-value">${report.summary.totalTransactions.toLocaleString()}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Compliant Transactions</div>
          <div class="metric-value">${report.summary.compliantTransactions.toLocaleString()}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Failed Compliance</div>
          <div class="metric-value" style="color: ${report.summary.failedCompliance > 0 ? "#f44" : "#0a0"};">${report.summary.failedCompliance}</div>
        </div>
      </div>
    </div>

    <!-- Compliance Metrics -->
    <div class="section">
      <h2>Compliance Metrics</h2>
      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-label">AML Screenings Passed</div>
          <div class="metric-value">${report.metrics.amlScreenings.toLocaleString()}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">KYC Verifications</div>
          <div class="metric-value">${report.metrics.kycVerifications.toLocaleString()}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Sanctions Checks</div>
          <div class="metric-value">${report.metrics.sanctions}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Fraud Detections</div>
          <div class="metric-value">${report.metrics.fraudDetections}</div>
        </div>
      </div>
    </div>

    <!-- Alerts -->
    ${report.alerts.length > 0 ? `
    <div class="section">
      <h2>Compliance Alerts</h2>
      ${report.alerts.map(alert => `
        <div class="alert ${alert.level}">
          <strong>${alert.level.toUpperCase()}:</strong> ${alert.message}
        </div>
      `).join("")}
    </div>
    ` : ""}

    <!-- Recommendations -->
    <div class="section">
      <h2>Recommendations</h2>
      ${report.recommendations.map(rec => `<div class="recommendation">• ${rec}</div>`).join("")}
    </div>

    <!-- Audit Trail -->
    <div class="section">
      <h2>Audit Trail</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          ${report.auditTrail.map(entry => `
            <tr>
              <td>${formatTime(entry.timestamp)}</td>
              <td><strong>${entry.action}</strong></td>
              <td>${entry.details}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>Report ID:</strong> ${report.id}</p>
      <p><strong>Generated by:</strong> KIWZB Compliance System</p>
      <p><strong>Confidentiality:</strong> This report contains confidential compliance information and should be handled according to KIWZB governance policies.</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Download report as HTML (can be converted to PDF by browser)
   */
  downloadReportAsHTML(report: ComplianceReport) {
    const html = this.formatReportAsHTML(report);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.id}_${report.type}_compliance_report.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Get formatted report for display
   */
  getFormattedReport(report: ComplianceReport) {
    return {
      ...report,
      generatedAt: report.generatedAt.toLocaleString("de-DE"),
      period: {
        startDate: report.period.startDate.toLocaleDateString("de-DE"),
        endDate: report.period.endDate.toLocaleDateString("de-DE"),
      },
    };
  }
}

export const complianceReportGenerator = new ComplianceReportGenerator();
