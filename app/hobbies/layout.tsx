import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akash's Universe — Hobbies & Offline Quests",
  description:
    "Explore Akash Sharma's hobbies, gaming quests, chess tactics, feline companions, and culinary alchemy outside of code.",
};

export default function HobbiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
