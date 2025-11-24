import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Zap } from "lucide-react";

export const Navbar = () => {
  const { user, hasRole, signOut } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 glow-effect">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-gradient">HermesHub</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/marketplace">
                  <Button variant="ghost">Marketplace</Button>
                </Link>
                {hasRole('customer') && (
                  <Link to="/dashboard">
                    <Button variant="ghost">Moje Zakupy</Button>
                  </Link>
                )}
                {hasRole('developer') && (
                  <Link to="/developer">
                    <Button variant="ghost" className="relative">
                      Panel Developera
                      <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                        DEV
                      </span>
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button variant="outline" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Wyloguj
                </Button>
              </>
            ) : (
              <>
                <Link to="/marketplace">
                  <Button variant="ghost">Marketplace</Button>
                </Link>
                <Link to="/auth">
                  <Button variant="ghost">Zaloguj</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button className="glow-effect">Zarejestruj się</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
