import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileText, Package, ShoppingCart } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface Purchase {
  id: string;
  product_id: string;
  purchase_type: string;
  status: string;
  created_at: string;
  products: {
    name: string;
    description: string;
    json_file_url: string;
    instructions_url: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadPurchases(session.user.id);
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

  const loadPurchases = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("purchases")
        .select(`
          *,
          products (
            name,
            description,
            json_file_url,
            instructions_url
          )
        `)
        .eq("user_id", userId)
        .eq("status", "completed")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPurchases(data || []);
    } catch (error) {
      console.error("Error loading purchases:", error);
      toast.error("Błąd ładowania zakupów");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url: string, filename: string) => {
    window.open(url, "_blank");
    toast.success(`Pobieranie ${filename}...`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-muted-foreground">Ładowanie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Twój <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Witaj, {user?.email}! Zarządzaj swoimi automatyzacjami.
          </p>
        </div>

        {purchases.length === 0 ? (
          <Card className="p-12 text-center card-gradient border-primary/20">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <ShoppingCart className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Brak zakupów</h2>
            <p className="text-muted-foreground mb-6">
              Jeszcze nie masz żadnych automatyzacji. Czas na pierwszą!
            </p>
            <Button onClick={() => navigate("/")} className="glow-effect">
              Zobacz dostępne automatyzacje
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id} className="p-6 card-gradient border-primary/20">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        {purchase.products.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {purchase.products.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          purchase.purchase_type === 'premium'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {purchase.purchase_type === 'premium' ? 'Premium' : 'Basic'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(purchase.created_at).toLocaleDateString('pl-PL')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(purchase.products.json_file_url, "automation.json")}
                  >
                    <FileJson className="w-4 h-4 mr-2" />
                    Pobierz JSON
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(purchase.products.instructions_url, "instructions.pdf")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Pobierz instrukcję
                  </Button>
                  {purchase.purchase_type === 'premium' && (
                    <Button className="glow-effect">
                      <Download className="w-4 h-4 mr-2" />
                      Umów wdrożenie
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
