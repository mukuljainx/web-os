import * as React from "react";

import "./icons.scss";
import Image from "./image";
import Label from "./label";
import { IconType } from "./types";

type IProps = ReactHTMLElement<
  "div",
  {
    type: IconType;
    name: string;
    label?: string;
    innnerRef: any;
  }
>;

export const sizeChart = { DESKTOP: 64 };

const Icon = ({ type, name, label, innnerRef, ...rest }: IProps) => {
  if (type === "DESKTOP") {
    return (
      <div
        {...rest}
        ref={innnerRef}
        className={`inline-flex flex-column horizontal-center vertical-center icon ${
          rest.className || ""
        }`}
      >
        <Image name={name} size={sizeChart["DESKTOP"]} />
        <Label name={label || ""} />
      </div>
      // </Link>
    );
  }

  return null;
};

export default Icon;
