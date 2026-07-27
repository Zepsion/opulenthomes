const ErrorState = ({ message = "Something went wrong.", onRetry }) => (
  <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-100 bg-red-50/50 px-6 py-12 text-center">
    <p className="text-sm text-charcoal-700">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="text-xs font-semibold uppercase tracking-widest2 text-gold-700 hover:text-gold-500">
        Try again
      </button>
    )}
  </div>
);

export default ErrorState;
