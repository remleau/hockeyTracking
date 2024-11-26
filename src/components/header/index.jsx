import LogoutButton from "@/components/LogoutButton";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";

function Header() {
  return (
    <header className="w-full h-14 bg-white border-b border-gray-200 fixed top-0 flex justify-between items-center">
      {/* App Name */}
      <div className="ml-4 text-lg font-semibold text-gray-800">Acme Inc</div>

      <Sheet>
        <SheetTrigger className="mr-4">
          <AlignJustify />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <LogoutButton />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Header;
