import { Inter } from "next/font/google";
import "./globals.css";
import DataProvider from "./global/DataProvider";
import Head from "next/head";
import SocketProvider from "./userdashboard/global/SocketProvider";
import MessageProvider from "./userdashboard/global/messageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default :'BCS preparation online',
    // template:'$s - BCS preparation online platform',
  },
  keywords:['bcs preparation','online bcs preparation','job prostuti','bcs prostuti','bcs help'],
  description: "  This is the best platform to help you enhance your skills, expand your knowledge and prepare for BCS and other exam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
