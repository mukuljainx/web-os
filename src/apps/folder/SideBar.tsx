import * as React from "react";
import styled from "styled-components";
import { sortBy } from "lodash-es";
import { shallowEqual, useSelector } from "react-redux";

import SideNav from "molecules/sideNav";
import { Stack, Text } from "atoms/styled";
import { IApp } from "base/interfaces";
import Image from "atoms/styled/appImage";

const Wrapper = styled(Stack)`
  width: 240px;
`;

type IProps = ReactHTMLElement<
  "div",
  {
    app: IApp;
    push: (route: string) => void;
    user: string;
  }
>;

const SideBar = ({ app, push, user, ref, ...rest }: IProps) => {
  const rootFile = useSelector((state) => state.folder.root, shallowEqual);
  const folderPool = useSelector(
    (state) => state.folder.folderPool,
    shallowEqual
  );
  const folderToRoute = useSelector(
    (state) => state.folder.folderToRoute,
    shallowEqual
  );

  const homeRoot = Object.values(rootFile.files!["users"].files!).find(
    (f) => f.data.id === "home"
  )!;

  const items = [
    {
      name: "My PC",
      icon: "myPc",
      id: "mypc",
      action: () => push(folderToRoute[rootFile.data.id]),
      children: sortBy(Object.values(rootFile.files!), ["name"]).map((f) => ({
        name: folderPool[f.data.id].name,
        id: f.data.id,
        icon: folderPool[f.data.id].icon,
        action: () => push(folderToRoute[f.data.id]),
      })),
    },
    {
      name: "Quick Access",
      icon: "star",
      id: "favorite",
      action: () => push(folderToRoute[homeRoot.data.id]),
      children: sortBy(Object.values(homeRoot.files!), ["name"]).map((f) => ({
        name: folderPool[f.data.id].name,
        id: f.data.id,
        icon: folderPool[f.data.id].icon,
        action: () => push(folderToRoute[f.data.id]),
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
