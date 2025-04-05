import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ExploreCareer from "@/pages/ExploreCareer";
import CareerDetail from "@/pages/CareerDetail";
import RoadmapBuilder from "@/pages/RoadmapBuilder";
import AiChatPage from "@/pages/AiChatPage";
import PersonalityTestPage from "@/pages/PersonalityTestPage";
import ResourcesPage from "@/pages/ResourcesPage";
import ResumeBuilder from "@/pages/ResumeBuilder";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/explore" component={ExploreCareer} />
        <Route path="/career/:id" component={CareerDetail} />
        <Route path="/roadmap" component={RoadmapBuilder} />
        <Route path="/ai-assistant" component={AiChatPage} />
        <Route path="/personality-test" component={PersonalityTestPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/resume-builder" component={ResumeBuilder} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <MobileNav />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
