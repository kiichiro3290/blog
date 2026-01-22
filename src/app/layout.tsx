import "@/styles/globals.css";
import Meta from "@/app/meta";
import Header from "@/components/header";

export const metadata = {
  title: "kai dev blog",
  description: "kai dev blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <Meta />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
