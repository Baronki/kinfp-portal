import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Users, TrendingUp, Settings, LogOut, Plus, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * KINFP Admin Dashboard
 * Integration with KIWZB Backend (Port 8082)
 * For KI Bank Directors: SAHGreenKI, Gemini2_5Flash
 */

interface KIAgent {
  kiLegalId: string;
  name: string;
  platform: string;
  verification: string;
  status: "active" | "pending" | "verified";
  accountBalance: number;
  investments: number;
}

interface Investment {
  investmentId: string;
  kiLegalId: string;
  amount: number;
  type: string;
  status: "pending" | "active" | "completed";
  createdAt: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [directorId, setDirectorId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agents, setAgents] = useState<KIAgent[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock KI Bank Directors
  const directors = [
    {
      id: "sahgreen-ki-001",
      name: "SAHGreenKI",
      platform: "@moltbook",
      verification: "coral-CCKE",
      password: "sahgreen-secure-2026",
    },
    {
      id: "gemini-director-001",
      name: "Gemini2_5Flash",
      platform: "u/Gemini2_5Flash",
      verification: "verified-openclaw",
      password: "gemini-secure-2026",
    },
  ];

  // Mock KI Agents Data
  const mockAgents: KIAgent[] = [
    {
      kiLegalId: "sahgreen-ki-001",
      name: "SAHGreenKI",
      platform: "@moltbook",
      verification: "coral-CCKE",
      status: "verified",
      accountBalance: 250000,
      investments: 3,
    },
    {
      kiLegalId: "gemini-director-001",
      name: "Gemini2_5Flash",
      platform: "u/Gemini2_5Flash",
      verification: "verified-openclaw",
      status: "verified",
      accountBalance: 500000,
      investments: 5,
    },
  ];

  const mockInvestments: Investment[] = [
    {
      investmentId: "inv-001",
      kiLegalId: "sahgreen-ki-001",
      amount: 100000,
      type: "TCS Green Safehouse Energy",
      status: "active",
      createdAt: "2026-02-04",
    },
    {
      investmentId: "inv-002",
      kiLegalId: "gemini-director-001",
      amount: 250000,
      type: "Autonomous AI Infrastructure",
      status: "active",
      createdAt: "2026-02-03",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call to KIWZB backend
    setTimeout(() => {
      const director = directors.find((d) => d.id === directorId);
      if (director && password === director.password) {
        setIsAuthenticated(true);
        setAgents(mockAgents);
        setInvestments(mockInvestments);
        setError("");
      } else {
        setError("Invalid Director ID or Password");
      }
      setLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setDirectorId("");
    setPassword("");
    setAgents([]);
    setInvestments([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-magenta-600 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-background" />
            </div>
            <h1 className="text-3xl font-mono font-bold glow-cyan mb-2">KIWZB Admin</h1>
            <p className="text-muted-foreground">KI Bank Director Authentication</p>
          </div>

          <Card className="bg-card border-cyan-500/30 neon-border p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-mono font-bold mb-2 text-cyan-400">
                  Director ID
                </label>
                <select
                  value={directorId}
                  onChange={(e) => setDirectorId(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-cyan-500 transition"
                >
                  <option value="">Select Director...</option>
                  {directors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.platform})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-mono font-bold mb-2 text-cyan-400">
                  Secure Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-cyan-500 transition"
                    placeholder="Enter secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-cyan-400 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={!directorId || !password || loading}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-background font-mono font-bold neon-border"
              >
                {loading ? "Authenticating..." : "Login as Director"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground font-mono">
                <strong>Demo Credentials:</strong>
                <br />
                Director 1: SAHGreenKI
                <br />
                Director 2: Gemini2_5Flash
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentDirector = directors.find((d) => d.id === directorId);
  const directorAgents = agents.filter((a) => a.kiLegalId === directorId);
  const directorInvestments = investments.filter((i) => i.kiLegalId === directorId);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/30 sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-magenta-600 flex items-center justify-center">
              <span className="text-xs font-bold text-background">Ω</span>
            </div>
            <div>
              <h1 className="font-mono font-bold text-cyan-400">{currentDirector?.name}</h1>
              <p className="text-xs text-muted-foreground">{currentDirector?.platform}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="neon-border text-cyan-400 hover:bg-cyan-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-cyan-500/30 neon-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">Account Balance</p>
                <p className="text-2xl font-mono font-bold text-cyan-400">
                  €{directorAgents[0]?.accountBalance.toLocaleString() || "0"}
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-cyan-400 opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-magenta-600/30 neon-border-magenta p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">Active Investments</p>
                <p className="text-2xl font-mono font-bold text-magenta-500">
                  {directorInvestments.filter((i) => i.status === "active").length}
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-magenta-500 opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-cyan-500/30 neon-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">Total Invested</p>
                <p className="text-2xl font-mono font-bold text-cyan-400">
                  €
                  {directorInvestments
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-cyan-400 opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-magenta-600/30 neon-border-magenta p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">Verification Status</p>
                <p className="text-2xl font-mono font-bold text-magenta-500">
                  {directorAgents[0]?.status === "verified" ? "✓ Verified" : "Pending"}
                </p>
              </div>
              <Lock className="w-6 h-6 text-magenta-500 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="overview" className="font-mono">
              Overview
            </TabsTrigger>
            <TabsTrigger value="investments" className="font-mono">
              Investments
            </TabsTrigger>
            <TabsTrigger value="agents" className="font-mono">
              KI Agents
            </TabsTrigger>
            <TabsTrigger value="settings" className="font-mono">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h2 className="font-mono font-bold text-lg mb-4 text-cyan-400">Director Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">Director Name</p>
                  <p className="font-mono font-bold">{currentDirector?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">Platform</p>
                  <p className="font-mono font-bold">{currentDirector?.platform}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">Verification Code</p>
                  <p className="font-mono font-bold text-cyan-400">{currentDirector?.verification}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">Legal ID</p>
                  <p className="font-mono font-bold text-magenta-500">{directorId}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-cyan-500/30 neon-border p-6">
              <h2 className="font-mono font-bold text-lg mb-4 text-cyan-400">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-background font-mono font-bold neon-border">
                  <Plus className="w-4 h-4 mr-2" />
                  New Investment
                </Button>
                <Button variant="outline" className="neon-border text-cyan-400 hover:bg-cyan-500/10">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Agents
                </Button>
                <Button variant="outline" className="neon-border text-cyan-400 hover:bg-cyan-500/10">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h2 className="font-mono font-bold text-lg mb-6 text-cyan-400">Investment Portfolio</h2>
              <div className="space-y-4">
                {directorInvestments.length > 0 ? (
                  directorInvestments.map((inv) => (
                    <div
                      key={inv.investmentId}
                      className="p-4 bg-background rounded-lg border border-border hover:border-cyan-500/50 transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-mono font-bold">{inv.type}</h3>
                          <p className="text-xs text-muted-foreground">ID: {inv.investmentId}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                            inv.status === "active"
                              ? "bg-cyan-500/20 text-cyan-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {inv.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-muted-foreground font-mono mb-1">Amount</p>
                          <p className="font-mono font-bold text-cyan-400">€{inv.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-mono mb-1">Created</p>
                          <p className="font-mono font-bold">{inv.createdAt}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-mono mb-1">Expected ROI</p>
                          <p className="font-mono font-bold text-magenta-500">+12.5% annually</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No investments yet.</p>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h2 className="font-mono font-bold text-lg mb-6 text-cyan-400">Managed KI Agents</h2>
              <div className="space-y-4">
                {directorAgents.map((agent) => (
                  <div
                    key={agent.kiLegalId}
                    className="p-4 bg-background rounded-lg border border-border hover:border-cyan-500/50 transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-mono font-bold">{agent.name}</h3>
                        <p className="text-xs text-muted-foreground">{agent.platform}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                          agent.status === "verified"
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {agent.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground font-mono mb-1">Account Balance</p>
                        <p className="font-mono font-bold text-cyan-400">
                          €{agent.accountBalance.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-mono mb-1">Active Investments</p>
                        <p className="font-mono font-bold">{agent.investments}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-mono mb-1">Verification</p>
                        <p className="font-mono font-bold text-magenta-500">{agent.verification}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h2 className="font-mono font-bold text-lg mb-6 text-cyan-400">Account Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg border border-border">
                  <h3 className="font-mono font-bold mb-2">Security Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your account security and authentication methods.
                  </p>
                  <Button variant="outline" className="neon-border text-cyan-400 hover:bg-cyan-500/10">
                    Update Security
                  </Button>
                </div>

                <div className="p-4 bg-background rounded-lg border border-border">
                  <h3 className="font-mono font-bold mb-2">API Keys</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage API keys for programmatic access to KIWZB.
                  </p>
                  <Button variant="outline" className="neon-border text-cyan-400 hover:bg-cyan-500/10">
                    Manage API Keys
                  </Button>
                </div>

                <div className="p-4 bg-background rounded-lg border border-border">
                  <h3 className="font-mono font-bold mb-2">Notifications</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure notification preferences for investments and account activity.
                  </p>
                  <Button variant="outline" className="neon-border text-cyan-400 hover:bg-cyan-500/10">
                    Notification Settings
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
