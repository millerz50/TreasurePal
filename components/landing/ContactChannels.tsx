"use client";

import { Github, Globe, Linkedin, MessageCircle } from "lucide-react";

export default function FloatingContactWidget() {
  const links = [
    {
      id: "whatsapp",
      href: "https://wa.me/263771234567",
      icon: MessageCircle,
      label: "WhatsApp",
      bg: "bg-green-500 hover:bg-green-600 dark:hover:bg-green-400",
    },
    {
      id: "linkedin",
      href: "https://linkedin.com/in/treasurepal",
      icon: Linkedin,
      label: "LinkedIn",
      bg: "bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600",
    },
    {
      id: "github",
      href: "https://github.com/treasurepal",
      icon: Github,
      label: "GitHub",
      bg: "bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700",
    },
    {
      id: "website",
      href: "/help",
      icon: Globe,
      label: "Online Help",
      bg: "bg-purple-600 hover:bg-purple-700 dark:hover:bg-purple-500",
    },
  ];

  return (
    <aside className="fixed right-4 bottom-24 z-50 flex flex-col gap-4">
      {links.map(({ id, href, icon: Icon, label, bg }) => (
        <a
          key={id}
          href={href}
          target={id === "website" ? "_self" : "_blank"}
          rel={id === "website" ? undefined : "noopener noreferrer"}
          aria-label={`Contact via ${label}`}
          className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 ${bg}`}>
          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
        </a>
      ))}
    </aside>
  );
}
