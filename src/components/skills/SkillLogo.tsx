import type { IconType } from "react-icons";
import { useState } from "react";
import {
  SiAnthropic,
  SiAstro,
  SiBootstrap,
  SiCodeigniter,
  SiGithub,
  SiGithubcopilot,
  SiHostinger,
  SiInertia,
  SiJavascript,
  SiJquery,
  SiLaravel,
  SiMysql,
  SiOpenai,
  SiPhp,
  SiReact,
  SiShopify,
  SiSqlite,
  SiStripe,
  SiSwagger,
  SiTailwindcss,
  SiWindsurf,
  SiWordpress,
} from "react-icons/si";

type LogoEntry =
  | { kind: "icon"; Icon: IconType; color: string }
  | { kind: "image"; src: string; alt: string };

const SKILL_LOGOS: Record<string, LogoEntry> = {
  JavaScript: { kind: "icon", Icon: SiJavascript, color: "#F7DF1E" },
  React: { kind: "icon", Icon: SiReact, color: "#61DAFB" },
  Tailwind: { kind: "icon", Icon: SiTailwindcss, color: "#06B6D4" },
  Bootstrap: { kind: "icon", Icon: SiBootstrap, color: "#7952B3" },
  jQuery: { kind: "icon", Icon: SiJquery, color: "#0769AD" },
  PHP: { kind: "icon", Icon: SiPhp, color: "#777BB4" },
  Laravel: { kind: "icon", Icon: SiLaravel, color: "#FF2D20" },
  CodeIgniter: { kind: "icon", Icon: SiCodeigniter, color: "#EF4223" },
  "Inertia.js": { kind: "icon", Icon: SiInertia, color: "#9553E9" },
  Astro: { kind: "icon", Icon: SiAstro, color: "#BC52EE" },
  "REST APIs": { kind: "icon", Icon: SiSwagger, color: "#85EA2D" },
  MySQL: { kind: "icon", Icon: SiMysql, color: "#4479A1" },
  SQLite: { kind: "icon", Icon: SiSqlite, color: "#003B57" },
  WordPress: { kind: "icon", Icon: SiWordpress, color: "#21759B" },
  Shopify: { kind: "icon", Icon: SiShopify, color: "#7AB55C" },
  "Microsoft CRM": {
    kind: "image",
    src: "https://cdn.simpleicons.org/microsoftdynamics365/002050",
    alt: "Microsoft CRM",
  },
  "Pixxi CRM": {
    kind: "image",
    src: "https://www.pixxicrm.com/favicon.ico",
    alt: "Pixxi CRM",
  },
  GitHub: { kind: "icon", Icon: SiGithub, color: "#FFFFFF" },
  AWS: {
    kind: "image",
    src: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
    alt: "AWS",
  },
  Hostinger: { kind: "icon", Icon: SiHostinger, color: "#673DE6" },
  HostGator: {
    kind: "image",
    src: "https://cdn.simpleicons.org/hostgator/1F93D3",
    alt: "HostGator",
  },
  Stripe: { kind: "icon", Icon: SiStripe, color: "#635BFF" },
  Geidea: {
    kind: "image",
    src: "https://www.geidea.net/hubfs/raw_assets/public/Geidea_2023/images/geidea-logo.svg",
    alt: "Geidea",
  },
  Codex: { kind: "icon", Icon: SiOpenai, color: "#412991" },
  OpenCode: {
    kind: "image",
    src: "https://opencode.ai/favicon.ico",
    alt: "OpenCode",
  },
  Antigravity: {
    kind: "image",
    src: "https://cdn.simpleicons.org/google/4285F4",
    alt: "Antigravity",
  },
  Cursor: {
    kind: "image",
    src: "https://cdn.simpleicons.org/cursor/FFFFFF",
    alt: "Cursor",
  },
  Claude: { kind: "icon", Icon: SiAnthropic, color: "#D97757" },
  Kimi: {
    kind: "image",
    src: "https://www.kimi.com/favicon.ico",
    alt: "Kimi",
  },
  Windsurf: { kind: "icon", Icon: SiWindsurf, color: "#0B7DFF" },
  "GitHub Copilot": { kind: "icon", Icon: SiGithubcopilot, color: "#FFFFFF" },
};

type SkillLogoProps = {
  name: string;
  className?: string;
};

function SkillLogoFallback({ name, className }: SkillLogoProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg bg-white/10 text-[10px] font-semibold uppercase text-white/70 ${className}`}
      aria-hidden
    >
      {name.slice(0, 2)}
    </span>
  );
}

export function SkillLogo({ name, className = "h-8 w-8" }: SkillLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const logo = SKILL_LOGOS[name];

  if (!logo || (logo.kind === "image" && imageFailed)) {
    return <SkillLogoFallback name={name} className={className} />;
  }

  if (logo.kind === "image") {
    return (
      <img
        src={logo.src}
        alt=""
        aria-hidden
        className={`${className} object-contain`}
        loading="lazy"
        decoding="async"
        onError={() => setImageFailed(true)}
      />
    );
  }

  const { Icon, color } = logo;
  return <Icon className={className} style={{ color }} aria-hidden />;
}
