import { useState } from "react";
import { Newspaper, Download, ExternalLink, Calendar, Zap, FileText, Image, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Press = () => {
  const pressReleases = [
    {
      date: "January 15, 2024",
      title: "VoltFind Raises $50M Series B to Expand EV Charging Network",
      excerpt: "Funding will accelerate expansion to 500+ cities and enhance AI-powered route optimization.",
      link: "#",
    },
    {
      date: "December 8, 2023",
      title: "VoltFind Partners with Major Auto Manufacturers",
      excerpt: "New partnerships bring seamless charging integration to millions of EV drivers.",
      link: "#",
    },
    {
      date: "October 22, 2023",
      title: "VoltFind Launches Revolutionary Route Planner Feature",
      excerpt: "AI-powered route planning ensures EV drivers never worry about range anxiety again.",
      link: "#",
    },
    {
      date: "August 5, 2023",
      title: "VoltFind Surpasses 1 Million Active Users",
      excerpt: "Milestone reached as EV adoption continues to accelerate globally.",
      link: "#",
    },
  ];

  const mediaCoverage = [
    {
      outlet: "TechCrunch",
      title: "VoltFind is solving EV charging's biggest problem",
      date: "January 2024",
      link: "#",
    },
    {
      outlet: "The Verge",
      title: "The app that makes EV road trips actually enjoyable",
      date: "December 2023",
      link: "#",
    },
    {
      outlet: "Forbes",
      title: "Top 10 EV Startups to Watch in 2024",
      date: "November 2023",
      link: "#",
    },
    {
      outlet: "Wired",
      title: "How VoltFind is using AI to eliminate range anxiety",
      date: "October 2023",
      link: "#",
    },
  ];

  const pressKitItems = [
    { icon: FileText, label: "Brand Guidelines", format: "PDF", size: "2.4 MB" },
    { icon: Image, label: "Logo Pack", format: "ZIP", size: "8.1 MB" },
    { icon: FileText, label: "Company Fact Sheet", format: "PDF", size: "1.2 MB" },
    { icon: Image, label: "Executive Photos", format: "ZIP", size: "15.3 MB" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Newspaper className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Press & Media</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              News & <span className="text-primary">Press</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay up to date with the latest VoltFind news, press releases, and media coverage.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Press Releases - Main Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 animate-slide-up">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Press Releases
                </h2>
                <div className="space-y-6">
                  {pressReleases.map((release, index) => (
                    <a
                      key={index}
                      href={release.link}
                      className="block p-5 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 hover:bg-muted/50 transition-all group"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        {release.date}
                      </div>
                      <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                        {release.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {release.excerpt}
                      </p>
                    </a>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6">
                  View All Press Releases
                </Button>
              </div>

              {/* Media Coverage */}
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-primary" />
                  Media Coverage
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {mediaCoverage.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 hover:bg-muted/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-primary font-medium mb-1">{item.outlet}</p>
                        <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Press Kit */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  Press Kit
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Download our brand assets and media resources.
                </p>
                <div className="space-y-3">
                  {pressKitItems.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 hover:bg-background/80 transition-all text-left group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.format} • {item.size}
                        </p>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
                <Button variant="glow" className="w-full mt-4">
                  <Download className="w-4 h-4" />
                  Download All
                </Button>
              </div>

              {/* Media Contact */}
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Media Contact
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  For press inquiries, interviews, or media requests:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:press@voltfind.com" className="text-primary hover:underline">
                      press@voltfind.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href="tel:1-800-VOLTFIND" className="text-foreground hover:text-primary transition-colors">
                      1-800-VOLTFIND (Press Line)
                    </a>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Response time: Within 24 hours
                </p>
              </div>

              {/* Stats */}
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.25s" }}>
                <h3 className="text-lg font-semibold mb-4">Company Highlights</h3>
                <div className="space-y-4">
                  {[
                    { label: "Active Users", value: "1M+" },
                    { label: "Charging Stations", value: "50K+" },
                    { label: "Cities Covered", value: "200+" },
                    { label: "Founded", value: "2021" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">{stat.label}</span>
                      <span className="text-primary font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
