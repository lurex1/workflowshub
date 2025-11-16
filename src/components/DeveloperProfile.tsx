import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Camera, Globe, Github, Linkedin, Twitter, MapPin, Pencil } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileData {
  avatar_url: string | null;
  display_name: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
}

export const DeveloperProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    avatar_url: null,
    display_name: null,
    bio: null,
    location: null,
    website: null,
    github_url: null,
    linkedin_url: null,
    twitter_url: null,
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error loading profile:", error);
      return;
    }

    if (data) {
      setProfile({
        avatar_url: data.avatar_url,
        display_name: data.display_name,
        bio: data.bio,
        location: data.location,
        website: data.website,
        github_url: data.github_url,
        linkedin_url: data.linkedin_url,
        twitter_url: data.twitter_url,
      });
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return;

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    setUploading(true);

    try {
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setProfile({ ...profile, avatar_url: publicUrl });
      toast.success("Zdjęcie profilowe zaktualizowane!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Błąd podczas przesyłania zdjęcia");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("id", user.id);

    if (error) {
      toast.error("Błąd podczas zapisywania profilu");
      return;
    }

    toast.success("Profil zaktualizowany!");
    setIsEditing(false);
  };

  const getInitials = () => {
    if (profile.display_name) {
      return profile.display_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0].toUpperCase() || "D";
  };

  return (
    <Card className="p-6 card-gradient border-primary/20">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-bold text-gradient">Profil Developera</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          {isEditing ? "Anuluj" : "Edytuj"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src={profile.avatar_url || ""} />
              <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <label className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4 text-primary-foreground" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
              </label>
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <Label>Wyświetlana nazwa</Label>
                <Input
                  value={profile.display_name || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, display_name: e.target.value })
                  }
                  placeholder="Jan Kowalski"
                />
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold">
                  {profile.display_name || user?.email}
                </h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div className="space-y-2">
          <Label>O mnie</Label>
          {isEditing ? (
            <Textarea
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Opowiedz o sobie, swoim doświadczeniu i specjalizacji..."
              rows={4}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              {profile.bio || "Brak opisu"}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Lokalizacja
          </Label>
          {isEditing ? (
            <Input
              value={profile.location || ""}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
              placeholder="Warszawa, Polska"
            />
          ) : (
            profile.location && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </p>
            )
          )}
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <Label>Linki społecznościowe</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Website */}
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Website
              </Label>
              {isEditing ? (
                <Input
                  value={profile.website || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, website: e.target.value })
                  }
                  placeholder="https://twoja-strona.pl"
                />
              ) : (
                profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <Globe className="w-3 h-3" />
                    {profile.website}
                  </a>
                )
              )}
            </div>

            {/* GitHub */}
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Github className="w-3 h-3" />
                GitHub
              </Label>
              {isEditing ? (
                <Input
                  value={profile.github_url || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, github_url: e.target.value })
                  }
                  placeholder="https://github.com/username"
                />
              ) : (
                profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <Github className="w-3 h-3" />
                    {profile.github_url}
                  </a>
                )
              )}
            </div>

            {/* LinkedIn */}
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                LinkedIn
              </Label>
              {isEditing ? (
                <Input
                  value={profile.linkedin_url || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, linkedin_url: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/username"
                />
              ) : (
                profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <Linkedin className="w-3 h-3" />
                    {profile.linkedin_url}
                  </a>
                )
              )}
            </div>

            {/* Twitter */}
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Twitter className="w-3 h-3" />
                Twitter/X
              </Label>
              {isEditing ? (
                <Input
                  value={profile.twitter_url || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, twitter_url: e.target.value })
                  }
                  placeholder="https://twitter.com/username"
                />
              ) : (
                profile.twitter_url && (
                  <a
                    href={profile.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <Twitter className="w-3 h-3" />
                    {profile.twitter_url}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <Button onClick={handleSaveProfile} className="w-full">
            Zapisz zmiany
          </Button>
        )}
      </div>
    </Card>
  );
};
