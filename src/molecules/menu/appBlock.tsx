import * as React from "react";
import styled from "styled-components";

import Image from "atoms/icons/image";
import { Stack, Text } from "atoms/styled";

const Block = styled(Stack)`
  background: ${({ theme }) => theme.colors.acrylic};
  position: relative;
  border-radius: 4px;
  margin-bottom: 8px;
  margin-right: 8px;
  &:nth-child(3n) {
    margin-right: 0px;
  }
`;

const StyledText = styled(Text)`
  position: absolute;
  bottom: 8px;
  left: 8px;
`;

type IProps = ReactHTMLElement<
  "div",
  {
    icon: string;
    name: string;
  }
>;

const QucikPick = ({ icon, name, ref, ...rest }: IProps) => {
  return (
    <Block {...rest} alignItems="center" justifyContent="center">
      <Image name={icon} size={48} />
      <StyledText className="ellipsis">{name}</StyledText>
    </Block>
  );
};

export default QucikPick;