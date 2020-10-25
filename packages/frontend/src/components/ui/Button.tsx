import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  uppercase?: boolean;
  hover?: boolean;
};

export default function Button({
  className,
  uppercase = false,
  hover = false,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "flex text-white focus:outline-none focus:shadow-none",
        uppercase && "uppercase",
        hover && "hover:shadow",
        className
      )}
      {...props}
    />
  );
}
