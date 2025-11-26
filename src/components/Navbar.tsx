import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import logo from "@/assets/mercuryhub-logo.png";

export const Navbar = () => {
  const { user, hasRole, signOut } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="MercuryHub" className="h-14" />
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/marketplace">
                  <Button variant="ghost">Marketplace</Button>
                </Link>
                {hasRole('developer') ? (
                  <Link to="/developer">
                    <Button variant="ghost" className="relative">
                      Panel Developera
                      <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                        DEV
                      </span>
                    </Button>
                  </Link>
                ) : hasRole('customer') && (
                  <Link to="/dashboard">
                    <Button variant="ghost">Moje Zakupy</Button>
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
