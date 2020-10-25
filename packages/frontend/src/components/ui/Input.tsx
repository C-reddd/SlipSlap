import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";
type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, children, ...props }: Props) {
  return (
    <input className={clsx("rounded", className)} {...props}>
      {children}
    </input>
  );
}
