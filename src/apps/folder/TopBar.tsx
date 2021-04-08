import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 40px;
  border-bottom: 1px solid;
`;

interface IProps {}

const TopBar = ({}: IProps) => {
  return <Wrapper>TopBar</Wrapper>;
};

export default TopBar;
