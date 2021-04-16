import React from "react";
import styled from "styled-components";

export const Acrylic = styled.div`
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255, 255, 255, 0.6);"
      : "rgba(0, 0, 0, 0.5);"};
  backdrop-filter: blur(10px);
`;

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

  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}`};
  ${({ marginRight }) => marginRight && `margin-right: ${marginRight}`};
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop}`};
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`};

  ${({ gap, flexDirection }) =>
    gap &&
    (flexDirection === "column"
      ? `>div:not(:last-child){margin-bottom: ${gap}px}`
      : `>div:not(:last-child){margin-right: ${gap}px}`)};

  ${({ fullHeight }) => fullHeight && `height: 100%`};
  ${({ fullWidth }) => fullWidth && `width: 100%`};
`;

const getPixel = (x: string | number) => (typeof x === "string" ? x : `${x}px`);

export const Image = styled.img<Pick<React.CSSProperties, "width" | "height">>`
  ${({ width }) => width && `width: ${getPixel(width)}`};
  ${({ height }) => height && `height: ${getPixel(height)}`};
`;
