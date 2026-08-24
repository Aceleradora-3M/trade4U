import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { Link } from "@/i18n/navigation";

interface CommonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    external?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-smooth focus:outline-none focus:ring-2 focus:ring-accent/50";

const variants = {
  primary:
    "bg-gradient-cta text-white shadow-glow hover:scale-[1.03]",
  secondary:
    "border border-border bg-card/60 backdrop-blur text-foreground hover:border-accent/40",
  outline:
    "border border-accent/40 text-accent hover:bg-accent/10",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
  } = props;

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { variant: _v, size: _s, href, external, children: _c, className: _cn, ...anchorProps } = props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClass} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, external: _e, className: _cn, children: _c, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={combinedClass} {...buttonProps}>
      {children}
    </button>
  );
}
