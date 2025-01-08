import LogoutButton from "@/components/LogoutButton";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { AlignJustify, HousePlus, House, Shield, Bandage } from "lucide-react";

function Header() {
  return (
    <header className="w-full h-14 bg-white border-b border-gray-200 fixed top-0 flex justify-between items-center">
      {/* App Name */}
      <div className="ml-4 text-lg font-semibold text-gray-800">Acme Inc</div>
      <div className="flex align-center">
        <div>
          <Avatar className="w-6 h-6 mr-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <Sheet>
          <SheetTrigger className="mr-4">
            <AlignJustify size={25} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left mb-2">Menu</SheetTitle>
              <SheetDescription>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    className="h-24 flex flex-col items-center justify-center"
                    variant="secondary"
                  >
                    <Bandage />
                    My matchs
                  </Button>
                  <Button
                    className="h-24 flex flex-col items-center justify-center"
                    variant="secondary"
                  >
                    <Shield />
                    My teams
                  </Button>
                  <Button
                    className="h-24 flex flex-col items-center justify-center"
                    variant="secondary"
                  >
                    <House />
                    My arenas
                  </Button>
                </div>
                <LogoutButton />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
