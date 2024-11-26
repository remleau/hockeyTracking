import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Home,
  Plus,
  Settings,
  BarChart,
  WalletMinimal,
  X,
  HousePlus,
  Bandage,
  PiggyBank,
  ShieldPlus,
} from "lucide-react"; // Example icons

function Footer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const navigate = useNavigate();

  return (
    <>
      <footer className="w-full h-16 bg-white border-t border-gray-200 p-0 fixed bottom-0 flex justify-between items-center">
        {/* Home Button */}
        <Button
          variant="ghost"
          className="flex-1 h-full flex flex-col items-center justify-center"
          onClick={() => navigate("/")}
        >
          <Home className="w-10 h-10" />
          <span className="text-xs">Home</span>
        </Button>

        {/* Stats Button */}
        <Button
          variant="ghost"
          className="flex-1 h-full flex flex-col items-center justify-center"
          onClick={() => navigate("/stats")}
        >
          <BarChart />
          <span className="text-xs">Stats</span>
        </Button>

        {/* Add Button */}
        <div className="relative z-10">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger
              variant="default"
              className="w-16 h-16 rounded-full bg-primary text-white shadow-lg flex items-center justify-center -translate-y-6"
            >
              <Plus />
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>What would you like to add?</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Add Match */}
                    <Button
                      className="h-24 flex flex-col items-center justify-center"
                      variant="outline"
                      onClick={() => {
                        setIsDrawerOpen(false);
                        navigate("/addMatch");
                      }}
                    >
                      <Bandage />
                      Match
                    </Button>

                    {/* Add Expense */}
                    <Button
                      className="h-24 flex flex-col items-center justify-center"
                      variant="outline"
                    >
                      <PiggyBank />
                      Expense
                    </Button>

                    {/* Add arena */}
                    <Button
                      className="h-24 flex flex-col items-center justify-center"
                      variant="outline"
                    >
                      <HousePlus />
                      Arena
                    </Button>

                    {/* Add Other */}
                    <Button
                      className="h-24 flex flex-col items-center justify-center"
                      variant="outline"
                    >
                      <ShieldPlus />
                      Team
                    </Button>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="default">
                      <X /> Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Expenses Button */}
        <Button
          variant="ghost"
          className="flex-1 h-full flex flex-col items-center justify-center"
          onClick={() => navigate("/expenses")}
        >
          <WalletMinimal />
          <span className="text-xs">Expenses</span>
        </Button>

        {/* Settings Button */}
        <Button
          variant="ghost"
          className="flex-1 h-full flex flex-col items-center justify-center"
          onClick={() => navigate("/settings")}
        >
          <Settings />
          <span className="text-xs">Settings</span>
        </Button>
      </footer>
    </>
  );
}

export default Footer;
