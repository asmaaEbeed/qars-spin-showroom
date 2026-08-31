export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 border border-gray-200 rounded-xl bg-white/50 h-full">
      <div className="h-20 w-20 bg-secondary-100 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-secondary-700 mb-2">
        {title}
      </h3>

      <p className="text-secondary-500 mb-6 text-center">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}