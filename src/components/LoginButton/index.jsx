import { useAuth } from "@/lib/SessionWrapper"; // Adjust import path as needed
import supabase from "@/lib/supabase";

import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  const { session } = useAuth();

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/login`, // Specify the callback URL
      },
    });

    if (error) {
      alert(error?.message);
    }
  };

  return (
    !session && (
      <Button onClick={() => handleGoogleSignIn()}>
        <LogIn className="w-5 h-5" />
        <span className="text-sm">Login</span>
      </Button>
    )
  );
}
