import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Nieprawidłowy adres email" }),
  password: z.string()
    .min(8, { message: "Hasło musi mieć minimum 8 znaków" })
    .max(72, { message: "Hasło może mieć maksymalnie 72 znaki" })
    .regex(/[a-z]/, { message: "Hasło musi zawierać małą literę" })
    .regex(/[A-Z]/, { message: "Hasło musi zawierać wielką literę" })
    .regex(/[0-9]/, { message: "Hasło musi zawierać cyfrę" }),
});

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    // Check for existing session and redirect to dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Podaj adres email");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-reset-code", {
        body: { email },
      });

      if (error) {
        toast.error("Błąd podczas wysyłania kodu: " + error.message);
      } else {
        toast.success("Kod resetowania został wysłany na Twój email!");
        setCodeSent(true);
      }
    } catch (error) {
      toast.error("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetCode || resetCode.length !== 6) {
      toast.error("Podaj 6-cyfrowy kod");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Hasła nie są identyczne");
      return;
    }

    // Validate password
    const validation = authSchema.safeParse({ email: "dummy@email.com", password });
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      if (firstError.path[0] === 'password') {
        toast.error(firstError.message);
        return;
      }
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-reset-code", {
        body: { 
          email,
          code: resetCode,
          newPassword: password 
        },
      });

      if (error || data?.error) {
        toast.error(data?.error || "Nieprawidłowy kod");
      } else {
        toast.success("Hasło zostało zmienione! Możesz się teraz zalogować.");
        setIsResettingPassword(false);
        setCodeSent(false);
        setResetCode("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
      }
    } catch (error) {
      toast.error("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input with zod
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              is_developer: isDeveloper, // Store in metadata for trigger
            }
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Ten email jest już zarejestrowany");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Konto utworzone! Możesz się teraz zalogować.");
          setIsSignUp(false);
          setPassword("");
          setIsDeveloper(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Nieprawidłowy email lub hasło");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Zalogowano pomyślnie!");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background -z-10" />
      
      <Card className="w-full max-w-md p-8 card-gradient border-primary/20">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="p-2 rounded-lg bg-primary/10 glow-effect">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-bold text-gradient">MercuryHub</span>
        </Link>

        <h2 className="text-3xl font-bold mb-2 text-center">
          {isResettingPassword 
            ? "Resetuj hasło" 
            : isSignUp 
            ? "Utwórz konto" 
            : "Zaloguj się"}
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          {isResettingPassword
            ? codeSent 
              ? "Wprowadź kod i ustaw nowe hasło"
              : "Wyślemy Ci kod na email"
            : isSignUp
            ? "Rozpocznij automatyzację już dziś"
            : "Witaj z powrotem!"}
        </p>

        {isResettingPassword ? (
          !codeSent ? (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="twoj@email.pl"
                  required
                />
              </div>

              <Button type="submit" className="w-full glow-effect" disabled={loading}>
                {loading ? "Wysyłanie..." : "Wyślij kod"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsResettingPassword(false)}
                  className="text-primary hover:underline text-sm"
                >
                  Powrót do logowania
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <Label htmlFor="reset-code">Kod z emaila</Label>
                <Input
                  id="reset-code"
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  required
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Wprowadź 6-cyfrowy kod wysłany na email
                </p>
              </div>

              <div>
                <Label htmlFor="new-password">Nowe hasło</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Min. 8 znaków, mała i wielka litera, cyfra
                </p>
              </div>

              <div>
                <Label htmlFor="confirm-new-password">Potwierdź hasło</Label>
                <div className="relative">
                  <Input
                    id="confirm-new-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full glow-effect" disabled={loading}>
                {loading ? "Weryfikacja..." : "Zmień hasło"}
              </Button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setCodeSent(false);
                    setResetCode("");
                  }}
                  className="text-primary hover:underline text-sm block w-full"
                >
                  Wyślij kod ponownie
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsResettingPassword(false);
                    setCodeSent(false);
                    setResetCode("");
                  }}
                  className="text-muted-foreground hover:text-primary text-sm block w-full"
                >
                  Powrót do logowania
                </button>
              </div>
            </form>
          )
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Hasło</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="developer"
                checked={isDeveloper}
                onCheckedChange={(checked) => setIsDeveloper(checked === true)}
              />
              <Label
                htmlFor="developer"
                className="text-sm font-normal cursor-pointer"
              >
                Zarejestruj mnie jako developer (mogę dodawać produkty)
              </Label>
            </div>
          )}

          <Button type="submit" className="w-full glow-effect" disabled={loading}>
            {loading ? "Ładowanie..." : isSignUp ? "Zarejestruj się" : "Zaloguj"}
          </Button>

          {!isSignUp && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsResettingPassword(true)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Zapomniałeś hasła?
              </button>
            </div>
          )}
        </form>
        )}

        {!isResettingPassword && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline"
            >
              {isSignUp
                ? "Masz już konto? Zaloguj się"
                : "Nie masz konta? Zarejestruj się"}
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Auth;
