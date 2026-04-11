import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function IconButton({ children, className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-slate-100 ${className}`}
    >
      {children}
    </button>
  );
}

export default IconButton;