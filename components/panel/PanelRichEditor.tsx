"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  fa?: boolean;
  labels: {
    bold: string;
    italic: string;
    underline: string;
    list: string;
    orderedList: string;
    link: string;
  };
};

function ToolbarBtn({
  label,
  onClick,
  fa,
}: {
  label: string;
  onClick: () => void;
  fa?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`border border-paper/20 px-2 py-1 text-[11px] text-paper/65 transition-colors hover:border-paper/40 hover:text-paper ${
        fa ? "font-fa" : "font-mono uppercase"
      }`}
    >
      {label}
    </button>
  );
}

const editorShell = "panel-rich-editor border border-paper/20 bg-paper/[0.03]";
const toolbarShell = "panel-toolbar flex flex-wrap gap-1 border-b border-paper/15 px-2 py-1.5";

export default function PanelRichEditor({
  value,
  onChange,
  placeholder,
  dir = "ltr",
  fa,
  labels,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, [value]);

  const run = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    onChange(ref.current?.innerHTML ?? "");
  };

  return (
    <div className={editorShell}>
      <div className={toolbarShell}>
        <ToolbarBtn fa={fa} label={labels.bold} onClick={() => run("bold")} />
        <ToolbarBtn fa={fa} label={labels.italic} onClick={() => run("italic")} />
        <ToolbarBtn fa={fa} label={labels.underline} onClick={() => run("underline")} />
        <ToolbarBtn fa={fa} label={labels.list} onClick={() => run("insertUnorderedList")} />
        <ToolbarBtn fa={fa} label={labels.orderedList} onClick={() => run("insertOrderedList")} />
        <ToolbarBtn
          fa={fa}
          label={labels.link}
          onClick={() => {
            const url = window.prompt("URL", "https://");
            if (url) run("createLink", url);
          }}
        />
      </div>
      <div
        ref={ref}
        role="textbox"
        aria-multiline="true"
        contentEditable
        dir={dir}
        data-placeholder={placeholder}
        className={`min-h-[160px] px-3 py-2 text-sm text-paper outline-none empty:before:pointer-events-none empty:before:text-paper/30 empty:before:content-[attr(data-placeholder)] [&_a]:text-term [&_a]:underline [&_ol]:ms-5 [&_ol]:list-decimal [&_ul]:ms-5 [&_ul]:list-disc ${
          fa ? "font-fa" : ""
        }`}
        onInput={() => onChange(ref.current?.innerHTML ?? "")}
        onBlur={() => onChange(ref.current?.innerHTML ?? "")}
      />
    </div>
  );
}
