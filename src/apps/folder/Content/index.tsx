import * as React from "react";
import styled from "styled-components";

import { IApp } from "base/interfaces";
import { IFile } from "apps/folder/interfaces";
import IconLayout from "molecules/iconInterface";
import ContextMenu from "molecules/contextMenu";
import useFolderAction from "../hooks/useFolderAction";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.offWhite};
`;

interface IProps {
  files: IFile[];
  user: string;
  fileAction: (path: string) => void;
  app: IApp;
  route: string;
}

const Content = ({ files, user, fileAction, route }: IProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { menuItems } = useFolderAction({
    route,
    user,
  });

  return (
    <>
      <ContextMenu wrapperRef={wrapperRef} items={menuItems} />
      <Wrapper ref={wrapperRef}>
        <IconLayout fileAction={fileAction} user={user} files={files} />
      </Wrapper>
    </>
  );
};

export default Content;
