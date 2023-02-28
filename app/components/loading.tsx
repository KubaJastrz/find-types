export function Flow() {
  return (
    <div className="inline-flex space-x-1.5" data-testid="loading">
      <div className="h-1.5 w-1.5 animate-flow-1 rounded-full"></div>
      <div className="h-1.5 w-1.5 animate-flow-2 rounded-full"></div>
      <div className="h-1.5 w-1.5 animate-flow-3 rounded-full"></div>
    </div>
  );
}
