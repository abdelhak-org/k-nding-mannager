import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-lg font-semibold text-foreground">
            K-nding Manager
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
