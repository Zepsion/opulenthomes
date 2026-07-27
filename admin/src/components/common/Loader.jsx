const Loader = ({ label = "Loading" }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-charcoal-200 border-t-gold-500" />
    <span className="text-xs uppercase tracking-widest2 text-charcoal-500">{label}</span>
  </div>
);

export default Loader;
