import clsx from "clsx";
import React, { ImgHTMLAttributes } from "react";
import LogoImage from "../../images/logo.png";
type Props = ImgHTMLAttributes<HTMLImageElement>;

export default function Logo({ className }: Props) {
  return <img className={clsx(className)} src={LogoImage} alt="logo" />;
}
