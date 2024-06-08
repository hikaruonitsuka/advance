import './globals.css';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="grid min-h-screen grid-cols-[100%] grid-rows-[auto,1fr,auto] text-sm sm:text-base">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
