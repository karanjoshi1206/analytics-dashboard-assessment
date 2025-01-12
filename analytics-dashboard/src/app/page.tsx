import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24">
        <div className="relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-tr from-primary/20 via-accent/20 to-secondary/20 blur-3xl" />
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Solving toll headaches with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">MapUp</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">GPS-based, AI-powered toll optimization, instant toll billing, automated toll payments and toll auditing.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/dashboard" className="group px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors inline-flex items-center">
                Visit Dashboard
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
