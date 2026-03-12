export default function LoadingSpinner({ className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-indigo-600 absolute top-0 left-0"></div>
      </div>
    </div>
  );
}
