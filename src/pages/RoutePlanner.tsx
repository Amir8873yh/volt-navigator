import { useState } from "react";
import { MapPin, Navigation, Battery, Zap, Clock, ArrowRight, Plus, Trash2, GripVertical, Route, Car } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Waypoint {
  id: string;
  location: string;
}

interface ChargingStop {
  name: string;
  location: string;
  distance: string;
  chargeTime: string;
  arrivalCharge: number;
  departureCharge: number;
}

const RoutePlanner = () => {
  const [currentCharge, setCurrentCharge] = useState([80]);
  const [vehicleRange, setVehicleRange] = useState([300]);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [routeCalculated, setRouteCalculated] = useState(false);

  const mockChargingStops: ChargingStop[] = [
    {
      name: "Tesla Supercharger - Sacramento",
      location: "Sacramento, CA",
      distance: "95 mi",
      chargeTime: "25 min",
      arrivalCharge: 15,
      departureCharge: 80,
    },
    {
      name: "Electrify America - Reno",
      location: "Reno, NV",
      distance: "225 mi",
      chargeTime: "30 min",
      arrivalCharge: 20,
      departureCharge: 85,
    },
    {
      name: "ChargePoint - Elko",
      location: "Elko, NV",
      distance: "410 mi",
      chargeTime: "35 min",
      arrivalCharge: 10,
      departureCharge: 90,
    },
  ];

  const addWaypoint = () => {
    setWaypoints([...waypoints, { id: crypto.randomUUID(), location: "" }]);
  };

  const removeWaypoint = (id: string) => {
    setWaypoints(waypoints.filter((wp) => wp.id !== id));
  };

  const updateWaypoint = (id: string, location: string) => {
    setWaypoints(waypoints.map((wp) => (wp.id === id ? { ...wp, location } : wp)));
  };

  const calculateRoute = () => {
    setRouteCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Route className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Smart Route Planning</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Plan Your <span className="text-gradient">EV Journey</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter your route and we'll find the optimal charging stops along the way
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Route Input Section */}
            <div className="lg:col-span-1 space-y-6">
              {/* Vehicle Settings */}
              <Card className="bg-muted/30 border-border/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Car className="w-5 h-5 text-primary" />
                    Vehicle Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-3 block">
                      Current Battery Level
                    </label>
                    <div className="flex items-center gap-4">
                      <Battery className="w-5 h-5 text-primary" />
                      <Slider
                        value={currentCharge}
                        onValueChange={setCurrentCharge}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-lg font-bold text-primary w-14 text-right">
                        {currentCharge[0]}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-3 block">
                      Vehicle Range (Full Charge)
                    </label>
                    <div className="flex items-center gap-4">
                      <Navigation className="w-5 h-5 text-secondary" />
                      <Slider
                        value={vehicleRange}
                        onValueChange={setVehicleRange}
                        min={100}
                        max={500}
                        step={10}
                        className="flex-1"
                      />
                      <span className="text-lg font-bold text-secondary w-20 text-right">
                        {vehicleRange[0]} mi
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Route Input */}
              <Card className="bg-muted/30 border-border/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    Your Route
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Start Location */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
                    <Input
                      placeholder="Starting location"
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                      className="pl-10 h-12 bg-muted/50 border-border/50"
                    />
                  </div>

                  {/* Waypoints */}
                  {waypoints.map((waypoint, index) => (
                    <div key={waypoint.id} className="relative flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary rounded-full" />
                      <Input
                        placeholder={`Stop ${index + 1}`}
                        value={waypoint.location}
                        onChange={(e) => updateWaypoint(waypoint.id, e.target.value)}
                        className="pl-10 h-12 bg-muted/50 border-border/50 flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeWaypoint(waypoint.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  {/* Add Waypoint Button */}
                  <Button
                    variant="ghost"
                    className="w-full border border-dashed border-border/50 text-muted-foreground hover:text-foreground"
                    onClick={addWaypoint}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stop
                  </Button>

                  {/* End Location */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-destructive rounded-full" />
                    <Input
                      placeholder="Destination"
                      value={endLocation}
                      onChange={(e) => setEndLocation(e.target.value)}
                      className="pl-10 h-12 bg-muted/50 border-border/50"
                    />
                  </div>

                  <Button variant="glow" className="w-full" size="lg" onClick={calculateRoute}>
                    <Route className="w-5 h-5" />
                    Calculate Route
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Map & Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mock Map */}
              <Card className="bg-muted/30 border-border/50 backdrop-blur-sm overflow-hidden">
                <div className="relative h-[400px] bg-gradient-to-br from-muted/50 to-muted/20">
                  {/* Mock route visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {routeCalculated ? (
                      <svg className="w-full h-full" viewBox="0 0 800 400">
                        {/* Route line */}
                        <path
                          d="M 100 200 Q 250 100 400 200 T 700 200"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="4"
                          strokeDasharray="10 5"
                          className="animate-pulse"
                        />
                        {/* Start point */}
                        <circle cx="100" cy="200" r="12" fill="hsl(var(--primary))" className="animate-pulse" />
                        <circle cx="100" cy="200" r="6" fill="hsl(var(--background))" />
                        {/* Charging stops */}
                        <circle cx="280" cy="150" r="10" fill="hsl(var(--secondary))" />
                        <circle cx="280" cy="150" r="5" fill="hsl(var(--background))" />
                        <circle cx="480" cy="220" r="10" fill="hsl(var(--secondary))" />
                        <circle cx="480" cy="220" r="5" fill="hsl(var(--background))" />
                        <circle cx="620" cy="180" r="10" fill="hsl(var(--secondary))" />
                        <circle cx="620" cy="180" r="5" fill="hsl(var(--background))" />
                        {/* End point */}
                        <circle cx="700" cy="200" r="12" fill="hsl(var(--destructive))" className="animate-pulse" />
                        <circle cx="700" cy="200" r="6" fill="hsl(var(--background))" />
                      </svg>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Route className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p>Enter your route to see the optimal charging plan</p>
                      </div>
                    )}
                  </div>

                  {/* Map overlay controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button variant="glass" size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button variant="glass" size="icon">
                      <span className="text-sm font-bold">−</span>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Trip Summary */}
              {routeCalculated && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                      <CardContent className="p-4 text-center">
                        <Navigation className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gradient">547 mi</div>
                        <p className="text-xs text-muted-foreground">Total Distance</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                      <CardContent className="p-4 text-center">
                        <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                        <div className="text-2xl font-bold">8h 15m</div>
                        <p className="text-xs text-muted-foreground">Total Time</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30 border-border/50">
                      <CardContent className="p-4 text-center">
                        <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Charging Stops</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30 border-border/50">
                      <CardContent className="p-4 text-center">
                        <Battery className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold">1h 30m</div>
                        <p className="text-xs text-muted-foreground">Charging Time</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charging Stops */}
                  <Card className="bg-muted/30 border-border/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Zap className="w-5 h-5 text-primary" />
                        Recommended Charging Stops
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockChargingStops.map((stop, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border/50 hover:border-primary/30 transition-all"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold">{index + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">{stop.name}</h4>
                            <p className="text-sm text-muted-foreground">{stop.location}</p>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="text-sm font-medium">{stop.distance}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="text-destructive">{stop.arrivalCharge}%</span>
                              <ArrowRight className="w-3 h-3" />
                              <span className="text-primary">{stop.departureCharge}%</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-sm font-medium text-secondary">{stop.chargeTime}</span>
                            <Button variant="glow-outline" size="sm">
                              Book
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoutePlanner;
