const TONES = {
  gold: "bg-gold-50 text-gold-700",
  green: "bg-emerald-50 text-emerald-700",
  red: "bg-red-50 text-red-700",
  gray: "bg-charcoal-50 text-charcoal-500",
  blue: "bg-blue-50 text-blue-700",
};

const Badge = ({ children, tone = "gray" }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${TONES[tone]}`}>
    {children}
  </span>
);

export default Badge;
