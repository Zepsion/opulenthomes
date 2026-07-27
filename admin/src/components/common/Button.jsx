import { forwardRef } from "react";

const VARIANTS = {
  gold: "bg-gold-500 text-charcoal-900 hover:bg-gold-300",
  dark: "bg-charcoal-900 text-white hover:bg-charcoal-700",
  ghost: "bg-transparent text-charcoal-700 border border-charcoal-200 hover:border-gold-500",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const SIZES = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
};

const Button = forwardRef(
  ({ children, variant = "dark", size = "md", className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
export default Button;
