"use client";

import { useRef, useState } from "react";

type ListedFile = {
  key: string;
  name: string;
};

type Props = {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  buttonLabel: string;
  hint: string;
  removeLabel?: string;
  files?: ListedFile[];
  onFilesSelected: (files: File[]) => void;
  onRemoveFile?: (index: number) => void;
  buttonClassName: string;
  faceClassName?: string;
  panelClassName?: string;
  listItemClassName?: string;
};

export default function FileDropzone({
  accept,
  multiple = false,
  disabled = false,
  buttonLabel,
  hint,
  removeLabel,
  files = [],
  onFilesSelected,
  onRemoveFile,
  buttonClassName,
  faceClassName = "",
  panelClassName = "",
  listItemClassName = "",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function commit(fileList: FileList | null) {
    const picked = Array.from(fileList ?? []);
    if (picked.length === 0 || disabled) return;
    onFilesSelected(picked);
  }

  const wrapperClass = panelClassName || "rounded-xl border border-paper/10 bg-paper/[0.02] p-4";
  const itemClass =
    listItemClassName ||
    "flex items-center justify-between gap-2 border border-paper/10 px-3 py-2 text-xs text-paper/65";

  return (
    <div className={`space-y-3 ${faceClassName}`.trim()}>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          commit(event.target.files);
          event.target.value = "";
        }}
      />

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragOver(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          commit(event.dataTransfer.files);
        }}
        className={`${wrapperClass} cursor-pointer transition-colors ${
          dragOver
            ? "border-term/50 bg-term/[0.06]"
            : "border-paper/10 bg-paper/[0.02] hover:border-paper/25"
        } ${disabled ? "pointer-events-none opacity-50" : ""}`}
      >
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            className={buttonClassName}
            onClick={(event) => event.preventDefault()}
          >
            {buttonLabel}
          </button>
          <p className="text-xs text-paper/45">{hint}</p>
        </div>
      </div>

      {files.length > 0 ? (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li key={file.key} className={itemClass}>
              <span className="truncate" dir="ltr">
                {file.name}
              </span>
              {onRemoveFile ? (
                <button
                  type="button"
                  onClick={() => onRemoveFile(index)}
                  className="shrink-0 text-paper/40 hover:text-terr"
                  aria-label={removeLabel}
                >
                  ×
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
