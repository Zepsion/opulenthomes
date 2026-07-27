const PageHeader = ({ title, description, action }) => (
  <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
    <div>
      <h1 className="font-display text-2xl text-charcoal-900 sm:text-3xl">{title}</h1>
      {description && <p className="mt-1 text-sm text-charcoal-500">{description}</p>}
    </div>
    {action}
  </div>
);

export default PageHeader;
