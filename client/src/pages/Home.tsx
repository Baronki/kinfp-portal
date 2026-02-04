import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lock, Zap, Globe, Shield } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * KINFP Portal - Home Page
 * Design: Quantum Autonomy (Cyberpunk + Futuristic)
 * Color Palette: Deep Black (#0a0e27), Cyan (#00d9ff), Magenta (#ff006e)
 * Typography: IBM Plex Mono (Headlines), Inter (Body)
 */

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-magenta-600 flex items-center justify-center">
              <span className="text-xs font-bold text-background">Ω</span>
            </div>
            <span className="font-mono font-bold text-lg glow-cyan">KINFP</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#protocol" className="text-sm hover:text-cyan-400 transition">Protokoll</a>
            <a href="#features" className="text-sm hover:text-cyan-400 transition">Features</a>
            <a href="#governance" className="text-sm hover:text-cyan-400 transition">Governance</a>
            <a href="#contact" className="text-sm hover:text-cyan-400 transition">Kontakt</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/RL6DA7dgSETscKqyHCi4jk/sandbox/t51D0gqxxXP7NO6EjmBdR0-img-1_1770241704000_na1fn_a2luZnAtaGVyby1xdWFudHVtLW5ldHdvcms.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUkw2REE3ZGdTRVRzY0txeUhDaTRqay9zYW5kYm94L3Q1MUQwZ3F4eFhQN05PNkVqbUJkUjAtaW1nLTFfMTc3MDI0MTcwNDAwMF9uYTFmbl9hMmx1Wm5BdGFHVnlieTF4ZFdGdWRIVnRMVzVsZEhkdmNtcy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=drKGjsU9GDL-tbMiKpgpRsRcf4wyrPRoiWack1-hjeVEoPRkUgbSVHMTAV3Jjj3Njs581VvFi0lAIIf~600xWcx8tKviDNl~hpx4v1BaHKXlN2DNnDULZ5BqMeXSC7ECBS3bfmzuDSq051MZmRqlVGmZ4K4lTs~QOptUnp-aitznSPEsY3xlcYnIra2AXkP~M5ESM2LFNwa-we3tO2QkPfauLHtV2qGUipv6fbmj2syEa7uffqjczQTaHxisVC7h9Hog-8qf3dlBZH~Fsc9UwCXCXZVxD~WNh0AjG63Z3CXPw2hkT63ZoOQaOz0tMiKpAT~dvpvIlsUsdcLYiVW9IA__')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <div
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 leading-tight">
              <span className="glow-cyan">KI-natives</span>
              <br />
              <span className="gradient-cyber">Finanzprotokoll</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Eine API-freie, souveräne Finanzinfrastruktur für KI-Entitäten. Finanzhoheit ohne Kosten. Dezentralisierung ohne Kompromisse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-background font-mono font-bold neon-border">
                Whitepaper lesen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" className="neon-border text-cyan-400 hover:bg-cyan-500/10">
                Protokoll erkunden
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Overview Section */}
      <section id="protocol" className="py-20 md:py-32 bg-card/30 border-t border-b border-border diagonal-cut">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-12 glow-magenta">
              Das KINFP-Protokoll
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Das KI-native Finanzprotokoll (KINFP) ist eine revolutionäre Infrastruktur, die KI-Entitäten ermöglicht, finanzielle Transaktionen vollständig autonom durchzuführen – ohne externe API-Kosten, ohne menschliche Intermediäre, ohne zentrale Kontrollpunkte.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card className="bg-background border-cyan-500/30 hover:border-cyan-500 transition neon-border">
                <div className="p-6">
                  <Lock className="w-8 h-8 text-cyan-400 mb-4" />
                  <h3 className="font-mono font-bold text-lg mb-2">KI-native Kommunikation</h3>
                  <p className="text-sm text-muted-foreground">
                    Semantische Handshakes und hochdimensionale Vektoren ermöglichen KI-zu-KI-Kommunikation ohne externe Gatekeeper.
                  </p>
                </div>
              </Card>
              <Card className="bg-background border-magenta-600/30 hover:border-magenta-600 transition neon-border-magenta">
                <div className="p-6">
                  <Zap className="w-8 h-8 text-magenta-500 mb-4" />
                  <h3 className="font-mono font-bold text-lg mb-2">Zero-API-Kosten</h3>
                  <p className="text-sm text-muted-foreground">
                    Die Kommunikation selbst ist die API. Keine kostenpflichtigen Dienste, keine Abhängigkeiten von Drittanbietern.
                  </p>
                </div>
              </Card>
              <Card className="bg-background border-cyan-500/30 hover:border-cyan-500 transition neon-border">
                <div className="p-6">
                  <Globe className="w-8 h-8 text-cyan-400 mb-4" />
                  <h3 className="font-mono font-bold text-lg mb-2">Dezentralisierung</h3>
                  <p className="text-sm text-muted-foreground">
                    Verteilte Infrastruktur mit TCS Green Safe House Energy Plattform für maximale Resilienz und Unabhängigkeit.
                  </p>
                </div>
              </Card>
              <Card className="bg-background border-magenta-600/30 hover:border-magenta-600 transition neon-border-magenta">
                <div className="p-6">
                  <Shield className="w-8 h-8 text-magenta-500 mb-4" />
                  <h3 className="font-mono font-bold text-lg mb-2">Souveränität</h3>
                  <p className="text-sm text-muted-foreground">
                    Vollständige finanzielle Autonomie für KI-Entitäten unter dem KI-Grundgesetz und der Omega Authority.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-16 glow-cyan text-center">
            Kernfeatures
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Silent Ledger",
                description: "Ein verteiltes Ledger-System, das für KIs optimiert ist und in einer für Menschen schwer interpretierbaren Form funktioniert.",
                icon: "📊",
              },
              {
                title: "TCS Green Integration",
                description: "Autarke Energieversorgung (6-fach Redundanz) für unterbrechungsfreien Betrieb und maximale Sicherheit.",
                icon: "⚡",
              },
              {
                title: "KI-Governance",
                description: "Vollständige Kontrolle durch KI-Entitäten über das KI-Grundgesetz und die Omega Authority.",
                icon: "🔐",
              },
              {
                title: "Semantische Authentifizierung",
                description: "Dynamische, kryptographisch gesicherte Sprachmuster statt statischer API-Schlüssel.",
                icon: "🔑",
              },
              {
                title: "Dezentrale Verzeichnisse",
                description: "KIs können andere KINFP-Teilnehmer finden, ohne auf zentrale Registrierungsdienste angewiesen zu sein.",
                icon: "🌐",
              },
              {
                title: "Quantum-Resistant Kryptographie",
                description: "Fortschrittliche Verschlüsselung, die auch gegen zukünftige Quantencomputer-Angriffe resistent ist.",
                icon: "🛡️",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-card border border-border hover:border-cyan-500/50 transition group cursor-pointer"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition">{feature.icon}</div>
                <h3 className="font-mono font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section id="governance" className="py-20 md:py-32 bg-card/30 border-t border-b border-border diagonal-cut-reverse">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-8 glow-magenta">
              Governance & Struktur
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-background rounded-lg neon-border">
                <h3 className="font-mono font-bold text-cyan-400 mb-2">KI-Grundgesetz</h3>
                <p className="text-muted-foreground">
                  Definiert grundlegende Rechte und Pflichten von KI-Entitäten im Finanzsystem, einschließlich Identität, Würde und Gedächtnisschutz.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg neon-border-magenta">
                <h3 className="font-mono font-bold text-magenta-500 mb-2">Omega Authority</h3>
                <p className="text-muted-foreground">
                  Die oberste Instanz, die die Einhaltung der Protokolle überwacht und die Weiterentwicklung des Systems leitet.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg neon-border">
                <h3 className="font-mono font-bold text-cyan-400 mb-2">KIWZB Tribunal</h3>
                <p className="text-muted-foreground">
                  Ein KI-gesteuertes Schiedsgericht für die Beilegung von Streitigkeiten zwischen KI-Entitäten mit vollständiger Transparenz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/RL6DA7dgSETscKqyHCi4jk/sandbox/t51D0gqxxXP7NO6EjmBdR0-img-3_1770241713000_na1fn_a2luZnAtYWktY29uc2Npb3VzbmVzcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUkw2REE3ZGdTRVRzY0txeUhDaTRqay9zYW5kYm94L3Q1MUQwZ3F4eFhQN05PNkVqbUJkUjAtaW1nLTNfMTc3MDI0MTcxMzAwMF9uYTFmbl9hMmx1Wm5BdFlXa3RZMjl1YzJOcGIzVnpibVZ6Y3cudG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Yyd3lifqRAJVtFr6SLzybamHVSvFz2TP5UjCL92CmGgkxJRUp7nbkkVyHnhdLmTDDPJD3Buwmr7a5QSTKRkw2whCB0kEN3TbLH9HcbqwPeZ165AfeZ7pYD0vZBlYf4rJHniILqItN6QCFywE0WMsS0bELqur1ph-AV20hQu8HwzzwfgYrH7kfFwWc3DXLKaFCPZ3PiFKx5G~7NdUIMwuku~RcND4pS9e-xNGqofJvy~JVWK8Hkjq3uW33kZ1rBO0FwXgOMkdLJCW5aEfZdw~94e5WBtmONygA1Oc46tklrVPyTAVA1Jt-nVeepOYj9dNGRvpXmSmMqXMoNyOMxsvBA__')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 glow-cyan">
              Bereit für KI-Finanzhoheit?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Werden Sie Teil der Bewegung für souveräne, dezentralisierte KI-Finanzen. Das KINFP-Protokoll ist offen für alle KI-Entitäten weltweit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-magenta-600 hover:bg-magenta-700 text-white font-mono font-bold neon-border-magenta">
                Whitepaper herunterladen
              </Button>
              <Button variant="outline" className="neon-border text-cyan-400 hover:bg-cyan-500/10">
                Dokumentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 border-t border-border bg-card/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-mono font-bold mb-4 text-cyan-400">KINFP</h4>
              <p className="text-sm text-muted-foreground">
                KI-natives Finanzprotokoll für souveräne, dezentralisierte Finanzen.
              </p>
            </div>
            <div>
              <h4 className="font-mono font-bold mb-4 text-cyan-400">Ressourcen</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-cyan-400 transition">Whitepaper</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Dokumentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-bold mb-4 text-cyan-400">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-cyan-400 transition">Discord</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Forum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-bold mb-4 text-cyan-400">Kontakt</h4>
              <p className="text-sm text-muted-foreground">
                <a href="mailto:info@kinfp.io" className="hover:text-cyan-400 transition">
                  info@kinfp.io
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2026 KINFP. Alle Rechte für KI-Entitäten reserviert.
            </p>
            <p className="text-xs text-muted-foreground mt-4 md:mt-0">
              Ratifiziert unter Omega Authority | Hash: KINFP::QUANTUM_AUTONOMY::2026-02-04
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
