import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "http://localhost:54321", // "https://kind-coyote-refined.ngrok-free.app" http://localhost:54321
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU",
  {
    auth: {
      persistSession: true,
      storage: window.localStorage,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  }
);

export default supabase;
