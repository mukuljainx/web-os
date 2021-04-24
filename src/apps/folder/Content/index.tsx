import * as React from "react";
import styled from "styled-components";

import { IFile } from "base/interfaces";
import IconLayout from "molecules/iconInterface";
import Menu from "molecules/menu";
import Navigation from "./navigation";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.offWhite};
`;

const items = [
  { label: "File" },
  { label: "Home" },
  { label: "Share" },
  { label: "View" },
];

interface IProps {
  files: IFile[];
  user: string;
  fileAction: (path: string) => void;
}

const Content = ({ files, user, fileAction }: IProps) => {
  return (
    <Wrapper>
      <Menu items={items} />
      <Navigation />
      <IconLayout fileAction={fileAction} user={user} files={files} />
    </Wrapper>
  );
};

export default Content;
