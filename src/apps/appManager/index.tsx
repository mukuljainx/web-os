import * as React from "react";
import styled from "styled-components";
import { PrimaryButton, ProgressIndicator } from "@fluentui/react";

import { Stack, Text, StackItem } from "atoms/styled";
import AppShell from "apps/shell";
import AddApp from "./addApp";
import List from "./list";
import Empty from "./empty";
import useHistory from "utils/hooks/useHistory";
import If from "atoms/If";
import ListItem from "./listItem";
import { getAppsAsync } from "./store";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.plain};
  height: 100%;
`;

interface IProps {
  path: string;
  instanceId: string;
  appName: string;
  dragId: string;
  onMouseDown: (event: React.MouseEvent, dragId: string) => void;
}

const AppManager = ({ onMouseDown, appName, instanceId, dragId }: IProps) => {
  const [selectedApp, setSelectedApp] = React.useState(-1);
  const { apps, loading, error } = useSelector((state) => state.appManager);
  const dispatch = useDispatch();

  //| "UPLOAD"  |"LISITEM"
  const localHistory = useHistory("/list");

  const fetchApps = () => {
    dispatch(getAppsAsync());
  };

  return (
    <AppShell
      onMouseDown={onMouseDown}
      appName={appName}
      instanceId={instanceId}
      icon="appManager"
      name="App Manager"
      dragId={dragId}
    >
      <Wrapper>
        <If condition={localHistory.getCurrent() === "/list"}>
          <>
            {error && (
              <Stack
                fullHeight
                gap={12}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <StackItem>
                  <Text>Can't fetch apps, please try again.</Text>
                </StackItem>
                <StackItem>
                  <PrimaryButton onClick={fetchApps}>Retry</PrimaryButton>
                </StackItem>
              </Stack>
            )}
            {loading && (
              <Stack
                fullHeight
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <ProgressIndicator
                  label="Loading Apps"
                  description="Hold tight, fetching all apps."
                />
              </Stack>
            )}
            {apps.length > 0 && (
              <List
                onAddAppClick={() => {
                  localHistory.push("/upload");
                }}
                onItemClick={(index) => {
                  setSelectedApp(index);
                  localHistory.push("/list-item");
                }}
                items={apps}
              />
            )}
            {apps.length === 0 && (
              <Empty changeView={() => localHistory.push("/upload")} />
            )}
          </>
        </If>
        <If condition={localHistory.getCurrent() === "/upload"}>
          <Stack fullHeight justifyContent="center" alignItems="center">
            <AddApp
              onSuccess={() => {
                localHistory.navigate(-1);
                fetchApps();
              }}
            />
          </Stack>
        </If>
        <If condition={localHistory.getCurrent() === "/list-item"}>
          <Stack fullHeight justifyContent="center" alignItems="center">
            <ListItem goBack={localHistory.navigate} app={apps[selectedApp]} />
          </Stack>
        </If>
      </Wrapper>
    </AppShell>
  );
};

export default React.memo(AppManager);
