import { useState } from "react";
import { Battery, Navigation, MapPin, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const RangeEstimator = () => {
  const [currentCharge, setCurrentCharge] = useState([75]);
  const [destination, setDestination] = useState("");
  const estimatedRange = Math.round(currentCharge[0] * 3.2);
  const chargesNeeded = Math.max(0, Math.floor((200 - estimatedRange) / 200));

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Smart <span className="text-gradient">Range Estimator</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Plan your trip and find charging stops along the way
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6 p-6 bg-muted/30 backdrop-blur-sm rounded-2xl border border-border/50">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Current Battery Level
              </label>
              <div className="flex items-center gap-4">
                <Battery className="w-6 h-6 text-primary" />
                <Slider
                  value={currentCharge}
                  onValueChange={setCurrentCharge}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xl font-bold text-primary w-16 text-right">
                  {currentCharge[0]}%
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Your Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Current location"
                  defaultValue="San Francisco, CA"
                  className="pl-10 h-12 bg-muted/50 border-border/50"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Destination
              </label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 h-12 bg-muted/50 border-border/50"
                />
              </div>
            </div>

            <Button variant="glow" className="w-full" size="lg">
              <Zap className="w-5 h-5" />
              Calculate Route
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Range Card */}
            <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Estimated Range</p>
                <div className="text-5xl font-bold text-gradient mb-2">
                  {estimatedRange} mi
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on current charge and driving conditions
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50 text-center">
                <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{chargesNeeded}</div>
                <p className="text-xs text-muted-foreground">Charges Needed</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50 text-center">
                <Navigation className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold">~3h 15m</div>
                <p className="text-xs text-muted-foreground">Total Trip Time</p>
              </div>
            </div>

            {/* Suggested Stops */}
            <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
              <p className="text-sm font-medium mb-3">Suggested Charging Stops</p>
              <div className="space-y-2">
                {[
                  { name: "Tesla Supercharger - Sacramento", distance: "120 mi", chargeTime: "25 min" },
                  { name: "Electrify America - Reno", distance: "220 mi", chargeTime: "30 min" },
                ].map((stop, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{stop.name}</p>
                        <p className="text-xs text-muted-foreground">{stop.distance} from start</p>
                      </div>
                    </div>
                    <span className="text-xs text-primary">{stop.chargeTime}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RangeEstimator;
