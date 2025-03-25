export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
      <div className="bg-white dark:bg-black rounded-xl shadow-md p-3 ${className} w-full" >
        {children}
      </div>
    );
  }
  
  export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="p-1">{children}</div>;
  }