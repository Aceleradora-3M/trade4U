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
  "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50";

const variants = {
  primary:
    "bg-accent hover:bg-accent-glow text-accent-foreground shadow-lg shadow-accent/25 hover:shadow-accent/40",
  secondary:
    "bg-white/10 hover:bg-white/20 text-white border border-white/20",
  outline:
    "border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
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
