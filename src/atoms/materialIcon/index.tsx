import * as React from "react";
import styled from "styled-components";
import { IconNameType } from "./interface";

const Icon = styled.i<{ size: number; bold?: boolean }>`
  ${({ size }) => size && `font-size: ${size}px`};
  ${({ bold }) => bold && `font-weight: bold`};
`;

type IProps = ReactHTMLElement<
  "i",
  {
    type?: "outlined" | "two-tone" | "round" | "sharp";
    size?: number;
    name: IconNameType;
    bold?: boolean;
  }
>;

const MaterialIcon = ({ size, type, name, bold, ref: __, ...rest }: IProps) => {
  return (
    <Icon
      {...rest}
      size={size || 16}
      bold={bold}
      className={`material-icons ${type ? "material-icons-" + type : ""}`}
    >
      {name}
    </Icon>
  );
};

export default MaterialIcon;
