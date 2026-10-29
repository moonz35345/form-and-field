import Link from "next/link";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Page not found | Form & Field",
  robots: { index: false, follow: true },
};
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="shell page-intro">
          <p className="eyebrow">404</p>
          <h1>
            Let’s find your
            <br />
            <em>way home.</em>
          </h1>
          <p>The page you are looking for isn’t here.</p>
          <Link href="/" className="button">
            Back to home ↗
          </Link>
        </main>
      </body>
    </html>
  );
}
