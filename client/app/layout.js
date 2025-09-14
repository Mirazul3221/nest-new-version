import { Inter } from "next/font/google";
import "./globals.css";
import DataProvider from "./global/DataProvider";
import SocketProvider from "./userdashboard/global/SocketProvider";
import AdScript from "./components/googleAds/AddScript";
import Script from "next/script";
import GlobalDataProvider from "./userdashboard/global/globalDataProvider.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: 'Eduplusplus online mcq sharing application',
    template: '%s - online mcq sharing application',
  },
  description:
    'This is the best platform to help you enhance your skills, expand your knowledge, and prepare for BCS and other exams.',
  openGraph: {
    title: 'Eduplusplus - online mcq sharing application',
    description:
      'This is the best platform to help you enhance your skills, expand your knowledge, and prepare for BCS and other exams.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduplusplus - online mcq sharing application',
    description:
      'This is the best platform to help you enhance your skills, expand your knowledge, and prepare for BCS and other exams.',
  },
  other: {
    keywords:
      'bcs preparation, online bcs preparation, job prostuti, bcs prostuti, bcs help',
  },

  // 🟢 PWA-related metadata
  manifest: '/manifest.json',
  themeColor: '#000000',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Eduplusplus', // 🔥 This is the title users see when they install as a PWA
  },
};


export default function RootLayout({ children }) {
  return (
    <html className="select-none" lang="en">
      <body className="font-sans bg-[#F2F2FC]">
                {/* ✅ MathJax config */}
        <Script id="mathjax-config" strategy="beforeInteractive">
          {`
            window.MathJax = {
              tex: {
                inlineMath: [['\\\\(', '\\\\)']],
                displayMath: [['\\\\[', '\\\\]'], ['$$', '$$']]
              },
              svg: {
                fontCache: 'global'
              }
            };
          `}
        </Script>

        {/* ✅ Load MathJax script */}
        <Script
          id="mathjax-script"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
          async
          strategy="beforeInteractive"
        />
        <DataProvider>
          <SocketProvider>
            <GlobalDataProvider>
              <div className="min-h-screen w-full">
                <div className="max-w-[1440px] w-full mx-auto">{children}</div>
              </div>
            </GlobalDataProvider>
          </SocketProvider>
        </DataProvider>
      </body>
    </html>
  );
}