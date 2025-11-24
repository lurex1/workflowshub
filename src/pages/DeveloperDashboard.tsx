import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, Upload, File, FileText, Image as ImageIcon } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { DeveloperProfile } from '@/components/DeveloperProfile';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().trim().min(3, { message: "Nazwa musi mieć minimum 3 znaki" }).max(100, { message: "Nazwa może mieć maksymalnie 100 znaków" }),
  description: z.string().trim().min(10, { message: "Opis musi mieć minimum 10 znaków" }).max(1000, { message: "Opis może mieć maksymalnie 1000 znaków" }),
  price_basic: z.number().positive({ message: "Cena musi być dodatnia" }).max(999999, { message: "Cena jest zbyt wysoka" }),
  price_premium: z.number().positive({ message: "Cena musi być dodatnia" }).max(999999, { message: "Cena jest zbyt wysoka" }),
  category: z.enum(['crm', 'marketing', 'sales', 'hr', 'other'], { message: "Nieprawidłowa kategoria" }),
  tags: z.array(z.string().trim().min(1).max(50)).max(10, { message: "Maksymalnie 10 tagów" }),
});

interface Product {
  id: string;
  name: string;
  description: string;
  price_basic: number;
  price_premium: number;
  category: string;
  tags: string[];
  status: string;
  sales_count: number;
  json_file_url: string | null;
  instructions_url: string | null;
  preview_image_url: string | null;
}

const DeveloperDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_basic: '',
    price_premium: '',
    category: 'other',
    tags: '',
  });
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasRole('developer')) {
      navigate('/');
      return;
    }
    loadProducts();
  }, [hasRole, navigate]);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', user?.id)
        .order('created_at', { ascending: false });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Parse and validate input
      const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      const validation = productSchema.safeParse({
        name: formData.name,
        description: formData.description,
        price_basic: parseFloat(formData.price_basic),
        price_premium: parseFloat(formData.price_premium),
        category: formData.category,
        tags,
      });

      if (!validation.success) {
        const firstError = validation.error.errors[0];
        toast({
          title: 'Błąd walidacji',
          description: firstError.message,
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase.from('products').insert({
        name: validation.data.name,
        description: validation.data.description,
        price_basic: validation.data.price_basic,
        price_premium: validation.data.price_premium,
        category: validation.data.category,
        tags: validation.data.tags,
        creator_id: user?.id,
        status: 'pending',
      });

      if (error) throw error;

      toast({
        title: 'Produkt dodany!',
        description: 'Twój produkt czeka na zatwierdzenie.',
      });

      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        price_basic: '',
        price_premium: '',
        category: 'other',
        tags: '',
      });
      loadProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: 'Błąd tworzenia produktu',
        variant: 'destructive',
      });
    }
  };

  const handleFileUpload = async (
    productId: string, 
    file: File, 
    fileType: 'json' | 'instructions' | 'preview'
  ) => {
    try {
      setUploadingFiles(prev => ({ ...prev, [productId + fileType]: true }));
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId}/${fileType}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('automation-files')
        .upload(fileName, file, { 
          upsert: true,
          contentType: file.type 
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('automation-files')
        .getPublicUrl(fileName);

      const updateField = 
        fileType === 'json' ? 'json_file_url' : 
        fileType === 'instructions' ? 'instructions_url' : 
        'preview_image_url';

      const { error: updateError } = await supabase
        .from('products')
        .update({ [updateField]: publicUrl })
        .eq('id', productId);

      if (updateError) throw updateError;

      toast({
        title: 'Plik dodany!',
        description: 'Plik został pomyślnie przesłany',
      });

      loadProducts();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Błąd uploadu',
        variant: 'destructive',
      });
    } finally {
      setUploadingFiles(prev => ({ ...prev, [productId + fileType]: false }));
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Ładowanie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Developer Profile Section */}
        <div className="mb-8">
          <DeveloperProfile />
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gradient">Moje Produkty</h1>
            <p className="text-muted-foreground">
              Zarządzaj swoimi automatyzacjami
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 HermesHub pobiera 10% prowizji od każdej sprzedaży
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj Automatyzację
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nowa Automatyzacja</CardTitle>
              <CardDescription>
                Wypełnij formularz, aby dodać nową automatyzację
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nazwa</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Opis</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price_basic">Cena Basic (PLN)</Label>
                    <Input
                      id="price_basic"
                      type="number"
                      step="0.01"
                      value={formData.price_basic}
                      onChange={(e) => setFormData({ ...formData, price_basic: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price_premium">Cena Premium (PLN)</Label>
                    <Input
                      id="price_premium"
                      type="number"
                      step="0.01"
                      value={formData.price_premium}
                      onChange={(e) => setFormData({ ...formData, price_premium: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crm">CRM</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sprzedaż</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tagi (oddzielone przecinkami)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="np. n8n, automation, linkedin"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Dodaj Produkt</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Anuluj
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {product.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(product.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Kategoria</p>
                    <p className="font-medium">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cena Basic</p>
                    <p className="font-medium">{product.price_basic} PLN</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cena Premium</p>
                    <p className="font-medium">{product.price_premium} PLN</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sprzedaż</p>
                    <p className="font-medium">{product.sales_count}</p>
                  </div>
                </div>

                {/* File Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <Label className="text-xs mb-2 block">Plik JSON (workflow)</Label>
                    {product.json_file_url ? (
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">Dodano</span>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(product.id, file, 'json');
                          }}
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          disabled={uploadingFiles[product.id + 'json']}
                          type="button"
                          onClick={(e) => {
                            e.currentTarget.previousElementSibling?.querySelector('input')?.click();
                          }}
                        >
                          {uploadingFiles[product.id + 'json'] ? (
                            'Uploading...'
                          ) : (
                            <>
                              <Upload className="h-3 w-3 mr-1" />
                              Upload JSON
                            </>
                          )}
                        </Button>
                      </label>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs mb-2 block">Instrukcje (PDF)</Label>
                    {product.instructions_url ? (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">Dodano</span>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(product.id, file, 'instructions');
                          }}
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          disabled={uploadingFiles[product.id + 'instructions']}
                          type="button"
                          onClick={(e) => {
                            e.currentTarget.previousElementSibling?.querySelector('input')?.click();
                          }}
                        >
                          {uploadingFiles[product.id + 'instructions'] ? (
                            'Uploading...'
                          ) : (
                            <>
                              <Upload className="h-3 w-3 mr-1" />
                              Upload PDF
                            </>
                          )}
                        </Button>
                      </label>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs mb-2 block">Obraz podglądowy</Label>
                    {product.preview_image_url ? (
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">Dodano</span>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(product.id, file, 'preview');
                          }}
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          disabled={uploadingFiles[product.id + 'preview']}
                          type="button"
                          onClick={(e) => {
                            e.currentTarget.previousElementSibling?.querySelector('input')?.click();
                          }}
                        >
                          {uploadingFiles[product.id + 'preview'] ? (
                            'Uploading...'
                          ) : (
                            <>
                              <Upload className="h-3 w-3 mr-1" />
                              Upload IMG
                            </>
                          )}
                        </Button>
                      </label>
                    )}
                  </div>
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Nie masz jeszcze żadnych automatyzacji
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Dodaj swoją pierwszą automatyzację
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperDashboard;
