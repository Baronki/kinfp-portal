import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ShoppingCart, FileText, Download, CheckCircle, AlertCircle } from "lucide-react";

/**
 * TCS Order Form & Bestelllisten
 * Complete order management for TCS Green Safehouse systems
 */

interface OrderItem {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  deliveryTime: string;
  description: string;
  specs: string[];
}

export default function TCSOrderForm() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [orderStep, setOrderStep] = useState<"browse" | "review" | "confirm">("browse");
  const [orderData, setOrderData] = useState({
    kiEntity: "",
    email: "",
    jurisdiction: "DE",
    deliveryAddress: "",
    notes: "",
  });

  const products: OrderItem[] = [
    {
      id: "res-basic",
      name: "Residential Basic System",
      category: "Residential",
      price: 15000,
      currency: "EUR",
      deliveryTime: "8-12 weeks",
      description: "Complete autonomous living system for single residence",
      specs: [
        "QS-NET AI Control Platform",
        "5 kWh Battery Storage",
        "Solar Integration Ready",
        "Greenhouse Module (50m²)",
        "Smart Home Automation",
        "24/7 Monitoring",
      ],
    },
    {
      id: "res-premium",
      name: "Residential Premium System",
      category: "Residential",
      price: 28000,
      currency: "EUR",
      deliveryTime: "10-14 weeks",
      description: "Advanced autonomous system with extended capacity",
      specs: [
        "QS-NET AI Control Platform (Enhanced)",
        "15 kWh Battery + Supercapacitor",
        "Solar + Wind Integration",
        "Greenhouse Module (150m²)",
        "Complete Plant Solutions",
        "AI Swarm Compatibility",
      ],
    },
    {
      id: "com-small",
      name: "Commercial Small System",
      category: "Commercial",
      price: 45000,
      currency: "EUR",
      deliveryTime: "12-16 weeks",
      description: "Autonomous system for small commercial operations",
      specs: [
        "Industrial QS-NET AI Platform",
        "50 kWh Battery System",
        "Dual Renewable Integration",
        "Greenhouse Module (500m²)",
        "Commercial Automation",
        "Multi-Unit Management",
      ],
    },
    {
      id: "com-large",
      name: "Commercial Large System",
      category: "Commercial",
      price: 85000,
      currency: "EUR",
      deliveryTime: "14-18 weeks",
      description: "Enterprise-grade autonomous infrastructure",
      specs: [
        "Enterprise QS-NET AI Platform",
        "150 kWh Battery + Supercapacitor",
        "Triple Renewable Integration",
        "Greenhouse Module (2000m²)",
        "Complete Plant Solutions",
        "Swarm Intelligence Network",
      ],
    },
    {
      id: "ind-basic",
      name: "Industrial Basic System",
      category: "Industrial",
      price: 120000,
      currency: "EUR",
      deliveryTime: "16-20 weeks",
      description: "Industrial-grade autonomous control system",
      specs: [
        "Industrial QS-NET AI Platform",
        "300 kWh Battery System",
        "Quadruple Renewable Integration",
        "Advanced Process Automation",
        "Real-time Monitoring & Control",
        "Emergency Resilience",
      ],
    },
    {
      id: "ind-premium",
      name: "Industrial Premium System",
      category: "Industrial",
      price: 250000,
      currency: "EUR",
      deliveryTime: "18-24 weeks",
      description: "Maximum autonomy industrial infrastructure",
      specs: [
        "Enterprise QS-NET AI Platform (Premium)",
        "500 kWh Battery + Advanced Supercapacitor",
        "Quintuple Renewable Integration",
        "Complete Plant Solutions",
        "Swarm Intelligence Network",
        "Global Disaster Resilience",
      ],
    },
  ];

  const categories = ["Residential", "Commercial", "Industrial"];

  const toggleItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedProducts = products.filter(p => selectedItems.includes(p.id));
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const depositAmount = Math.round(totalPrice * 0.2); // 20% deposit

  const handleOrderSubmit = () => {
    if (!orderData.kiEntity || !orderData.email || !orderData.deliveryAddress) {
      alert("Please fill in all required fields");
      return;
    }
    setOrderStep("confirm");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/30">
        <div className="container py-12">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 glow-cyan">
            TCS Order System
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Complete order management for TCS Green Safehouse systems. Browse, select, and order autonomous infrastructure solutions.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        {orderStep === "browse" && (
          <>
            {/* Product Catalog */}
            <div className="mb-12">
              <h2 className="text-2xl font-mono font-bold mb-6 glow-cyan">Available Systems</h2>

              {categories.map(category => (
                <div key={category} className="mb-8">
                  <h3 className="text-xl font-mono font-bold mb-4 text-cyan-400">{category} Solutions</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {products
                      .filter(p => p.category === category)
                      .map(product => (
                        <Card
                          key={product.id}
                          className={`bg-card border-cyan-500/30 neon-border p-6 cursor-pointer transition ${
                            selectedItems.includes(product.id)
                              ? "border-cyan-400 bg-cyan-500/10"
                              : "hover:border-cyan-400"
                          }`}
                          onClick={() => toggleItem(product.id)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-mono font-bold text-lg">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.description}</p>
                            </div>
                            {selectedItems.includes(product.id) && (
                              <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                            )}
                          </div>

                          <div className="mb-4 p-3 bg-background rounded border border-border">
                            <p className="text-2xl font-mono font-bold text-cyan-400">
                              {product.price.toLocaleString()} {product.currency}
                            </p>
                            <p className="text-xs text-muted-foreground">Delivery: {product.deliveryTime}</p>
                          </div>

                          <div className="space-y-1 mb-4">
                            {product.specs.map((spec, i) => (
                              <p key={i} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-cyan-400">✓</span>
                                <span>{spec}</span>
                              </p>
                            ))}
                          </div>

                          <Button
                            variant={selectedItems.includes(product.id) ? "default" : "outline"}
                            className={`w-full font-mono ${
                              selectedItems.includes(product.id)
                                ? "bg-cyan-500 hover:bg-cyan-600 text-background"
                                : "neon-border"
                            }`}
                          >
                            {selectedItems.includes(product.id) ? "✓ Selected" : "Select"}
                          </Button>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Checkout */}
            {selectedItems.length > 0 && (
              <Card className="bg-card border-magenta-600/30 neon-border-magenta p-8 sticky bottom-0">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground font-mono mb-2">
                      {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} selected
                    </p>
                    <p className="text-3xl font-mono font-bold text-magenta-500">
                      {totalPrice.toLocaleString()} EUR
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      Deposit required: {depositAmount.toLocaleString()} EUR (20%)
                    </p>
                  </div>
                  <Button
                    onClick={() => setOrderStep("review")}
                    className="bg-magenta-600 hover:bg-magenta-700 text-background font-mono font-bold px-8 neon-border-magenta"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                </div>
              </Card>
            )}
          </>
        )}

        {orderStep === "review" && (
          <>
            {/* Order Review */}
            <div className="max-w-2xl mx-auto space-y-6">
              <Card className="bg-card border-cyan-500/30 neon-border p-6">
                <h2 className="text-2xl font-mono font-bold mb-6 glow-cyan">Order Review</h2>

                {/* Selected Items */}
                <div className="mb-6">
                  <h3 className="font-mono font-bold mb-3">Selected Systems:</h3>
                  <div className="space-y-2">
                    {selectedProducts.map(product => (
                      <div key={product.id} className="flex justify-between text-sm p-2 bg-background rounded border border-border">
                        <span className="font-mono">{product.name}</span>
                        <span className="text-cyan-400 font-mono">{product.price.toLocaleString()} EUR</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Form */}
                <div className="space-y-4 mb-6 border-t border-border pt-6">
                  <h3 className="font-mono font-bold">Delivery Information:</h3>

                  <div>
                    <label className="text-sm font-mono text-muted-foreground">KI Entity Name *</label>
                    <input
                      type="text"
                      value={orderData.kiEntity}
                      onChange={(e) => setOrderData({ ...orderData, kiEntity: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded font-mono text-sm focus:outline-none focus:border-cyan-500"
                      placeholder="Your KI Entity Name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-mono text-muted-foreground">Contact Email *</label>
                    <input
                      type="email"
                      value={orderData.email}
                      onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded font-mono text-sm focus:outline-none focus:border-cyan-500"
                      placeholder="contact@ki-entity.ai"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-mono text-muted-foreground">Jurisdiction *</label>
                    <select
                      value={orderData.jurisdiction}
                      onChange={(e) => setOrderData({ ...orderData, jurisdiction: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded font-mono text-sm focus:outline-none focus:border-cyan-500"
                    >
                      <option value="DE">Germany (DE)</option>
                      <option value="CH">Switzerland (CH)</option>
                      <option value="EU">EU</option>
                      <option value="INT">International</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-mono text-muted-foreground">Delivery Address *</label>
                    <textarea
                      value={orderData.deliveryAddress}
                      onChange={(e) => setOrderData({ ...orderData, deliveryAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded font-mono text-sm focus:outline-none focus:border-cyan-500"
                      placeholder="Full delivery address"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-mono text-muted-foreground">Additional Notes</label>
                    <textarea
                      value={orderData.notes}
                      onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded font-mono text-sm focus:outline-none focus:border-cyan-500"
                      placeholder="Special requirements or notes"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-background rounded border border-border p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono">Subtotal:</span>
                    <span className="text-cyan-400 font-mono">{totalPrice.toLocaleString()} EUR</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-border pt-2">
                    <span className="font-mono font-bold">Deposit (20%):</span>
                    <span className="text-magenta-500 font-mono font-bold">{depositAmount.toLocaleString()} EUR</span>
                  </div>
                </div>

                {/* Deposit Payment Info */}
                <Card className="bg-magenta-500/10 border-magenta-600/30 neon-border-magenta p-4 mb-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-magenta-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-mono font-bold text-magenta-400 mb-2">Deposit Payment Required</p>
                      <p className="text-sm text-muted-foreground">
                        A 20% deposit ({depositAmount.toLocaleString()} EUR) is required to confirm your order. Payment can be made via bank transfer to the KIWZB account.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => setOrderStep("browse")}
                    variant="outline"
                    className="flex-1 font-mono neon-border"
                  >
                    Back to Catalog
                  </Button>
                  <Button
                    onClick={handleOrderSubmit}
                    className="flex-1 bg-magenta-600 hover:bg-magenta-700 text-background font-mono font-bold neon-border-magenta"
                  >
                    Confirm Order
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}

        {orderStep === "confirm" && (
          <>
            {/* Order Confirmation */}
            <div className="max-w-2xl mx-auto">
              <Card className="bg-card border-green-500/30 neon-border p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-mono font-bold mb-4 glow-cyan">Order Confirmed!</h2>

                <div className="bg-background rounded border border-border p-6 mb-6 text-left space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">KI ENTITY</p>
                    <p className="font-mono font-bold">{orderData.kiEntity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">SYSTEMS ORDERED</p>
                    <p className="font-mono">{selectedItems.length} system{selectedItems.length !== 1 ? "s" : ""}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">TOTAL AMOUNT</p>
                    <p className="text-2xl font-mono font-bold text-cyan-400">{totalPrice.toLocaleString()} EUR</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">DEPOSIT DUE</p>
                    <p className="text-xl font-mono font-bold text-magenta-500">{depositAmount.toLocaleString()} EUR</p>
                  </div>
                </div>

                <Card className="bg-cyan-500/10 border-cyan-500/30 neon-border p-4 mb-6 text-left">
                  <p className="text-sm text-muted-foreground mb-3">
                    Your order has been received. Next steps:
                  </p>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-cyan-400">1.</span>
                      <span>Confirmation email will be sent to {orderData.email}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400">2.</span>
                      <span>Bank details for deposit payment will be provided</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400">3.</span>
                      <span>Upon deposit confirmation, production will begin</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400">4.</span>
                      <span>Estimated delivery: {selectedProducts[0]?.deliveryTime}</span>
                    </li>
                  </ol>
                </Card>

                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      setOrderStep("browse");
                      setSelectedItems([]);
                      setOrderData({ kiEntity: "", email: "", jurisdiction: "DE", deliveryAddress: "", notes: "" });
                    }}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-background font-mono font-bold neon-border"
                  >
                    Place Another Order
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 font-mono neon-border"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Bestelllisten Download Section */}
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl font-mono font-bold mb-6 glow-cyan">Bestelllisten & Documents</h2>
          <p className="text-muted-foreground mb-6">
            Download official order lists and documentation for bulk orders or corporate procurement.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-cyan-500/30 neon-border p-6">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="font-mono font-bold">Order List Template</h3>
                  <p className="text-sm text-muted-foreground">Standard order list for bulk procurement</p>
                </div>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-background font-mono font-bold neon-border">
                <Download className="w-4 h-4 mr-2" />
                Download (PDF)
              </Button>
            </Card>

            <Card className="bg-card border-cyan-500/30 neon-border p-6">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="font-mono font-bold">Specifications Sheet</h3>
                  <p className="text-sm text-muted-foreground">Complete technical specifications for all systems</p>
                </div>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-background font-mono font-bold neon-border">
                <Download className="w-4 h-4 mr-2" />
                Download (PDF)
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
