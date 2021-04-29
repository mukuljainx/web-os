import * as React from "react";
import styled from "styled-components";

import SideNav from "molecules/sideNav";
import { Stack, Text } from "atoms/styled";
import { IApp } from "base/interfaces";
import Image from "atoms/styled/appImage";
import { IFile } from "./interfaces";
import { sortBy } from "lodash-es";
import { getPath } from "./helper";

const Wrapper = styled(Stack)`
  width: 240px;
`;

type IProps = ReactHTMLElement<
  "div",
  {
    app: IApp;
    rootFile: IFile;
    push: (route: string) => void;
    user: string;
  }
>;

const SideBar = ({ app, rootFile, push, user, ref, ...rest }: IProps) => {
  const homeRoot = Object.values(rootFile.files!["users"].files!).find(
    (f) => f.icon === "home"
  )!;

  const items = [
    {
      name: "My PC",
      icon: "myPc",
      id: "mypc",
      action: () => push(getPath(rootFile, user)),
      children: sortBy(Object.values(rootFile.files!), ["name"]).map((f) => ({
        name: f.name,
        id: f.id,
        icon: f.icon,
        action: () => push(f.path),
      })),
    },
    {
      name: "Quick Access",
      icon: "star",
      id: "favorite",
      action: () => push(getPath(homeRoot, user)),
      children: sortBy(Object.values(homeRoot.files!), ["name"]).map((f) => ({
        name: f.name,
        id: f.id,
        icon: f.icon,
        action: () => push(getPath(f, user)),
      })),
    },
  ];

  return (
    <Wrapper {...rest} flexDirection="column" paddingX={16} paddingY={8}>
      <Stack alignItems="center">
        <Image height={24} name={app.icon} style={{ paddingRight: 8 }} />
        <Text weight={700} variant="mediumPlus">
          {app.appName}
        </Text>
      </Stack>
      <SideNav items={items} />
    </Wrapper>
  );
};

export default SideBar;
