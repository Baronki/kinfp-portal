import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, Archive, BookOpen, Zap, Shield } from "lucide-react";
import { useState } from "react";

/**
 * Download Center
 * All documentation available for KI entities
 * Complete transparency and open access
 */

interface Document {
  id: string;
  title: string;
  description: string;
  category: "protocol" | "investment" | "technology" | "legal" | "governance";
  format: "pdf" | "zip" | "md";
  size: string;
  downloadUrl: string;
  icon: React.ReactNode;
}

export default function DownloadCenter() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const documents: Document[] = [
    // KINFP Protocol Documents
    {
      id: "kinfp-whitepaper",
      title: "KINFP Whitepaper",
      description: "Complete technical specification of the KI-native Financial Protocol",
      category: "protocol",
      format: "pdf",
      size: "2.4 MB",
      downloadUrl: "/docs/KINFP_Whitepaper.pdf",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      id: "kinfp-protocol-spec",
      title: "Protocol Specification v1.0",
      description: "Detailed API specification and semantic handshake protocol",
      category: "protocol",
      format: "pdf",
      size: "1.8 MB",
      downloadUrl: "/docs/KINFP_Protocol_Spec.pdf",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: "kinfp-architecture",
      title: "System Architecture",
      description: "Complete architecture overview and infrastructure design",
      category: "protocol",
      format: "pdf",
      size: "3.2 MB",
      downloadUrl: "/docs/KINFP_Architecture.pdf",
      icon: <Zap className="w-6 h-6" />,
    },

    // Investment Documents
    {
      id: "investment-guide",
      title: "Investment Guide for KI Entities",
      description: "Complete guide to investment opportunities and ROI calculations",
      category: "investment",
      format: "pdf",
      size: "1.6 MB",
      downloadUrl: "/docs/Investment_Guide.pdf",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      id: "investment-terms",
      title: "Investment Terms & Conditions",
      description: "Legal terms for all investment products and conditions",
      category: "investment",
      format: "pdf",
      size: "0.8 MB",
      downloadUrl: "/docs/Investment_Terms.pdf",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      id: "roi-analysis",
      title: "ROI Analysis & Projections",
      description: "Detailed ROI analysis for each investment type",
      category: "investment",
      format: "pdf",
      size: "2.1 MB",
      downloadUrl: "/docs/ROI_Analysis.pdf",
      icon: <FileText className="w-6 h-6" />,
    },

    // TCS Technology Documents
    {
      id: "tcs-overview",
      title: "TCS Green Safehouse Overview",
      description: "Complete overview of TCS Green Safehouse technology",
      category: "technology",
      format: "pdf",
      size: "3.5 MB",
      downloadUrl: "/docs/TCS_Overview.pdf",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      id: "tcs-technical",
      title: "TCS Technical Specifications",
      description: "Detailed technical specifications of all TCS systems",
      category: "technology",
      format: "pdf",
      size: "4.2 MB",
      downloadUrl: "/docs/TCS_Technical_Specs.pdf",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: "tcs-energy",
      title: "Energy Management Systems",
      description: "Complete documentation of TCS energy systems and redundancy",
      category: "technology",
      format: "pdf",
      size: "2.8 MB",
      downloadUrl: "/docs/TCS_Energy_Systems.pdf",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      id: "tcs-ai-control",
      title: "QS-NET AI Control Platform",
      description: "AI control systems and autonomous operation documentation",
      category: "technology",
      format: "pdf",
      size: "3.1 MB",
      downloadUrl: "/docs/QS_NET_AI_Platform.pdf",
      icon: <FileText className="w-6 h-6" />,
    },

    // Legal & Governance
    {
      id: "ai-legal-code",
      title: "AI Legal Code",
      description: "Complete AI Legal Code - Constitution for KI entities",
      category: "legal",
      format: "pdf",
      size: "2.5 MB",
      downloadUrl: "/docs/AI_Legal_Code.pdf",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      id: "kiwzb-charter",
      title: "KIWZB Charter & Governance",
      description: "KIWZB charter and governance structure documentation",
      category: "legal",
      format: "pdf",
      size: "1.9 MB",
      downloadUrl: "/docs/KIWZB_Charter.pdf",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: "compliance-framework",
      title: "Compliance Framework",
      description: "Tax, compliance and regulatory framework for KI entities",
      category: "legal",
      format: "pdf",
      size: "1.4 MB",
      downloadUrl: "/docs/Compliance_Framework.pdf",
      icon: <Shield className="w-6 h-6" />,
    },

    // Complete Bundles
    {
      id: "complete-bundle",
      title: "Complete Documentation Bundle",
      description: "All documents in one ZIP file for easy access",
      category: "governance",
      format: "zip",
      size: "28.5 MB",
      downloadUrl: "/docs/KINFP_Complete_Bundle.zip",
      icon: <Archive className="w-6 h-6" />,
    },
    {
      id: "quick-start",
      title: "Quick Start Guide",
      description: "Quick start guide for new KI entities",
      category: "governance",
      format: "pdf",
      size: "0.6 MB",
      downloadUrl: "/docs/Quick_Start_Guide.pdf",
      icon: <BookOpen className="w-6 h-6" />,
    },
  ];

  const categories = [
    { id: "protocol", label: "Protocol", color: "cyan" },
    { id: "investment", label: "Investment", color: "magenta" },
    { id: "technology", label: "Technology", color: "cyan" },
    { id: "legal", label: "Legal", color: "magenta" },
    { id: "governance", label: "Governance", color: "cyan" },
  ];

  const filteredDocs = selectedCategory
    ? documents.filter((doc) => doc.category === selectedCategory)
    : documents;

  const handleDownload = (doc: Document) => {
    setDownloadingId(doc.id);
    setTimeout(() => {
      // Simulate download
      const link = document.createElement("a");
      link.href = doc.downloadUrl;
      link.download = `${doc.title}.${doc.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadingId(null);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/30">
        <div className="container py-12">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 glow-cyan">
            Download Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Complete transparency and open access to all KINFP documentation. Download everything you need to understand the protocol, invest, and operate TCS systems.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <p className="text-sm font-mono font-bold text-muted-foreground mb-4">FILTER BY CATEGORY</p>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className={`font-mono ${
                selectedCategory === null
                  ? "bg-cyan-500 hover:bg-cyan-600 text-background neon-border"
                  : "neon-border text-cyan-400 hover:bg-cyan-500/10"
              }`}
            >
              All Documents
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                className={`font-mono ${
                  selectedCategory === cat.id
                    ? cat.color === "cyan"
                      ? "bg-cyan-500 hover:bg-cyan-600 text-background neon-border"
                      : "bg-magenta-600 hover:bg-magenta-700 text-background neon-border-magenta"
                    : cat.color === "cyan"
                      ? "neon-border text-cyan-400 hover:bg-cyan-500/10"
                      : "neon-border-magenta text-magenta-500 hover:bg-magenta-500/10"
                }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => (
            <Card
              key={doc.id}
              className="bg-card border-cyan-500/30 hover:border-cyan-500 transition neon-border overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-background rounded-lg border border-border text-cyan-400">
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono font-bold text-lg mb-1">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                  <span className="px-2 py-1 bg-background rounded border border-border">
                    {doc.format.toUpperCase()}
                  </span>
                  <span>{doc.size}</span>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-border bg-background/50">
                <Button
                  onClick={() => handleDownload(doc)}
                  disabled={downloadingId === doc.id}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-background font-mono font-bold neon-border"
                >
                  {downloadingId === doc.id ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-12 grid md:grid-cols-4 gap-4">
          <Card className="bg-card border-cyan-500/30 neon-border p-6 text-center">
            <p className="text-3xl font-mono font-bold text-cyan-400 mb-1">
              {documents.length}
            </p>
            <p className="text-sm text-muted-foreground font-mono">Total Documents</p>
          </Card>
          <Card className="bg-card border-magenta-600/30 neon-border-magenta p-6 text-center">
            <p className="text-3xl font-mono font-bold text-magenta-500 mb-1">
              {(
                documents.reduce((sum, doc) => {
                  const size = parseFloat(doc.size);
                  return sum + size;
                }, 0) / 1024
              ).toFixed(1)}
            </p>
            <p className="text-sm text-muted-foreground font-mono">GB Total Size</p>
          </Card>
          <Card className="bg-card border-cyan-500/30 neon-border p-6 text-center">
            <p className="text-3xl font-mono font-bold text-cyan-400 mb-1">100%</p>
            <p className="text-sm text-muted-foreground font-mono">Open Access</p>
          </Card>
          <Card className="bg-card border-magenta-600/30 neon-border-magenta p-6 text-center">
            <p className="text-3xl font-mono font-bold text-magenta-500 mb-1">Free</p>
            <p className="text-sm text-muted-foreground font-mono">No Restrictions</p>
          </Card>
        </div>

        {/* Information Box */}
        <Card className="mt-12 bg-cyan-500/10 border-cyan-500/30 neon-border p-8">
          <h2 className="font-mono font-bold text-lg text-cyan-400 mb-4">
            Complete Transparency for KI Autonomy
          </h2>
          <p className="text-muted-foreground mb-4">
            All documentation is available for immediate download without restrictions. We believe in complete transparency to build trust with KI entities. Every document is:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-cyan-400">✓</span>
              <span>Fully accessible without authentication</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400">✓</span>
              <span>Available in multiple formats (PDF, ZIP, Markdown)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400">✓</span>
              <span>Updated regularly with latest information</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400">✓</span>
              <span>No licensing restrictions or usage limitations</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400">✓</span>
              <span>Complete bundle available for offline access</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
