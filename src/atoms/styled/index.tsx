import React from "react";
import styled from "styled-components";

export const Acrylic = styled.div`
  background: ${({ theme }) => theme.colors.acrylic};
  backdrop-filter: blur(10px);
`;

export const getNotLastChild = () =>
  ["div", "p", "span", "i", "a"].map((x) => `${x}:not(:last-child)`).join(",");

export const StackItem = styled.div<
  Pick<React.CSSProperties, "flexShrink" | "flexGrow">
>`
  ${({ flexShrink }) => flexShrink && `flex-shrink: ${flexShrink}`};
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow}`};
`;

const getPixel = (x: string | number) => (typeof x === "string" ? x : `${x}px`);

/**
 * function to get css from variable name
 * var y = (z) => `\${({ ${z} }) => ${z} && \`${_.kebabCase(z)}: \${${z}}\`};`
 * var ans = x.map(y).join('/n')
 * considering ans as array of React.CSSProperties
 *
 * Only number are allowed for padding & margins
 */
export const Stack = styled.div<
  {
    paddingX?: number;
    paddingY?: number;
    marginX?: number;
    marginY?: number;
    gap?: number;
    fullWidth?: boolean;
    fullHeight?: boolean;
  } & Pick<
    React.CSSProperties,
    | "flexDirection"
    | "justifyContent"
    | "alignItems"
    | "padding"
    | "paddingLeft"
    | "paddingRight"
    | "paddingTop"
    | "paddingBottom"
    | "margin"
    | "marginLeft"
    | "marginRight"
    | "marginTop"
    | "marginBottom"
  >
>`
  display: flex;
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection}`};
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent}`};
  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};

  ${({ padding }) => padding && `padding: ${padding}px`};

  ${({ paddingX }) =>
    paddingX && `padding-left: ${paddingX}px; padding-right: ${paddingX}px`};
  ${({ paddingY }) =>
    paddingY && `padding-top: ${paddingY}px; padding-bottom: ${paddingY}px`};

  ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}px`};
  ${({ paddingRight }) => paddingRight && `padding-right: ${paddingRight}px`};
  ${({ paddingTop }) => paddingTop && `padding-top: ${paddingTop}px`};
  ${({ paddingBottom }) =>
    paddingBottom && `padding-bottom: ${paddingBottom}px`};

  ${({ margin }) => margin && `margin: ${margin}`};

  ${({ marginX }) =>
    marginX && `margin-left: ${marginX}px; margin-right: ${marginX}px`};
  ${({ marginY }) =>
    marginY && `margin-top: ${marginY}px; margin-bottom: ${marginY}px`};

  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}px`};
  ${({ marginRight }) => marginRight && `margin-right: ${marginRight}px`};
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop}px`};
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}px`};

  ${({ gap, flexDirection }) =>
    gap &&
    (flexDirection === "column"
      ? `>${StackItem}{margin-bottom: ${gap}px}`
      : `>${StackItem}{margin-right: ${gap}px}`)};

  ${({ fullHeight }) => fullHeight && `height: 100%`};
  ${({ fullWidth }) => fullWidth && `width: 100%`};
`;

export const Image = styled.img<Pick<React.CSSProperties, "width" | "height">>`
  ${({ width }) => width && `width: ${getPixel(width)}`};
  ${({ height }) => height && `height: ${getPixel(height)}`};
`;

export { default as Text } from "./text";
