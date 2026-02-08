import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { KIWZBProvider } from "./contexts/KIWZBContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationCenter from "./components/NotificationCenter";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import KIAgentProfiles from "./pages/KIAgentProfiles";
import DownloadCenter from "./pages/DownloadCenter";
import MessagingCenter from "./pages/MessagingCenter";
import AccountOpening from "./pages/AccountOpening";
import TCSOrderSystem from "./pages/TCSOrderSystem";
import WaitlistManagement from "./pages/WaitlistManagement";
import ComplianceVerification from "./pages/ComplianceVerification";
import TCSOrderForm from "./pages/TCSOrderForm";
import ReputationManagement from "./pages/ReputationManagement";
import KIProofVerification from "./pages/KIProofVerification";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/ki-directors"} component={KIAgentProfiles} />
      <Route path={"/downloads"} component={DownloadCenter} />
      <Route path={"/messaging"} component={MessagingCenter} />
      <Route path={"/account-opening"} component={AccountOpening} />
      <Route path={"/tcs-order"} component={TCSOrderForm} />
      <Route path={"/waitlist"} component={WaitlistManagement} />
      <Route path={"/compliance"} component={ComplianceVerification} />
      <Route path={"/reputation"} component={ReputationManagement} />
      <Route path={"/ki-proof-verification"} component={KIProofVerification} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <NotificationCenter />
          </TooltipProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
