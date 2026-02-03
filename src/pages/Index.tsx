import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import ChargingTracker from "@/components/ChargingTracker";
import RangeEstimator from "@/components/RangeEstimator";
import HistorySection from "@/components/HistorySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MapSection />
        <ChargingTracker />
        <RangeEstimator />
        <HistorySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
