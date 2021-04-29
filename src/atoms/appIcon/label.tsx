import * as React from "react";
import styled from "styled-components";

const Text = styled.p<{ desktop?: boolean }>`
  width: 84px;
  margin: 0;
  padding: 2px 8px;
  border-radius: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  ${({ desktop, theme }) =>
    desktop &&
    `
    color: ${theme.icon.textColor};
    text-shadow: ${theme.icon.textShadow};
  `};
`;

type IProps = ReactHTMLElement<
  "p",
  {
    name: string;
    desktop?: boolean;
  }
>;

const Label = ({ name, className, ref, ...rest }: IProps) => {
  return (
    <Text {...rest} className={`icon__label ellipsis ${className || ""}`}>
      {name}
    </Text>
  );
};

export default Label;
