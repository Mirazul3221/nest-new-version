import { Inter } from "next/font/google";
import "./globals.css";
import DataProvider from "./global/DataProvider";
import SocketProvider from "./userdashboard/global/SocketProvider";
import MessageProvider from "./userdashboard/global/messageProvider";
import AdScript from "./components/googleAds/AddScript";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: {
//     default: 'BCS Preparation Online',
//     template: '%s - BCS Preparation Online Platform',
//   },
//   description:
//     'This is the best platform to help you enhance your skills, expand your knowledge, and prepare for BCS and other exams.',
//   openGraph: {
//     title: 'BCS Preparation Online',
//     description:
//       'This is the best platform to help you enhance your skills, expand your knowledge, and prepare for BCS and other exams.',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'BCS Preparation Online',
//     description:
//       'This is the best platform to help you enhance your skills, expand your knowledge, and prepare for BCS and other exams.',
//   },
//   other: {
//     keywords:
//       'bcs preparation, online bcs preparation, job prostuti, bcs prostuti, bcs help',
//   },
// };


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="google-adsense-account" content="ca-pub-8668385137041223"></meta>
      <body className={inter.className}>
         <DataProvider>
           <SocketProvider>
              <MessageProvider>
                  <div className="max-w-[1440px] mx-auto">{children}</div>
              </MessageProvider>
           </SocketProvider>
         </DataProvider>
        </body>
    </html>
  );
}
