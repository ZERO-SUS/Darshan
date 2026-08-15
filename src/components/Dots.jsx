export default function Dots({ className = "" }) {
  const rows = 5;
  const cols = 5;

  return (
    <div className={`flex flex-col justify-between ${className}`}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex justify-between w-full">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="w-1 h-1 bg-gray opacity-50"
              style={{ borderRadius: '50%' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
