import * as React from "react";
import styled from "styled-components";
import { IconNameType } from "./interface";

const Icon = styled.i<{ size: number; bold?: boolean }>`
  ${({ size }) => size && `font-size: ${size}px`};
  ${({ bold }) => bold && `font-weight: bold`};
`;

interface IProps {
  type?: "outlined" | "two-tone" | "round" | "sharp";
  size?: number;
  name: IconNameType;
  bold?: boolean;
}

const MaterialIcon = ({ size, type, name, bold }: IProps) => {
  return (
    <Icon
      size={size || 16}
      bold={bold}
      className={`material-icons ${type ? "material-icons-" + type : ""}`}
    >
      {name}
    </Icon>
  );
};

export default MaterialIcon;
