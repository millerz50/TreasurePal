"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function FooterSocial() {
  return (
    <>
      <div className="flex items-center gap-3 mt-2">
        <SocialIcon
          href="#"
          label="Facebook"
          Icon={Facebook}
          color="text-[#1877F2]"
        />
        <SocialIcon
          href="#"
          label="Twitter"
          Icon={Twitter}
          color="text-[#1DA1F2]"
        />
        <SocialIcon
          href="#"
          label="Instagram"
          Icon={Instagram}
          color="text-current"
        />
        <SocialIcon
          href="#"
          label="LinkedIn"
          Icon={Linkedin}
          color="text-[#0A66C2]"
        />
      </div>

      <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-500" />
          <span>Harare, Zimbabwe</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-slate-500" />
          <a href="tel:+263777768431" className="hover:underline">
            +263 7777 68431
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-slate-500" />
          <a
            href="mailto:hello@treasurepal.example"
            className="hover:underline"
          >
            hello@millerz.co.zw
          </a>
        </div>
      </div>
    </>
  );
}

function SocialIcon({
  href,
  label,
  Icon,
  color,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  color?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`w-10 h-10 rounded-full border flex items-center justify-center transition hover:bg-accent/10`}
      title={label}
    >
      <Icon className={`w-5 h-5 ${color}`} />
    </Link>
  );
}
