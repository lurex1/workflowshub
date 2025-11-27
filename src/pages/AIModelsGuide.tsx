import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Key, Zap, DollarSign, ExternalLink } from "lucide-react";

const AIModelsGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 mt-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent">
            Przewodnik po Modelach AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Wszystko, co musisz wiedzieć o wykorzystaniu sztucznej inteligencji w automatyzacjach
          </p>
        </div>

        {/* What is API Section */}
        <Card className="mb-12 p-8 bg-card/50 backdrop-blur border-primary/20">
          <div className="flex items-start gap-4">
            <Key className="w-12 h-12 text-primary mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Czym jest API i po co jest w automatyzacjach?</h2>
              <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                <strong>API (Application Programming Interface)</strong> to sposób komunikacji między różnymi programami. 
                W kontekście automatyzacji i AI, <strong>klucz API</strong> działa jak przepustka - pozwala Twoim automatyzacjom 
                (w n8n, Make, Zapier) na wysyłanie zapytań do modeli AI i otrzymywanie odpowiedzi.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                <strong>Przykład:</strong> Twoja automatyzacja otrzymuje email od klienta → wysyła treść do OpenAI przez API → 
                otrzymuje automatyczną odpowiedź → wysyła ją z powrotem do klienta. Wszystko w kilka sekund, bez Twojego udziału.
              </p>
            </div>
          </div>
        </Card>

        {/* Models Section */}
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Dostępne Modele AI</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* OpenAI */}
          <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-primary/30 hover:border-primary/60 transition-all duration-300">
            <Brain className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">OpenAI (GPT)</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2">Popularne modele:</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• GPT-5 - najnowszy, najpotężniejszy</li>
                <li>• GPT-4o - szybki, multimodalny</li>
                <li>• GPT-4o-mini - tańszy wariant</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-destructive" />
                Promocje:
              </h4>
              <p className="text-muted-foreground text-sm mb-2">
                <strong className="text-destructive">$5 darmowych kredytów</strong> dla nowych użytkowników
              </p>
              <p className="text-muted-foreground text-sm">
                Program startupowy: do $500,000 kredytów dla wybranych firm
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2">Jak założyć konto:</h4>
              <ol className="text-muted-foreground text-sm space-y-2">
                <li>1. Wejdź na <strong>platform.openai.com</strong></li>
                <li>2. Zarejestruj się emailem</li>
                <li>3. Przejdź do sekcji API Keys</li>
                <li>4. Utwórz nowy klucz API</li>
                <li>5. Skopiuj klucz (zachowaj w bezpiecznym miejscu!)</li>
              </ol>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer">
                Załóż konto OpenAI <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </Card>

          {/* Claude (Anthropic) */}
          <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-primary/30 hover:border-primary/60 transition-all duration-300">
            <Brain className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Claude (Anthropic)</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2">Popularne modele:</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Claude 4 Sonnet - najnowszy, zbalansowany</li>
                <li>• Claude 3.5 Sonnet - szybki i dokładny</li>
                <li>• Claude 3 Opus - najbardziej zaawansowany</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-destructive" />
                Promocje:
              </h4>
              <p className="text-muted-foreground text-sm mb-2">
                <strong className="text-destructive">$5 darmowych kredytów</strong> na start
              </p>
              <p className="text-muted-foreground text-sm">
                Niskie ceny za token, świetny stosunek jakości do ceny
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2">Jak założyć konto:</h4>
              <ol className="text-muted-foreground text-sm space-y-2">
                <li>1. Wejdź na <strong>console.anthropic.com</strong></li>
                <li>2. Zarejestruj się emailem</li>
                <li>3. Przejdź do API Keys</li>
                <li>4. Wygeneruj nowy klucz</li>
                <li>5. Skopiuj i zabezpiecz klucz</li>
              </ol>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer">
                Załóż konto Claude <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </Card>

          {/* Google Gemini */}
          <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-primary/30 hover:border-primary/60 transition-all duration-300">
            <Brain className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Google Gemini</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2">Popularne modele:</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Gemini 2.5 Pro - najpotężniejszy</li>
                <li>• Gemini 2.5 Flash - szybki i ekonomiczny</li>
                <li>• Gemini 1.5 Pro - stabilny wybór</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-destructive" />
                Promocje:
              </h4>
              <p className="text-muted-foreground text-sm mb-2">
                <strong className="text-destructive">$300 darmowych kredytów Google Cloud</strong> na 90 dni
              </p>
              <p className="text-muted-foreground text-sm">
                Darmowy tier z limitami miesięcznymi dla małych projektów
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2">Jak założyć konto:</h4>
              <ol className="text-muted-foreground text-sm space-y-2">
                <li>1. Wejdź na <strong>aistudio.google.com</strong></li>
                <li>2. Zaloguj się kontem Google</li>
                <li>3. Przejdź do "Get API Key"</li>
                <li>4. Utwórz nowy projekt (jeśli potrzeba)</li>
                <li>5. Wygeneruj i skopiuj klucz API</li>
              </ol>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">
                Załóż konto Gemini <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </Card>
        </div>

        {/* Use Cases Section */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-destructive/10 border-primary/30 mb-12">
          <Zap className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-6 text-foreground">Przykłady zastosowań w automatyzacjach</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">📧 Obsługa klienta</h3>
              <p className="text-muted-foreground text-sm">
                Automatyczne odpowiedzi na emaile klientów, analiza sentymentu, kategoryzacja zgłoszeń
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">📝 Generowanie treści</h3>
              <p className="text-muted-foreground text-sm">
                Tworzenie opisów produktów, postów w social media, newsletterów
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">📊 Analiza danych</h3>
              <p className="text-muted-foreground text-sm">
                Podsumowania raportów, ekstrakcja informacji z dokumentów, analiza trendów
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">🌍 Tłumaczenia</h3>
              <p className="text-muted-foreground text-sm">
                Automatyczne tłumaczenie treści na wiele języków, lokalizacja komunikacji
              </p>
            </div>
          </div>
        </Card>

        {/* Best Practices */}
        <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Wskazówki i najlepsze praktyki</h2>
          
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <p><strong className="text-foreground">Bezpieczeństwo:</strong> Nigdy nie udostępniaj swojego klucza API publicznie. Traktuj go jak hasło do banku.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <p><strong className="text-foreground">Koszty:</strong> Monitoruj zużycie API. Ustaw limity miesięczne w panelach dostawców, aby uniknąć niespodzianek.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <p><strong className="text-foreground">Wybór modelu:</strong> Nie zawsze potrzebujesz najdroższego modelu. Do prostych zadań wystarczą tańsze wersje (mini/flash).</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <p><strong className="text-foreground">Testowanie:</strong> Zacznij od małych eksperymentów z darmowymi kredytami, zanim wdrożysz automatyzację na pełną skalę.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <p><strong className="text-foreground">Dokumentacja:</strong> Każdy dostawca ma świetną dokumentację API - warto ją przeczytać przed integracją.</p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-destructive hover:opacity-90">
            <a href="/marketplace">
              Przeglądaj automatyzacje z AI
            </a>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 MercuryHub. Wszystkie prawa zastrzeżone. | <a href="/privacy" className="underline hover:text-primary-foreground/80">Polityka prywatności</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIModelsGuide;
