import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import AuthWrapper from "@/components/AuthWrapper";

export const metadata: Metadata = {
  title: "Legal Submission Automator",
  description: "Manage directory submissions and AI-drafting workflows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen overflow-x-hidden relative bg-white text-neutral-900 flex">
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 grid-pattern"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
        </div>

        <AuthProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
