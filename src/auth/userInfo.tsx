import * as React from "react";
import styled from "styled-components";
import { ActionButton, DefaultButton } from "@fluentui/react";
import { useDispatch } from "react-redux";

import { Stack } from "atoms/styled";
import Input from "atoms/input";
import { guestAccess, logUser } from "./store";
import { RootState } from "store";

const TransparentButton = styled(DefaultButton)`
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

interface IProps {
  user: RootState["auth"]["user"];
}

const Auth = ({ user }: IProps) => {
  const dispatch = useDispatch();

  const showSignInOption = !user || (user && user!.guest);

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        {!user ? (
          <Input
            placeholder="Continue as Guest"
            withForm
            onSubmit={(value) => {
              dispatch(guestAccess(value));
            }}
          />
        ) : (
          <TransparentButton
            onClick={() => {
              dispatch(logUser());
            }}
          >
            Continue as {user.name || "Guest"}
          </TransparentButton>
        )}
      </div>
      {showSignInOption && (
        <Stack justifyContent="center">
          <ActionButton
            iconProps={{ iconName: "AddFriend" }}
            allowDisabledFocus
            onClick={() => {
              window.location.href = `${process.env.API}/auth/google`;
            }}
          >
            Continue with Google
          </ActionButton>
        </Stack>
      )}
    </>
  );
};

export default Auth;
