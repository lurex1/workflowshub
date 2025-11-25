import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, TrendingUp, Share2, Zap, Clock, DollarSign } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import automationEmail from "@/assets/automation-email.jpg";
import automationData from "@/assets/automation-data.jpg";
import automationSocial from "@/assets/automation-social.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const automationExamples = [
    {
      icon: Mail,
      title: "Automatyzacja Email Marketingu",
      description: "Automatycznie wysyłaj spersonalizowane kampanie email, obsługuj odpowiedzi i segmentuj odbiorców na podstawie ich zachowań.",
      benefits: [
        "Oszczędność 15+ godzin tygodniowo",
        "Wzrost konwersji o 40%",
        "Automatyczne follow-up"
      ],
      image: automationEmail
    },
    {
      icon: TrendingUp,
      title: "Przetwarzanie i Analiza Danych",
      description: "Automatyczne zbieranie danych z różnych źródeł, ich przetwarzanie i generowanie raportów analitycznych w czasie rzeczywistym.",
      benefits: [
        "Raporty generowane automatycznie",
        "Redukcja błędów o 95%",
        "Dostęp do danych 24/7"
      ],
      image: automationData
    },
    {
      icon: Share2,
      title: "Zarządzanie Social Media",
      description: "Planuj i publikuj posty na wielu platformach jednocześnie, monitoruj engagement i automatycznie odpowiadaj na komentarze.",
      benefits: [
        "Oszczędność 20+ godzin miesięcznie",
        "Konsystentna obecność online",
        "Zwiększony zasięg o 60%"
      ],
      image: automationSocial
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Poznaj Moc <span className="text-gradient">Automatyzacji</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Automatyzacja to przyszłość biznesu. Odkryj jak technologie AI i workflow mogą uwolnić Twój czas i zwiększyć efektywność.
          </p>
        </div>

        {/* Co to są automatyzacje */}
        <Card className="p-8 mb-12 card-gradient border-primary/20">
          <div className="flex items-start gap-6 mb-6">
            <div className="p-4 rounded-xl bg-primary/10">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Czym są automatyzacje?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Automatyzacje biznesowe to inteligentne przepływy pracy, które wykonują powtarzalne zadania bez Twojego udziału. 
                Dzięki platformom takim jak n8n, Make czy Zapier możesz połączyć różne narzędzia i systemy, tworząc kompleksowe rozwiązania.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Oszczędność czasu</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                  <DollarSign className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Redukcja kosztów</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Wzrost wydajności</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Przykłady automatyzacji */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Przykłady Automatyzacji
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {automationExamples.map((example, index) => (
              <Card key={index} className="overflow-hidden card-gradient border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={example.image} 
                    alt={example.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <example.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{example.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {example.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-primary mb-2">Korzyści:</p>
                    {example.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="p-8 text-center card-gradient border-primary/20">
          <h2 className="text-2xl font-bold mb-3">Gotowy na automatyzację?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Przejrzyj naszą ofertę gotowych automatyzacji i zacznij oszczędzać czas już dziś. 
            Każda automatyzacja zawiera szczegółową instrukcję i pliki gotowe do importu.
          </p>
          <Button onClick={() => navigate("/marketplace")} className="glow-effect" size="lg">
            Zobacz dostępne automatyzacje
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
