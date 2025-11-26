import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Download, Rocket, Star } from "lucide-react";
import { Link } from "react-router-dom";
import platformFlow from "@/assets/platform-flow.jpg";
import marketplaceHero from "@/assets/marketplace-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background -z-10" />
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Automatyzacje n8n</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Zautomatyzuj swój biznes
            <br />w kilka minut
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gotowe automatyzacje n8n, które oszczędzają czas i zwiększają produktywność.
            Kup, pobierz i wdróż lub pozwól nam to zrobić.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="glow-effect">
                Rozpocznij teraz
                <Rocket className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#pricing">
              <Button size="lg" variant="outline">
                Zobacz cennik
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Platform Flow Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(220 80% 8%) 0%, hsl(220 60% 12%) 50%, hsl(0 75% 10%) 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(220 80% 45%) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16">
            Jak działa <span className="text-gradient">nasza platforma?</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div 
              className="relative rounded-2xl p-8 transform-gpu transition-all duration-500 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, hsla(220, 80%, 15%, 0.6), hsla(0, 75%, 15%, 0.4))',
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  0 25px 60px -15px hsla(220, 80%, 45%, 0.4),
                  0 15px 40px -10px hsla(0, 75%, 55%, 0.3),
                  inset 0 1px 0 0 hsla(220, 80%, 70%, 0.1),
                  0 0 80px hsla(220, 80%, 45%, 0.2)
                `,
                border: '1px solid hsla(220, 80%, 45%, 0.3)',
              }}
            >
              <img 
                src={platformFlow} 
                alt="Platform Flow Diagram" 
                className="w-full h-auto rounded-lg"
                style={{
                  filter: 'drop-shadow(0 10px 30px hsla(220, 80%, 45%, 0.3))',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Jak to <span className="text-gradient">działa?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Download,
                title: "1. Kup automatyzację",
                description: "Wybierz automatyzację, która pasuje do Twoich potrzeb i dokonaj zakupu."
              },
              {
                icon: Zap,
                title: "2. Pobierz pliki",
                description: "Otrzymasz plik JSON oraz szczegółową instrukcję wdrożenia."
              },
              {
                icon: Rocket,
                title: "3. Wdroż lub zlecaj",
                description: "Wdroż samodzielnie lub pozwól naszemu zespołowi to zrobić za Ciebie."
              }
            ].map((step, index) => (
              <Card key={index} className="p-8 card-gradient border-primary/20 hover:border-primary/40 transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 glow-effect">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Proste <span className="text-gradient">ceny</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Wybierz opcję, która najlepiej odpowiada Twoim potrzebom
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <Card className="p-8 card-gradient border-border">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">JSON + Instrukcja</h3>
                <p className="text-muted-foreground">Idealne dla programistów</p>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">299</span>
                <span className="text-muted-foreground ml-2">PLN</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Plik JSON automatyzacji",
                  "Szczegółowa instrukcja",
                  "Samodzielne wdrożenie",
                  "Wsparcie email"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/auth?mode=signup">
                <Button className="w-full" variant="outline">
                  Wybierz plan
                </Button>
              </Link>
            </Card>

            {/* Premium Plan */}
            <Card className="p-8 card-gradient border-primary relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Premium
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Wdrożenie Premium</h3>
                <p className="text-muted-foreground">Zajmiemy się wszystkim</p>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">999</span>
                <span className="text-muted-foreground ml-2">PLN</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Wszystko z planu Basic",
                  "Pełne wdrożenie przez zespół",
                  "Konfiguracja i testy",
                  "Wsparcie priorytetowe",
                  "30 dni wsparcia technicznego"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/auth?mode=signup">
                <Button className="w-full glow-effect">
                  Wybierz plan
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Co mówią <span className="text-gradient">klienci?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Anna Kowalska",
                role: "CEO, TechStart",
                content: "HermesHub oszczędził nam setki godzin pracy. Automatyzacje działają bezbłędnie!"
              },
              {
                name: "Piotr Nowak",
                role: "Developer",
                content: "Najlepsza inwestycja w rozwój mojego biznesu. Proste wdrożenie i świetne wsparcie."
              },
              {
                name: "Maria Wiśniewska",
                role: "Marketing Manager",
                content: "Opcja premium to strzał w dziesiątkę. Zespół HermesHub zrobił wszystko za mnie."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 card-gradient border-primary/20">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-gradient">MercuryHub</span>
          </div>
          <div className="mb-4">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Polityka prywatności
            </Link>
          </div>
          <p className="text-muted-foreground">
            © 2024 MercuryHub. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
