import { forwardRef } from "react";
import Link from "next/link";

const VARIANTS = {
  gold: "bg-gold-500 text-charcoal-900 hover:bg-gold-300 focus-visible:bg-gold-300",
  dark: "bg-charcoal-900 text-ivory hover:bg-charcoal-700 focus-visible:bg-charcoal-700",
  ghost:
    "bg-transparent text-charcoal-900 border border-charcoal-900/20 hover:border-gold-500 hover:text-gold-700",
  ghostLight:
    "bg-transparent text-ivory border border-ivory/30 hover:border-gold-500 hover:text-gold-300",
};

const SIZES = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef(
  ({ children, variant = "gold", size = "md", href, className = "", external, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-300 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

    if (href && external) {
      return (
        <a href={href} className={classes} ref={ref} target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      );
    }

    if (href) {
      return (
        <Link href={href} className={classes} ref={ref} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
