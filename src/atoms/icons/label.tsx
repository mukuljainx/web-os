import * as React from "react";
import styled from "styled-components";

const Text = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 84px;
  margin: 0;
  padding: 2px 8px;
  border-radius: 4px;
  text-align: center;
  color: ${({ theme }) => theme.icon.textColor};
  text-shadow: ${({ theme }) => theme.icon.textShadow};
`;

interface IProps {
  name: string;
}

const Label = ({ name }: IProps) => {
  return <Text className="icon__label">{name}</Text>;
};

export default Label;
