export function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 w-11 max-2xl:mr-10 max-2xl:mt-2"
      >
        {children}
      </button>
    );
  }
  