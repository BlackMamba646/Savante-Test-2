import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar/navbar";
import Footer from "@/components/shared/footer/footer";
import Providers from "./providers";
import { APIService } from "@/services/api.service";
import { ENVIRONMENT } from "@/config/env.config";
import { crimsonText, plusJakartaSans } from "@/config/fonts";
import { HelpWidget } from "@/components/shared/help-widget/HelpWidget";
import Script from "next/script";

const title = "Savante Realty Dubai Real Estate Developer | New Projects UAE";
const description =
  "Discover Savante Realty Dubai real estate developer: premier new projects, off-plans & investment properties in UAE. Explore modern living & quality design today!";
const ogImage = "/images/og/banner-og.png";

export const metadata: Metadata = {
  metadataBase: new URL(ENVIRONMENT.OFFICIAL_WEBSITE_URL),
  title,
  description,
  icons: {
    icon: "https://savante.propphy.com/uploads/favicon_32x32_e99826ebd3.png",
    apple: "https://savante.propphy.com/uploads/favicon_32x32_e99826ebd3.png",
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: "Savante Realty",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const services = await APIService.findServices({
    fields: ["Title", "slug", "createdAt"],
    pagination: {
      pageSize: 10,
    },
    sort: ["createdAt:desc"],
  });

  const areas = await APIService.findAreas({
    fields: ["Area_name", "slug", "createdAt"],
    pagination: {
      pageSize: 5,
    },
    sort: "createdAt:desc",
  });

  const contactInfo = await APIService.findContactInfo();

  const projects = await APIService.findProjects({
    fields: ["Title", "slug", "createdAt"],
    pagination: {
      pageSize: 5,
      page: 1,
    },
    sort: "createdAt:asc",
  });

  return (
    <html lang="en-US">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5LS2JP6W');`}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C175XDT64H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C175XDT64H');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vgcxz5cqxr");
          `}
        </Script>
      </head>
      <body
        className={`relative antialiased light bg-accent-solid
          ${crimsonText.variable} ${plusJakartaSans.variable} font-plus`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LS2JP6W"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Navbar services={services} areas={areas.data} />
        <Providers>{children}</Providers>
        <Footer
          services={services}
          areas={areas.data}
          contact={contactInfo}
          projects={projects.data}
        />
        <HelpWidget contactInfo={contactInfo} />
        <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
