import * as React from "react";
// import styled from "styled-components";

import { Stack } from "atoms/styled";
import { INavItem } from "./interface";
import ItemGroup from "./itemGroup";

interface IProps {
  items: Array<
    INavItem & {
      children?: INavItem[];
    }
  >;
}

const SideNav = ({ items }: IProps) => {
  return (
    <Stack flexDirection="column">
      {items.map((item, i) => (
        <ItemGroup {...item} key={i} />
      ))}
    </Stack>
  );
};

export default SideNav;
