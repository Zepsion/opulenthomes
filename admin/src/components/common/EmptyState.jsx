const EmptyState = ({ title = "Nothing here yet", description, action }) => (
  <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-charcoal-200 bg-white px-6 py-16 text-center">
    <h3 className="font-display text-xl text-charcoal-900">{title}</h3>
    {description && <p className="max-w-sm text-sm text-charcoal-500">{description}</p>}
    {action}
  </div>
);

export default EmptyState;
