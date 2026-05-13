import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { LiquidGlassProvider } from "@/components/ui/LiquidGlass";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollTrail } from "@/components/ui/ScrollTrail";
import { NavIsland } from "@/components/layout/NavIsland";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { AnniversaryIntro } from "@/components/ui/AnniversaryIntro";

export const metadata: Metadata = {
  title: "Prodb - A solução em nuvem que impulsiona o seu sucesso",
  description:
    "Simplifique operações, aumente a segurança dos seus dados e escale seu negócio com tecnologia em nuvem sob medida para você.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/models/logo-prodb-3d.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body>
        <LoadingScreen />
        <AnniversaryIntro />
        <LiquidGlassProvider>
          <LenisProvider>
            <CustomCursor />
            <ScrollTrail />
            <NavIsland />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </LiquidGlassProvider>
      </body>
    </html>
  );
}
