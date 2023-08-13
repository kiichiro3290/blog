import "@/styles/globals.css";
import Meta from "@/components/meta";

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
      <body>{children}</body>
    </html>
  );
}
