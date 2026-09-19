"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  BrainCog,
  FolderCode,
  Globe,
  Mic,
  Paperclip,
  Square,
  StopCircle,
  X,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/LangProvider";
import {
  isAbortError,
  isMicDenied,
  startBrowserStt,
  type BrowserSttSession,
} from "@/lib/assistant/browser-stt";

const PROMPT_STYLE_ID = "ai-prompt-box-styles";

const PROMPT_STYLES = `
  *:focus-visible {
    outline-offset: 0 !important;
    --ring-offset: 0 !important;
  }
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  textarea::-webkit-scrollbar-track {
    background: transparent;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: #444444;
    border-radius: 3px;
  }
  textarea::-webkit-scrollbar-thumb:hover {
    background-color: #555555;
  }
`;

function useInjectPromptStyles(): void {
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(PROMPT_STYLE_ID)) return;

    const styleSheet = document.createElement("style");
    styleSheet.id = PROMPT_STYLE_ID;
    styleSheet.innerText = PROMPT_STYLES;
    document.head.appendChild(styleSheet);
  }, []);
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[44px] w-full resize-none border-none bg-transparent text-[#E5E7EB] outline-none placeholder:text-[#6B7280]",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 animate-in overflow-hidden rounded-md border border-[#333333] bg-[#1F2023] px-3 py-1.5 text-sm text-white shadow-md data-[state=closed]:animate-out",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[90vw] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-[#333333] bg-[#1F2023] p-0 shadow-xl duration-300 data-[state=closed]:animate-out data-[state=open]:animate-in md:max-w-[800px]",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 z-10 rounded-full bg-[#2E3033]/80 p-2 transition-all hover:bg-[#2E3033]">
        <X className="h-4 w-4 text-white" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-gray-100",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-white hover:bg-white/80 text-black",
      outline: "border border-[#444444] bg-transparent hover:bg-[#3A3A40]",
      ghost: "bg-transparent hover:bg-[#3A3A40]",
    };
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6",
      icon: "h-8 w-8 rounded-full aspect-[1/1]",
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

interface VoiceRecorderProps {
  transcript?: string;
  label?: string;
  visualizerBars?: number;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  transcript,
  label,
  visualizerBars = 32,
}) => {
  const [time, setTime] = React.useState(0);
  const [levels, setLevels] = React.useState<number[]>(() => Array(visualizerBars).fill(4));

  React.useEffect(() => {
    const id = window.setInterval(() => setTime((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  React.useEffect(() => {
    let raf = 0;
    const origin = performance.now();
    const tick = (now: number) => {
      const t = (now - origin) / 180;
      setLevels(
        Array.from({ length: visualizerBars }, (_, i) => {
          return 4 + (Math.sin(t + i * 0.45) * 0.5 + 0.5) * 18;
        }),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visualizerBars]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex w-full flex-col gap-2 px-2 py-3">
      <div className="flex w-full items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-400">
          <Mic className="h-4 w-4" />
        </div>
        <span className="font-mono text-sm text-[#E5E7EB]">{formatTime(time)}</span>
        <div className="flex flex-1 items-center justify-center gap-[2px]">
          {levels.map((height, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-[#1EAEDB]"
              style={{ height }}
            />
          ))}
        </div>
      </div>
      <p className="line-clamp-2 break-words px-1 text-start text-sm leading-5 text-[#E5E7EB]">
        {transcript || label}
      </p>
    </div>
  );
};

interface ImageViewDialogProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ImageViewDialog: React.FC<ImageViewDialogProps> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <Dialog open={!!imageUrl} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border-none bg-transparent shadow-none">
        <DialogTitle className="sr-only">Image Preview</DialogTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl bg-[#1F2023] shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Preview"
            className="max-h-[80vh] w-full object-contain"
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

interface PromptInputContextType {
  isLoading: boolean;
  value: string;
  setValue: (value: string) => void;
  maxHeight: number | string;
  onSubmit?: () => void;
  disabled?: boolean;
}

const PromptInputContext = React.createContext<PromptInputContextType>({
  isLoading: false,
  value: "",
  setValue: () => {},
  maxHeight: 240,
  onSubmit: undefined,
  disabled: false,
});

function usePromptInput() {
  const context = React.useContext(PromptInputContext);
  if (!context) {
    throw new Error("usePromptInput must be used within a PromptInput");
  }
  return context;
}

interface PromptInputProps {
  isLoading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  maxHeight?: number | string;
  onSubmit?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
  (
    {
      className,
      isLoading = false,
      maxHeight = 240,
      value,
      onValueChange,
      onSubmit,
      children,
      disabled = false,
      onDragOver,
      onDragLeave,
      onDrop,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(value || "");

    const handleChange = (newValue: string) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col rounded-[28px] border border-[#1F2023] bg-[#2E3033] shadow-lg",
          className,
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <PromptInputContext.Provider
          value={{
            isLoading,
            value: value ?? internalValue,
            setValue: onValueChange ?? handleChange,
            maxHeight,
            onSubmit,
            disabled,
          }}
        >
          {children}
        </PromptInputContext.Provider>
      </div>
    );
  },
);
PromptInput.displayName = "PromptInput";

interface PromptInputTextareaProps {
  disableAutosize?: boolean;
  placeholder?: string;
}

const PromptInputTextarea: React.FC<
  PromptInputTextareaProps & React.ComponentProps<typeof Textarea>
> = ({ className, onKeyDown, disableAutosize = false, placeholder, ...props }) => {
  const { value, setValue, maxHeight, onSubmit, disabled } = usePromptInput();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (disableAutosize || !textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      typeof maxHeight === "number"
        ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
        : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
  }, [value, maxHeight, disableAutosize]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
    onKeyDown?.(e);
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className={cn("px-0 text-base", className)}
      disabled={disabled}
      placeholder={placeholder}
      rows={1}
      {...props}
    />
  );
};

type PromptInputActionsProps = React.HTMLAttributes<HTMLDivElement>;

const PromptInputActions: React.FC<PromptInputActionsProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("flex items-center justify-between gap-2 pt-1", className)} {...props}>
    {children}
  </div>
);

interface PromptInputActionProps extends React.ComponentProps<typeof Button> {
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const PromptInputAction: React.FC<PromptInputActionProps> = ({
  tooltip,
  children,
  className,
  side = "top",
  ...props
}) => {
  const { disabled } = usePromptInput();

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            disabled={disabled}
            className={className}
            {...props}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side}>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const CustomDivider: React.FC = () => <div className="mx-1 h-4 w-px bg-[#444444]" />;

export interface PromptInputBoxProps {
  onSend?: (message: string, files?: File[]) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  /** Focus the textarea when the box mounts (e.g. sticky expand). */
  autoFocus?: boolean;
}

export const PromptInputBox = React.forwardRef<HTMLDivElement, PromptInputBoxProps>(
  (props, ref) => {
    const {
      onSend = () => {},
      isLoading = false,
      placeholder = "Type your message here...",
      className,
      autoFocus = false,
    } = props;

    useInjectPromptStyles();
    const { d } = useT();
    const voiceCopy = d.assistantChat;

    const [input, setInput] = React.useState("");
    const [files, setFiles] = React.useState<File[]>([]);
    const [filePreviews, setFilePreviews] = React.useState<Record<string, string>>({});
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
    const [isRecording, setIsRecording] = React.useState(false);
    const [isVoicePreparing, setIsVoicePreparing] = React.useState(false);
    const [voiceError, setVoiceError] = React.useState<string | null>(null);
    const [liveTranscript, setLiveTranscript] = React.useState("");
    const [showSearch, setShowSearch] = React.useState(false);
    const [showThink, setShowThink] = React.useState(false);
    const [showCanvas, setShowCanvas] = React.useState(false);
    const uploadInputRef = React.useRef<HTMLInputElement>(null);
    const promptBoxRef = React.useRef<HTMLDivElement>(null);
    const recordingRef = React.useRef(false);
    const preparingRef = React.useRef(false);
    const sttRef = React.useRef<BrowserSttSession | null>(null);
    const sttAbortRef = React.useRef<AbortController | null>(null);
    const onSendRef = React.useRef(onSend);
    React.useEffect(() => {
      onSendRef.current = onSend;
    }, [onSend]);
    const stopTimerRef = React.useRef<number | null>(null);

    const releaseMic = React.useCallback(() => {
      recordingRef.current = false;
      preparingRef.current = false;
      if (stopTimerRef.current) {
        window.clearTimeout(stopTimerRef.current);
        stopTimerRef.current = null;
      }
      sttRef.current = null;
      sttAbortRef.current?.abort();
      sttAbortRef.current = null;
    }, []);

    React.useEffect(() => () => releaseMic(), [releaseMic]);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        promptBoxRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const handleToggleChange = (value: string) => {
      if (value === "search") {
        setShowSearch((prev) => !prev);
        setShowThink(false);
      } else if (value === "think") {
        setShowThink((prev) => !prev);
        setShowSearch(false);
      }
    };

    const handleCanvasToggle = () => setShowCanvas((prev) => !prev);

    const isImageFile = (file: File) => file.type.startsWith("image/");

    const processFile = React.useCallback((file: File) => {
      if (!file.type.startsWith("image/")) {
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        return;
      }
      setFiles([file]);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setFilePreviews({ [file.name]: result });
        }
      };
      reader.readAsDataURL(file);
    }, []);

    const handleDragOver = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = Array.from(e.dataTransfer.files);
        const imageFiles = droppedFiles.filter((file) => isImageFile(file));
        if (imageFiles.length > 0 && imageFiles[0]) {
          processFile(imageFiles[0]);
        }
      },
      [processFile],
    );

    const handleRemoveFile = (index: number) => {
      const fileToRemove = files[index];
      if (fileToRemove && filePreviews[fileToRemove.name]) {
        setFilePreviews({});
      }
      setFiles([]);
    };

    const openImageModal = (imageUrl: string) => setSelectedImage(imageUrl);

    const handlePaste = React.useCallback(
      (e: ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item && item.type.indexOf("image") !== -1) {
            const file = item.getAsFile();
            if (file) {
              e.preventDefault();
              processFile(file);
              break;
            }
          }
        }
      },
      [processFile],
    );

    React.useEffect(() => {
      document.addEventListener("paste", handlePaste);
      return () => document.removeEventListener("paste", handlePaste);
    }, [handlePaste]);

    const handleSubmit = () => {
      if (input.trim() || files.length > 0) {
        let messagePrefix = "";
        if (showSearch) messagePrefix = "[Search: ";
        else if (showThink) messagePrefix = "[Think: ";
        else if (showCanvas) messagePrefix = "[Canvas: ";
        const formattedInput = messagePrefix ? `${messagePrefix}${input}]` : input;
        onSend(formattedInput, files);
        setInput("");
        setFiles([]);
        setFilePreviews({});
      }
    };

    const stopVoice = React.useCallback(async () => {
      if (stopTimerRef.current) {
        window.clearTimeout(stopTimerRef.current);
        stopTimerRef.current = null;
      }

      if (preparingRef.current && !sttRef.current) {
        preparingRef.current = false;
        recordingRef.current = false;
        sttAbortRef.current?.abort();
        sttAbortRef.current = null;
        setIsVoicePreparing(false);
        setIsRecording(false);
        setLiveTranscript("");
        return;
      }

      if (!recordingRef.current && !sttRef.current) {
        setIsRecording(false);
        setIsVoicePreparing(false);
        return;
      }

      recordingRef.current = false;
      preparingRef.current = false;
      const session = sttRef.current;
      sttRef.current = null;
      const spoken = session ? (await session.stop()).trim() : "";
      sttAbortRef.current = null;
      setIsRecording(false);
      setIsVoicePreparing(false);
      setLiveTranscript("");

      if (spoken) {
        onSendRef.current(spoken, []);
        return;
      }
      setVoiceError(voiceCopy.voiceEmpty);
    }, [voiceCopy.voiceEmpty]);

    const startVoice = React.useCallback(async () => {
      setVoiceError(null);
      setLiveTranscript("");
      preparingRef.current = true;
      recordingRef.current = false;
      setIsVoicePreparing(true);
      setIsRecording(true);

      const abort = new AbortController();
      sttAbortRef.current?.abort();
      sttAbortRef.current = abort;

      try {
        const session = await startBrowserStt({
          onPartial: (text) => setLiveTranscript(text),
          signal: abort.signal,
        });
        if (abort.signal.aborted || !preparingRef.current) {
          await session.stop();
          return;
        }
        sttRef.current = session;
        preparingRef.current = false;
        recordingRef.current = true;
        setIsVoicePreparing(false);
        stopTimerRef.current = window.setTimeout(() => {
          void stopVoice();
        }, 60_000);
      } catch (err) {
        preparingRef.current = false;
        recordingRef.current = false;
        sttRef.current = null;
        sttAbortRef.current = null;
        setIsVoicePreparing(false);
        setIsRecording(false);
        setLiveTranscript("");
        if (isAbortError(err)) return;
        if (isMicDenied(err)) {
          setVoiceError(voiceCopy.voiceDenied);
          return;
        }
        setVoiceError(voiceCopy.voiceUnsupported);
      }
    }, [stopVoice, voiceCopy.voiceDenied, voiceCopy.voiceUnsupported]);

    const hasContent = input.trim() !== "" || files.length > 0;

    return (
      <>
        <div ref={setRefs} className={cn("w-full", className)}>
          {files.length > 0 && !isRecording && (
            <div className="mb-2 flex flex-wrap gap-2">
              {files.map((file, index) => (
                <div key={`${file.name}-${index}`} className="relative">
                  {file.type.startsWith("image/") && filePreviews[file.name] && (
                    <div
                      className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-xl border border-[#444444]"
                      onClick={() => {
                        const preview = filePreviews[file.name];
                        if (preview) openImageModal(preview);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          const preview = filePreviews[file.name];
                          if (preview) openImageModal(preview);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={filePreviews[file.name]}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        className="absolute top-1 right-1 rounded-full bg-black/70 p-0.5 opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <PromptInput
            value={input}
            onValueChange={setInput}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            disabled={isRecording}
          >
            <div className="px-4 pb-2 pt-3">
              {!isRecording && (
                <PromptInputTextarea placeholder={placeholder} autoFocus={autoFocus} />
              )}

              {isRecording && (
                <VoiceRecorder
                  transcript={isVoicePreparing ? undefined : liveTranscript}
                  label={
                    isVoicePreparing ? voiceCopy.voiceLoading : voiceCopy.voiceListening
                  }
                />
              )}

              <PromptInputActions>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => uploadInputRef.current?.click()}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#9CA3AF] transition-colors hover:bg-gray-600/30 hover:text-[#D1D5DB]"
                    disabled={isRecording}
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <input
                    ref={uploadInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        if (file) processFile(file);
                      }
                      if (e.target) e.target.value = "";
                    }}
                    accept="image/*"
                  />

                  <button
                    type="button"
                    onClick={() => handleToggleChange("search")}
                    className={cn(
                      "flex h-8 items-center gap-1 rounded-full border px-2 py-1 transition-all",
                      showSearch
                        ? "border-[#1EAEDB] bg-[#1EAEDB]/15 text-[#1EAEDB]"
                        : "border-transparent bg-transparent text-[#9CA3AF] hover:text-[#D1D5DB]",
                    )}
                  >
                    <motion.div
                      animate={{
                        rotate: showSearch ? 360 : 0,
                        scale: showSearch ? 1.1 : 1,
                      }}
                      whileHover={{
                        rotate: showSearch ? 360 : 15,
                        scale: 1.1,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 25,
                      }}
                    >
                      <Globe className="h-4 w-4" />
                    </motion.div>
                    <AnimatePresence>
                      {showSearch && (
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0 overflow-hidden whitespace-nowrap text-xs text-[#1EAEDB]"
                        >
                          Search
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleChange("think")}
                    className={cn(
                      "flex h-8 items-center gap-1 rounded-full border px-2 py-1 transition-all",
                      showThink
                        ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#8B5CF6]"
                        : "border-transparent bg-transparent text-[#9CA3AF] hover:text-[#D1D5DB]",
                    )}
                  >
                    <motion.div
                      animate={{
                        rotate: showThink ? 360 : 0,
                        scale: showThink ? 1.1 : 1,
                      }}
                      whileHover={{
                        rotate: showThink ? 360 : 15,
                        scale: 1.1,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 25,
                      }}
                    >
                      <BrainCog className="h-4 w-4" />
                    </motion.div>
                    <AnimatePresence>
                      {showThink && (
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0 overflow-hidden whitespace-nowrap text-xs text-[#8B5CF6]"
                        >
                          Think
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <button
                    type="button"
                    onClick={handleCanvasToggle}
                    className={cn(
                      "flex h-8 items-center gap-1 rounded-full border px-2 py-1 transition-all",
                      showCanvas
                        ? "border-[#F97316] bg-[#F97316]/15 text-[#F97316]"
                        : "border-transparent bg-transparent text-[#9CA3AF] hover:text-[#D1D5DB]",
                    )}
                  >
                    <motion.div
                      animate={{
                        rotate: showCanvas ? 360 : 0,
                        scale: showCanvas ? 1.1 : 1,
                      }}
                      whileHover={{
                        rotate: showCanvas ? 360 : 15,
                        scale: 1.1,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 25,
                      }}
                    >
                      <FolderCode className="h-4 w-4" />
                    </motion.div>
                    <AnimatePresence>
                      {showCanvas && (
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0 overflow-hidden whitespace-nowrap text-xs text-[#F97316]"
                        >
                          Canvas
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <CustomDivider />
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90"
                    aria-label={
                      isRecording
                        ? voiceCopy.voiceStopAria
                        : hasContent
                          ? voiceCopy.send
                          : voiceCopy.voiceAria
                    }
                    onClick={() => {
                      if (isRecording) void stopVoice();
                      else if (hasContent) handleSubmit();
                      else void startVoice();
                    }}
                    disabled={isLoading && !hasContent}
                  >
                    {isLoading ? (
                      <Square className="h-4 w-4 fill-current" />
                    ) : isRecording ? (
                      <StopCircle className="h-4 w-4" />
                    ) : hasContent ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </PromptInputActions>
            </div>
          </PromptInput>
          {voiceError ? (
            <p className="mt-1.5 px-1 text-[11px] text-[#F87171]">{voiceError}</p>
          ) : null}
        </div>

        <ImageViewDialog imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      </>
    );
  },
);
PromptInputBox.displayName = "PromptInputBox";
