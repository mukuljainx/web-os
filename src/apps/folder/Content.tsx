import { IFile } from "base/interfaces";
import IconLayout from "molecules/iconInterface";
import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface IProps {
  files: IFile[];
  user: string;
  fileAction: (path: string) => void;
}

const Content = ({ files, user, fileAction }: IProps) => {
  return (
    <Wrapper>
      <IconLayout fileAction={fileAction} user={user} files={files} />
    </Wrapper>
  );
};

export default Content;
