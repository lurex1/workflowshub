import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Check, ArrowRight, DollarSign } from 'lucide-react';

const StripeOnboarding = () => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);

  useEffect(() => {
    if (!hasRole('developer')) {
      navigate('/');
      return;
    }
    checkStripeStatus();
  }, [hasRole, navigate]);

  const checkStripeStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('stripe_account_id')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setStripeConnected(!!data?.stripe_account_id);
    } catch (error) {
      console.error('Error checking Stripe status:', error);
    }
  };

  const handleConnectStripe = async () => {
    setLoading(true);
    toast({
      title: 'Funkcja w przygotowaniu',
      description: 'Integracja Stripe Connect będzie dostępna wkrótce. Na razie możesz dodawać produkty bez podłączonego konta.',
    });
    setLoading(false);
  };

  if (stripeConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-2xl mx-auto text-center p-8">
            <div className="inline-flex p-4 rounded-full bg-green-500/10 mb-4">
              <Check className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Konto Stripe połączone!</h2>
            <p className="text-muted-foreground mb-6">
              Możesz teraz sprzedawać swoje produkty i otrzymywać płatności.
            </p>
            <Button onClick={() => navigate('/developer')}>
              Przejdź do panelu developera
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gradient">
              Podłącz konto Stripe
            </h1>
            <p className="text-lg text-muted-foreground">
              Aby sprzedawać swoje produkty, musisz połączyć konto Stripe Connect
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Bezpieczne płatności</h3>
              <p className="text-sm text-muted-foreground">
                Stripe zapewnia bezpieczne przetwarzanie płatności
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">90% dla Ciebie</h3>
              <p className="text-sm text-muted-foreground">
                Otrzymujesz 90% każdej sprzedaży bezpośrednio na konto
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <ArrowRight className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Automatyczne wypłaty</h3>
              <p className="text-sm text-muted-foreground">
                Pieniądze trafiają automatycznie na Twoje konto
              </p>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Jak to działa?</CardTitle>
              <CardDescription>
                Model marketplace typu Amazon - każdy developer ma własne konto Stripe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Połącz konto Stripe Connect</h4>
                  <p className="text-sm text-muted-foreground">
                    Utworzysz konto Stripe Connect podłączone do HermesHub
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Dodaj produkty</h4>
                  <p className="text-sm text-muted-foreground">
                    Ustaw swoje ceny i opisz swoje automatyzacje
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Otrzymuj płatności</h4>
                  <p className="text-sm text-muted-foreground">
                    90% trafia na Twoje konto, 10% to prowizja platformy
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button 
                  className="w-full glow-effect" 
                  size="lg"
                  onClick={handleConnectStripe}
                  disabled={loading}
                >
                  {loading ? 'Łączenie...' : 'Połącz konto Stripe'}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Zostaniesz przekierowany do Stripe aby dokończyć konfigurację
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StripeOnboarding;