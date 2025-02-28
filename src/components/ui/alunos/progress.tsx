export function Progress({ value, className }: { value: number; className?: string }) {
    return (
      <div className={`w-full bg-blue-200 dark:bg-gray-700 rounded-full h-4 ${className}`}>
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  }
  