type Grid = readonly (readonly (0 | 1)[])[];

const F: Grid = [
  [1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
];

const D: Grid = [
  [1, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 0],
];

function Letter({ grid }: { grid: Grid }) {
  return (
    <div className="flex flex-col gap-px">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-px">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`size-1.5 sm:size-2 ${cell ? "bg-paper/60" : "bg-transparent"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function PixelLogo() {
  return (
    <div
      className="flex items-start gap-1 sm:gap-1.5"
      role="img"
      aria-label="FD"
    >
      <Letter grid={F} />
      <Letter grid={D} />
    </div>
  );
}
