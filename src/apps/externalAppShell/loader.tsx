import * as React from "react";
import styled from "styled-components";
import { ProgressIndicator } from "@fluentui/react";

import { Stack, Text, StackItem } from "atoms/styled";
import { StatusTypes } from "utils/hooks/useScript";

interface IProps {
  status: StatusTypes;
}

const Wrapper = styled(Stack)`
  background: ${({ theme }) => theme.colors.plain};
  ${StackItem} {
    width: 320px;
  }
`;

const ScriptStatus = ({ status }: IProps) => {
  return (
    <Wrapper
      flexDirection="column"
      gap={8}
      fullHeight
      justifyContent="center"
      alignItems="center"
    >
      <StackItem>
        <ProgressIndicator
          label="Loading app..."
          progressHidden={status === "error"}
        />
      </StackItem>
      <StackItem>
        {status === "error" && (
          <Text>Something went wrong while loading the app.</Text>
        )}
      </StackItem>
    </Wrapper>
  );
};

export default ScriptStatus;
