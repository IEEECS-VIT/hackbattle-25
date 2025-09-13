//import Chatbot from "./components/BotSidebar";
import './globals.css';
import { Press_Start_2P } from 'next/font/google';
import { Geist, Geist_Mono } from "next/font/google";

export const metadata = { 
  title: 'HackBattle 2025', 
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
  ],
  description: 'HackBattle, organized by IEEE Computer Society (IEEE CS), is a dynamic 36-hour hackathon that brings together innovators, passionate creators, and problem-solvers under one roof. More than a coding marathon, it is a transformative journey where participants push the limits of creativity, technology, and teamwork. Throughout this thrilling overnight experience, students and professionals work tirelessly to turn ideas into reality, tackling real-world problem statements that demand innovative and practical solutions. Teams ideate, design, and build projects that not only highlight technical excellence but also create meaningful social impact. What makes HackBattle unique is its balance of competition and collaboration. While teams aim to excel with their projects, the event also fosters a culture of knowledge-sharing and support. Participants engage with mentors, industry leaders, and experts to gain insights into emerging technologies, best practices, and career growth opportunities. Alongside the hackathon, workshops, tech talks, and panel discussions provide guidance and inspiration, encouraging participants to think bigger and bolder. HackBattle also serves as a networking platform, connecting aspiring innovators with peers, mentors, recruiters, and sponsors. At its heart, HackBattle celebrates innovation, teamwork, and the energy of technology, a space where ideas take flight and tomorrow’s leaders emerge.' 
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
      <body className={pressStart2P.className}>
        {children}
       {/* <Chatbot /> */}
      </body>
    </html>
  );
}

