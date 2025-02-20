import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-8 py-8">{children}</main>
      <Footer />
    </div>
  );
}
