import { useState } from "react";
import { Search, MapPin, Filter, Zap, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChargerCard, { ChargerData } from "./ChargerCard";
import BookingModal from "./BookingModal";

const mockChargers: ChargerData[] = [
  {
    id: "1",
    name: "Tesla Supercharger - Downtown",
    address: "123 Main Street, Downtown",
    distance: "0.5 mi",
    available: 4,
    total: 8,
    speed: "250 kW",
    type: "Tesla",
    pricePerKwh: 0.35,
    rating: 4.8,
  },
  {
    id: "2",
    name: "ChargePoint Station",
    address: "456 Oak Avenue",
    distance: "1.2 mi",
    available: 2,
    total: 4,
    speed: "150 kW",
    type: "CCS",
    pricePerKwh: 0.32,
    rating: 4.5,
  },
  {
    id: "3",
    name: "Electrify America Hub",
    address: "789 Electric Blvd",
    distance: "2.1 mi",
    available: 6,
    total: 12,
    speed: "350 kW",
    type: "CCS / CHAdeMO",
    pricePerKwh: 0.43,
    rating: 4.7,
  },
  {
    id: "4",
    name: "EVgo Fast Charger",
    address: "321 Green Lane",
    distance: "2.8 mi",
    available: 1,
    total: 3,
    speed: "100 kW",
    type: "CCS",
    pricePerKwh: 0.28,
    rating: 4.2,
  },
];

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Fast (150kW+)", value: "fast" },
  { label: "Ultra Fast (250kW+)", value: "ultra" },
  { label: "Available Now", value: "available" },
];

const connectorTypes = [
  { label: "CCS", value: "ccs" },
  { label: "Tesla", value: "tesla" },
  { label: "CHAdeMO", value: "chademo" },
  { label: "J1772", value: "j1772" },
];

const MapSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCharger, setSelectedCharger] = useState<ChargerData | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const toggleConnector = (value: string) => {
    setSelectedConnectors((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleBookCharger = (charger: ChargerData) => {
    setSelectedCharger(charger);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedCharger(null);
  };

  return (
    <section id="map" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Discover <span className="text-gradient">Nearby Chargers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time availability at thousands of charging stations near you
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by location, address, or charger name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-24 h-14 bg-muted/50 border-border/50 rounded-xl text-base"
            />
            <Button
              variant="glow"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Navigation className="w-4 h-4" />
              Near Me
            </Button>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={showFilters ? "glow-outline" : "glass"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            {filterOptions.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "glow" : "glass"}
                size="sm"
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Connector Types Filter */}
          {showFilters && (
            <div className="p-4 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-3">Connector Types</p>
              <div className="flex flex-wrap gap-2">
                {connectorTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedConnectors.includes(type.value) ? "glow" : "outline"}
                    size="sm"
                    onClick={() => toggleConnector(type.value)}
                  >
                    <Zap className="w-3 h-3" />
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map Placeholder & Results */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="relative h-[400px] lg:h-[600px] bg-muted/30 rounded-2xl border border-border/50 overflow-hidden order-2 lg:order-1">
            {/* Map Background */}
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
            
            {/* Fake map markers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* User Location */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="pulse-ring w-16 h-16" />
                    <div className="pulse-ring w-16 h-16" style={{ animationDelay: "1s" }} />
                    <div className="w-4 h-4 bg-secondary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_hsl(197_100%_50%)]" />
                  </div>
                </div>

                {/* Charger Markers */}
                {[
                  { top: "30%", left: "40%" },
                  { top: "45%", left: "60%" },
                  { top: "60%", left: "35%" },
                  { top: "35%", left: "70%" },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute cursor-pointer group"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-[0_0_15px_hsl(155_100%_50%/0.5)] group-hover:scale-125 transition-transform">
                        <Zap className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button variant="glass" size="icon" className="rounded-lg">
                <span className="text-lg">+</span>
              </Button>
              <Button variant="glass" size="icon" className="rounded-lg">
                <span className="text-lg">−</span>
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute top-4 left-4 bg-muted/80 backdrop-blur-sm rounded-lg p-3 border border-border/50">
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="text-muted-foreground">Charger</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-secondary rounded-full" />
                  <span className="text-muted-foreground">You</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charger List */}
          <div className="space-y-4 order-1 lg:order-2">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                <span className="text-foreground font-semibold">{mockChargers.length}</span> chargers found nearby
              </p>
              <Button variant="ghost" size="sm">
                <Clock className="w-4 h-4" />
                Sort by Distance
              </Button>
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-hide pr-2">
              {mockChargers.map((charger, index) => (
                <div
                  key={charger.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ChargerCard charger={charger} onBook={handleBookCharger} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedCharger && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          charger={selectedCharger}
        />
      )}
    </section>
  );
};

export default MapSection;
