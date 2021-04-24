import * as React from "react";
import styled from "styled-components";

import SideNav from "molecules/sideNav";
import { Stack, Text } from "atoms/styled";
import { IApp } from "base/interfaces";
import Image from "atoms/icons/image";

const Wrapper = styled(Stack)`
  width: 240px;
  border-right: 1px solid;
`;

const items = [
  {
    name: "My PC",
    icon: "myPc",
    children: [
      { name: "My PC", icon: "myPc" },
      { name: "My PC", icon: "myPc" },
    ],
  },
];

interface IProps {
  app: IApp;
}

const SideBar = ({ app }: IProps) => {
  return (
    <Wrapper flexDirection="column" paddingX={16} paddingY={8}>
      <Stack alignItems="center">
        <Image height={24} name={app.icon} style={{ paddingRight: 8 }} />
        <Text weight={700} variant="mediumPlus">
          {app.name}
        </Text>
      </Stack>
      <SideNav items={items} />
    </Wrapper>
  );
};

export default SideBar;
