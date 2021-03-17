import * as React from "react";
import { IconName } from "./types";

interface IProps {
  name: IconName;
  size: number;
}

const Image = ({ name, size }: IProps) => {
  return (
    <img
      height={size}
      width={size}
      className="icon__image"
      src={require(`./assets/${name}.png`).default}
    />
  );
};

export default Image;
