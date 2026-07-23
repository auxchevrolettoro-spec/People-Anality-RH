import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "People Analytics RH", description: "Inteligencia de talento para decisiones humanas" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
