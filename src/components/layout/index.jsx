import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "@/lib/SessionWrapper"; // Update the import path as necessary

import { ScrollArea } from "@/components/ui/scroll-area";

import Header from "@/components/header";
import Footer from "@/components/footer";

function Layout() {
  const { session } = useAuth();

  if (!session) return <Navigate to={"/login"} />;

  return (
    <main className="min-h-screen flex flex-col flex-center bg-gray-100">
      <Header />
      <section className="flex-1 flex flex-col ml-4 mr-4 pt-14 pb-16 overflow-auto">
        <ScrollArea className="container w-[100%]">
          <Outlet />
        </ScrollArea>
      </section>
      <Footer />
    </main>
  );
}

export default Layout;
