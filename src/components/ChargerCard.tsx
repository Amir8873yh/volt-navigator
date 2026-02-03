import { Zap, MapPin, Star, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChargerProps {
  charger: {
    id: string;
    name: string;
    address: string;
    distance: string;
    available: number;
    total: number;
    speed: string;
    type: string;
    pricePerKwh: number;
    rating: number;
  };
}

const ChargerCard = ({ charger }: ChargerProps) => {
  const availabilityPercent = (charger.available / charger.total) * 100;
  const isLowAvailability = charger.available <= 2;

  return (
    <div className="group p-4 bg-muted/30 hover:bg-muted/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        {/* Left Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {charger.name}
            </h3>
            <div className="flex items-center gap-1 text-rating">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs">{charger.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{charger.address}</span>
            <span className="text-primary font-medium ml-2">{charger.distance}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
              <Zap className="w-3 h-3" />
              {charger.speed}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              {charger.type}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md">
              ${charger.pricePerKwh}/kWh
            </span>
          </div>

          {/* Availability Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className={isLowAvailability ? "text-destructive" : "text-muted-foreground"}>
                <span className="font-semibold text-foreground">{charger.available}</span>/{charger.total} available
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" />
                ~5 min wait
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isLowAvailability 
                    ? "bg-gradient-to-r from-destructive to-orange-500" 
                    : "bg-gradient-to-r from-primary to-secondary"
                }`}
                style={{ width: `${availabilityPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Action */}
        <div className="flex flex-col items-end gap-2">
          <Button variant="glow" size="sm" className="group/btn">
            Book
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            Directions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChargerCard;
