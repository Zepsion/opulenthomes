const ErrorState = ({ message = "Something went wrong loading this." }) => (
  <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-900/10 bg-red-50/50 px-6 py-16 text-center">
    <p className="text-sm text-charcoal-700">{message}</p>
  </div>
);

export default ErrorState;
