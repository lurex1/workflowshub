import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Star, Search, Zap, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import heroImage from '@/assets/marketplace-hero.jpg';
import { useSearchParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price_basic: number;
  price_premium: number;
  category: string;
  tags: string[];
  rating: number;
  sales_count: number;
  preview_image_url: string | null;
  creator_id: string;
}

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    loadProducts();
    
    // Check for payment success and verify
    const sessionId = searchParams.get('session_id');
    if (searchParams.get('success') && sessionId) {
      verifyPayment(sessionId);
      // Remove params from URL
      searchParams.delete('success');
      searchParams.delete('session_id');
      setSearchParams(searchParams);
    } else if (searchParams.get('canceled')) {
      toast({
        title: 'Płatność anulowana',
        description: 'Możesz spróbować ponownie w każdej chwili.',
        variant: 'destructive',
      });
      // Remove canceled param from URL
      searchParams.delete('canceled');
      setSearchParams(searchParams);
    }
  }, []);

  const verifyPayment = async (sessionId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { session_id: sessionId }
      });

      if (error) throw error;

      toast({
        title: 'Płatność zakończona!',
        description: 'Dziękujemy za zakup. Przejdź do dashboard aby pobrać pliki.',
      });
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: 'Błąd weryfikacji',
        description: 'Skontaktuj się z supportem jeśli płatność została pobrana.',
        variant: 'destructive',
      });
    }
  };

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'approved')
        .order('sales_count', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: 'Błąd ładowania produktów',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handlePurchase = async (productId: string, purchaseType: 'basic' | 'premium') => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: 'Zaloguj się',
          description: 'Musisz być zalogowany, aby dokonać zakupu',
          variant: 'destructive',
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { product_id: productId, purchase_type: purchaseType }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: 'Błąd',
        description: 'Nie udało się rozpocząć procesu płatności',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 pt-24">
          <p className="text-center">Ładowanie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background"></div>
        <div className="relative">
          <img 
            src={heroImage} 
            alt="AI Automation Marketplace" 
            className="w-full h-[400px] object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl px-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="h-8 w-8 text-primary" />
                <h1 className="text-5xl md:text-6xl font-bold text-gradient">
                  Marketplace Automatyzacji
                </h1>
              </div>
              <p className="text-xl text-muted-foreground mb-6">
                Gotowe rozwiązania AI i workflowów od profesjonalnych twórców
              </p>
              <div className="flex items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Zweryfikowani twórcy</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Natychmiastowy dostęp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj automatyzacji..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Kategoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
              <SelectItem value="crm">CRM</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sprzedaż</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="other">Inne</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50">
              {product.preview_image_url && (
                <div className="relative w-full h-56 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img
                    src={product.preview_image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              )}
              <CardHeader className="pb-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.sales_count} sprzedaży
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags?.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-border/50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 pt-0">
                <Button
                  onClick={() => handlePurchase(product.id, 'basic')}
                  variant="outline"
                  className="w-full hover:bg-muted/50"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Basic - {product.price_basic} PLN
                </Button>
                <Button
                  onClick={() => handlePurchase(product.id, 'premium')}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Premium - {product.price_premium} PLN
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nie znaleziono produktów</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
