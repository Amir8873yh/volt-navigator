import { useState, useEffect } from "react";
import { Zap, Battery, Clock, DollarSign, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ChargingTracker = () => {
  const [isCharging, setIsCharging] = useState(true);
  const [progress, setProgress] = useState(45);
  const [timeRemaining, setTimeRemaining] = useState(35);

  useEffect(() => {
    if (!isCharging) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsCharging(false);
          return 100;
        }
        return prev + 0.5;
      });
      setTimeRemaining((prev) => Math.max(0, prev - 0.3));
    }, 1000);

    return () => clearInterval(interval);
  }, [isCharging]);

  return (
    <section id="bookings" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Live <span className="text-gradient">Charging Session</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor your charging progress in real-time
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Active Session Card */}
          <div className="relative p-6 sm:p-8 bg-muted/30 backdrop-blur-xl rounded-3xl border border-border/50 overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-[60px] animate-glow-pulse" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/30 rounded-full blur-[60px] animate-glow-pulse" style={{ animationDelay: "1s" }} />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${isCharging ? "bg-primary animate-pulse" : "bg-green-500"}`} />
                    <span className="text-sm text-muted-foreground">
                      {isCharging ? "Charging in Progress" : "Charging Complete"}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">Tesla Supercharger - Downtown</h3>
                  <p className="text-sm text-muted-foreground">Stall #5</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Battery Visualization */}
              <div className="relative mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    {/* Battery Icon */}
                    <div className="w-48 h-24 bg-muted rounded-xl border-2 border-primary/50 relative overflow-hidden">
                      <div
                        className="absolute inset-1 rounded-lg bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                      {/* Charging Animation */}
                      {isCharging && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Zap className="w-10 h-10 text-primary-foreground animate-pulse" />
                        </div>
                      )}
                      {!isCharging && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CheckCircle className="w-10 h-10 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    {/* Battery Tip */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-2 h-8 bg-primary/50 rounded-r-sm" />
                  </div>
                </div>

                {/* Progress Text */}
                <div className="text-center">
                  <span className="text-5xl font-bold text-gradient">{Math.round(progress)}%</span>
                  <p className="text-muted-foreground mt-1">
                    {isCharging ? "Estimated range: 245 miles" : "Full charge achieved!"}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <Progress value={progress} className="h-2 bg-muted" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: Battery, label: "Added", value: "32 kWh", color: "text-primary" },
                  { icon: Clock, label: "Time Left", value: `${Math.round(timeRemaining)} min`, color: "text-secondary" },
                  { icon: Zap, label: "Power", value: "150 kW", color: "text-primary" },
                  { icon: DollarSign, label: "Cost", value: "$12.45", color: "text-green-500" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 bg-muted/50 rounded-xl">
                    <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                    <div className="text-lg font-semibold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isCharging ? (
                  <>
                    <Button variant="destructive" className="flex-1">
                      Stop Charging
                    </Button>
                    <Button variant="glow-outline" className="flex-1">
                      Extend Session
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="glow" className="flex-1">
                      View Receipt
                    </Button>
                    <Button variant="glass" className="flex-1">
                      Find Next Charger
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChargingTracker;
