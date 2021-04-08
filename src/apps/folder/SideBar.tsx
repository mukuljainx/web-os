import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 200px;
  border-right: 1px solid;
`;

interface IProps {}

const SideBar = ({}: IProps) => {
  return <Wrapper>SideBar</Wrapper>;
};

export default SideBar;
