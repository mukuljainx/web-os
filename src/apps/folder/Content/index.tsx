import * as React from "react";
import styled from "styled-components";

import { IApp } from "base/interfaces";
import { IFile } from "../interfaces";
import IconLayout from "molecules/iconInterface";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.offWhite};
`;

interface IProps {
  files: IFile[];
  user: string;
  fileAction: (event: React.MouseEvent, file: IFile) => void;
  app: IApp;
  route: string;
}

const Content = ({ files, user, fileAction, route, app }: IProps) => {
  return (
    <>
      <Wrapper>
        <IconLayout
          fileAction={fileAction}
          route={route}
          user={user}
          files={files}
          instanceId={app.id}
        />
      </Wrapper>
    </>
  );
};

export default Content;
