import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

/** Chrome shared by every regular site page (not the standalone VSL page). */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <LanguageSwitcher />
    </>
  );
}
