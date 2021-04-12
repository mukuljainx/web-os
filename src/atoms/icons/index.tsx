import * as React from "react";
import styled from "styled-components";

import "./icons.scss";
import Image from "./image";
import Label from "./label";
import { IconType } from "./types";

const Wrapper = styled.div<{ highlight?: boolean }>`
  &:focus {
    outline: none;
  }
  .icon__image,
  .icon__label {
    &:focus {
      outline: none;
    }
  }
  ${({ highlight }) =>
    highlight
      ? `
    .icon__image {
      // margin-bottom: 2px;
      padding: 0px;
      border-radius: 4px;
      border: 2px solid var(--icon-border-color);
    }
    .icon__label {
      background: var(--icon-text-background);
    }
  `
      : ""}
`;

type IProps = ReactHTMLElement<
  "div",
  {
    type: IconType;
    name: string;
    label?: string;
    innnerRef?: any;
    highlight?: boolean;
  }
>;

export const sizeChart = { DESKTOP: 64 };

const Icon = ({ type, name, label, innnerRef, ...rest }: IProps) => {
  if (type === "DESKTOP") {
    return (
      <Wrapper
        {...rest}
        ref={innnerRef}
        className={`inline-flex flex-column justify-content-center align-items-center icon ${
          rest.className || ""
        }`}
      >
        <Image name={name} size={sizeChart["DESKTOP"]} />
        <Label name={label || ""} />
      </Wrapper>
    );
  }

  return null;
};

export default Icon;
