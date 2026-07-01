import { Footer } from "@/components/layout/Footer";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <NavbarWrapper />
      {children}
      <Footer />
    </div>
  );
}

