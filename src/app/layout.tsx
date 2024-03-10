import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GIGAI _ MODELS",
  description: "Explore the forefront of natural language processing with GigAI Models. Our innovative AI models are revolutionizing the way we interact with technology, making it more intuitive and accessible than ever before.",
  icons:"https://gigasoft.com.pl/logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
