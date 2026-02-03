import { Calendar, Receipt, Download, ChevronRight, Zap, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockHistory = [
  {
    id: "1",
    date: "Feb 2, 2026",
    time: "2:30 PM",
    station: "Tesla Supercharger - Downtown",
    address: "123 Main Street",
    energy: "45 kWh",
    cost: "$15.75",
    duration: "32 min",
    rating: 5,
  },
  {
    id: "2",
    date: "Jan 30, 2026",
    time: "10:15 AM",
    station: "ChargePoint Station",
    address: "456 Oak Avenue",
    energy: "28 kWh",
    cost: "$8.96",
    duration: "45 min",
    rating: 4,
  },
  {
    id: "3",
    date: "Jan 28, 2026",
    time: "6:45 PM",
    station: "Electrify America Hub",
    address: "789 Electric Blvd",
    energy: "62 kWh",
    cost: "$26.66",
    duration: "25 min",
    rating: 5,
  },
  {
    id: "4",
    date: "Jan 25, 2026",
    time: "3:20 PM",
    station: "EVgo Fast Charger",
    address: "321 Green Lane",
    energy: "35 kWh",
    cost: "$9.80",
    duration: "38 min",
    rating: 4,
  },
];

const HistorySection = () => {
  return (
    <section id="history" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Charging <span className="text-gradient">History</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track all your charging sessions and download receipts
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          {[
            { icon: Zap, label: "Total Energy", value: "170 kWh", color: "text-primary" },
            { icon: DollarSign, label: "Total Spent", value: "$61.17", color: "text-green-500" },
            { icon: Clock, label: "Time Saved", value: "4.2 hrs", color: "text-secondary" },
            { icon: Calendar, label: "This Month", value: "4 sessions", color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50 text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* History List */}
        <div className="max-w-4xl mx-auto space-y-3">
          {mockHistory.map((session, index) => (
            <div
              key={session.id}
              className="group p-4 bg-muted/30 hover:bg-muted/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {session.station}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{session.address}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-semibold text-foreground">{session.cost}</div>
                      <div className="text-xs text-muted-foreground">{session.date}</div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-primary" />
                      {session.energy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-secondary" />
                      {session.duration}
                    </span>
                    <span>{session.time}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <Receipt className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <Download className="w-4 h-4" />
                  </Button>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button variant="glow-outline" size="lg">
            View All History
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
