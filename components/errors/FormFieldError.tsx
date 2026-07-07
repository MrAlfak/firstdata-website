"use client";

type Props = {
  message: string;
  id?: string;
};

export default function FormFieldError({ message, id }: Props) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[10px] text-terr font-mono">
      {message}
    </p>
  );
}
