const EmptyState = ({ title = "Nothing here yet", description, action }) => (
  <div className="flex flex-col items-center gap-4 rounded-2xl border border-charcoal-900/10 bg-white/60 px-6 py-20 text-center">
    <span className="h-px w-10 bg-gold-500" />
    <h3 className="font-display text-2xl text-charcoal-900">{title}</h3>
    {description && <p className="max-w-md text-sm text-charcoal-500">{description}</p>}
    {action}
  </div>
);

export default EmptyState;
