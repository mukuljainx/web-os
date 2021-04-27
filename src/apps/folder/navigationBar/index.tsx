import * as React from "react";
import styled from "styled-components";

import { Stack, StackItem, Icon } from "atoms/styled";
import { IApp } from "base/interfaces";
import Menu from "molecules/menu";
import { IHistoryStatus } from "utils/hooks/useHistory";
import Breadcrumb from "./breadcrumb";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createFolder } from "../store";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.plain};
`;

interface IProps {
  app: IApp;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onUpwardClick: () => void;
  history: IHistoryStatus;
  push: (route: string) => void;
}

const Navigation = ({
  app,
  onPreviousClick,
  onNextClick,
  onUpwardClick,
  history,
  push,
}: IProps) => {
  console.log(history);
  const dispatch = useDispatch();
  const user = useSelector(
    (state) => state.auth.user?.name || "",
    shallowEqual
  );
  const action = () => {
    console.log(history);
    dispatch(createFolder({ route: history.history[history.position], user }));
  };

  const menuItems = [
    {
      label: "File",
      options: [
        {
          key: "new-file",
          text: "New File",
          onClick: console.log,
        },
        {
          key: "new-folder",
          text: "New Folder",
          onClick: action,
        },
      ],
    },
    // { label: "Home", options: [] },
    // { label: "Share", options: [] },
    // { label: "View", options: [] },
  ];

  return (
    <Wrapper>
      <Menu items={menuItems} />
      <Stack gap={32} paddingX={24} paddingY={16} alignItems="center">
        <StackItem>
          <Icon
            disabled={history.history.length === 1 || history.position === 0}
            cursor="pointer"
            onClick={onPreviousClick}
            size={12}
            style={{ transform: "rotate(-45deg)" }}
            iconName="ArrowUpRightMirrored8"
          />
        </StackItem>
        <StackItem>
          <Icon
            disabled={
              history.history.length === 1 ||
              history.position === history.history.length - 1
            }
            cursor="pointer"
            onClick={onNextClick}
            size={12}
            style={{ transform: "rotate(135deg)" }}
            iconName="ArrowUpRightMirrored8"
          />
        </StackItem>
        <StackItem>
          <Icon
            disabled={history.history[history.history.length - 1] === "/"}
            onClick={onUpwardClick}
            cursor="pointer"
            size={12}
            style={{ transform: "rotate(45deg)" }}
            iconName="ArrowUpRightMirrored8"
          />
        </StackItem>
        <Breadcrumb
          push={push}
          route={history.history[history.position]}
          appId={app.id}
        />
      </Stack>
    </Wrapper>
  );
};

export default React.memo(Navigation);
