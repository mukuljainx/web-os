import * as React from "react";
import styled from "styled-components";
import { IconNameType } from "./interface";

const Icon = styled.i<{ size: number }>`
  ${({ size }) => size && `font-size: ${size}px`}
`;

interface IProps {
  type?: "outlined" | "two-tone" | "round" | "sharp";
  size?: number;
  name: IconNameType;
}

const MaterialIcon = ({ size, type, name }: IProps) => {
  return (
    <Icon
      size={size || 16}
      className={`material-icons ${type ? "material-icons-" + type : ""}`}
    >
      {name}
    </Icon>
  );
};

export default MaterialIcon;
