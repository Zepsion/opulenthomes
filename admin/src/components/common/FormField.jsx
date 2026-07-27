import { forwardRef } from "react";

const fieldClasses =
  "w-full rounded-lg border border-charcoal-200 bg-white px-3.5 py-2.5 text-sm text-charcoal-900 transition-colors focus:border-gold-500 disabled:bg-charcoal-50";

export const FormField = forwardRef(({ label, error, className = "", ...props }, ref) => (
  <label className="flex flex-col gap-1.5">
    {label && <span className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">{label}</span>}
    <input ref={ref} className={`${fieldClasses} ${className}`} {...props} />
    {error && <span className="text-xs text-red-600">{error}</span>}
  </label>
));
FormField.displayName = "FormField";

export const FormTextarea = forwardRef(({ label, error, className = "", ...props }, ref) => (
  <label className="flex flex-col gap-1.5">
    {label && <span className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">{label}</span>}
    <textarea ref={ref} className={`${fieldClasses} ${className}`} {...props} />
    {error && <span className="text-xs text-red-600">{error}</span>}
  </label>
));
FormTextarea.displayName = "FormTextarea";

export const FormSelect = forwardRef(({ label, error, children, className = "", ...props }, ref) => (
  <label className="flex flex-col gap-1.5">
    {label && <span className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">{label}</span>}
    <select ref={ref} className={`${fieldClasses} ${className}`} {...props}>
      {children}
    </select>
    {error && <span className="text-xs text-red-600">{error}</span>}
  </label>
));
FormSelect.displayName = "FormSelect";
