import * as React from "react";
import styled from "styled-components";
import { PrimaryButton, ProgressIndicator } from "@fluentui/react";

import { Stack, Text, StackItem } from "atoms/styled";
import AppShell from "apps/shell";
import api from "utils/api";
import useMount from "utils/hooks/useMount";
import AddApp from "./addApp";
import List from "./list";
import Empty from "./empty";
import { IApp } from "./interface";
import useHistory from "utils/hooks/useHistory";
import If from "atoms/If";
import ListItem from "./listItem";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.plain};
  height: 100%;
`;

interface IProps {
  path: string;
  instanceId: string;
  appName: string;
  onMouseDown: (event: React.MouseEvent) => void;
}

const AppManager = ({ onMouseDown, appName, instanceId }: IProps) => {
  const [apps, setApps] = React.useState<IApp[]>([]);
  const [selectedApp, setSelectedApp] = React.useState(-1);
  const [view, setView] =
    React.useState<"LIST" | "LOADING" | "ERROR" | "EMPTY">("LOADING");

  //| "UPLOAD"  |"LISITEM"
  const localHistory = useHistory("/list");

  const fetchApps = () => {
    api
      .get("/manager/apps/")
      .then(({ data }) => {
        setApps(data);
        setView("LIST");
        if (data.length === 0) {
          setView("EMPTY");
        }
      })
      .catch(() => {
        setView("ERROR");
      });
  };

  useMount(() => {
    fetchApps();
  });

  return (
    <AppShell
      onMouseDown={onMouseDown}
      appName={appName}
      instanceId={instanceId}
      icon="photo"
      name="App Manager"
    >
      <Wrapper>
        <If condition={localHistory.getCurrent() === "/list"}>
          <>
            {view === "ERROR" && (
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
            {view === "LOADING" && (
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
            {view === "LIST" && (
              <List
                onItemClick={(index) => {
                  setSelectedApp(index);
                  localHistory.push("/list-item");
                }}
                items={apps}
              />
            )}
            {view === "EMPTY" && (
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
