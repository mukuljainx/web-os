import * as React from "react";
import styled from "styled-components";

// this should be from redux "display" state
// <a href='https://www.freepik.com/photos/abstract'>Abstract photo created by wirestock - www.freepik.com</a>
const Wrapper = styled.div`
  background-image: url(${require("display/wallpaper/default.jpg").default});
`;

interface IProps {
  children: React.ReactNode;
}

const Desktop = ({ children }: IProps) => {
  return <Wrapper className="image-cover">{children}</Wrapper>;
};

export default Desktop;
