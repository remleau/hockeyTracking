import LogoutButton from "@/components/LogoutButton";

function Header() {
  return (
    <header className="w-full h-14 bg-white border-b border-gray-200 fixed top-0 flex justify-between items-center">
      {/* App Name */}
      <div className="ml-4 text-lg font-semibold text-gray-800">Acme Inc</div>

      <LogoutButton />
    </header>
  );
}

export default Header;
