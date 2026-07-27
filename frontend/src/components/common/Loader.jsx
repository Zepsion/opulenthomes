const Loader = ({ label = "Loading" }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20">
    <span className="h-10 w-10 animate-spin rounded-full border-2 border-charcoal-900/10 border-t-gold-500" />
    <span className="text-xs uppercase tracking-widest2 text-charcoal-500">{label}</span>
  </div>
);

export default Loader;
