import * as React from "react";
import styled from "styled-components";
import { Breadcrumb } from "@fluentui/react";

import { useEvent } from "utils/events";
import { StackItem } from "atoms/styled";

const BreadCrumbWrapper = styled(StackItem)`
  flex-grow: 2;
  background: rgb(237, 237, 237);
  border-radius: 4px;
  overflow: auto;
  padding: 4px 8px;
  div {
    margin-top: 0;
  }
  ol {
    height: 20px;
  }
`;

interface IProps {
  appId: string;
  history: string[];
  push: (route: string) => void;
}

/**
 * So MS BreadCrumb uses resize listner
 * re-render triggers it
 * seprating breadcrumb with React.memo is the best to avoid it
 */
const BreadCrumb = ({ appId, history, push }: IProps) => {
  const currentRoute = history[history.length - 1];
  const [, forceUpdate] = React.useState(0);
  const onAnimationEnds = React.useCallback((e) => {
    if (e.detail.id === appId) {
      forceUpdate(1);
    }
  }, []);
  useEvent("ANIMATED_FOLDER_ANIMATION_COMPLETED", onAnimationEnds);

  const handleItemClick = React.useCallback(
    (_, b) => {
      const i = parseInt(b.key, 10);
      const splits = currentRoute.split("/").slice(0, i + 1);
      push(splits.join("/") || "/");
    },
    [history]
  );

  const items =
    currentRoute === "/"
      ? [
          {
            text: "/",
            key: "0",
            onClick: handleItemClick,
          },
        ]
      : currentRoute.split("/").map((item, i) => ({
          text: item || "/",
          key: i + "",
          onClick: handleItemClick,
        }));

  return (
    <BreadCrumbWrapper>
      <Breadcrumb items={items} />
    </BreadCrumbWrapper>
  );
};

export default React.memo(BreadCrumb);
