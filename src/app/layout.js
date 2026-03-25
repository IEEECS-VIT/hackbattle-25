
import './globals.css';
import { Press_Start_2P } from 'next/font/google';
import Script from "next/script";
import SmoothScroll from "./SmoothScroll.js";
import CustomCursor from './components/Cursor';
import Toast from "./components/Toast";

export const metadata = { 
  title: 'Internal Hack 2026', 
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
  ],
  description: 'Internal Hack, organized by IEEE Computer Society (IEEE CS), is a dynamic hackathon that brings together innovators, passionate creators, and problem-solvers under one roof. More than a coding marathon, it is a transformative journey where participants push the limits of creativity, technology, and teamwork. nals work tirelessly to turn ideas into reality, tackling real-world problem statements that demand innovative and practical solutions. Teams ideate, design, and build projects that not only highlight technical excellence but also create meaningful social impact.' 
};

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press2p',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={pressStart2P.className}>
        {/* <SmoothScroll> */}
        <Toast />
          {children}
        {/* </SmoothScroll> */}
        <CustomCursor />
      
      </body>
    </html>
  );
}
