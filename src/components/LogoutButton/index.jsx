import { useAuth } from "@/lib/SessionWrapper"; // Adjust import path as needed
import supabase from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { session, setSession } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Call Supabase sign out
    setSession(null); // Update session state
    navigate("/login");
  };

  return (
    session && (
      <Button
        variant="ghost"
        className="h-full flex items-center justify-center gap-2 text-red-600"
        onClick={() => handleLogout()}
      >
        <LogOut className="w-5 h-5" />
        <span className="text-sm">Logout</span>
      </Button>
    )
  );
}
