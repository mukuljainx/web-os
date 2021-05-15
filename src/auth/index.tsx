import * as React from "react";
import styled from "styled-components";
import { Spinner } from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";
import api from "utils/api";
import { get } from "lodash-es";
import { animated, useSpring } from "react-spring";

import { RootState } from "store";
import { Acrylic, AppImage, Image, Stack, StackItem, Text } from "atoms/styled";
import { authUser } from "./store";
import { IUser } from "./interface";
import UserInfo from "./userInfo";

const Profile = styled(Image)`
  height: 96px;
  border-radius: 50%;
`;

const Auth = () => {
  const location = window.location;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = React.useState(false);
  const spring = useSpring({ height: loading ? 20 : 80 });
  const name = user ? user!.name : "There";
  const userAvatar = get(user, "authInfo.avatar");

  React.useEffect(() => {
    if (location.pathname === "/auth/callback") {
      setLoading(true);
      api
        .get<IUser>(`auth/google/redirect${location.search}`)
        .then(({ data }) => {
          setLoading(false);
          dispatch(authUser(data));
          window.history.pushState("Web OS", "Web OS", "/");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        // this should be from redux "display" state
        //// <a href='https://www.freepik.com/photos/abstract'>Abstract photo created by wirestock - www.freepik.com</a>
        backgroundImage: `url(${
          require("display/wallpaper/default.jpg").default
        })`,
      }}
      className="image-cover"
    >
      <Stack fullWidth fullHeight alignItems="center" justifyContent="center">
        <Acrylic smooth>
          <Stack
            alignItems="center"
            flexDirection="column"
            gap={16}
            paddingY={64}
            style={{ width: 640 }}
          >
            <StackItem>
              {userAvatar ? (
                <Profile src={userAvatar} />
              ) : (
                <AppImage name="avatar" />
              )}
            </StackItem>
            <StackItem>
              <Text>Hi {name}</Text>
            </StackItem>
            <StackItem data-id="login-action">
              <animated.div style={spring}>
                {loading ? <Spinner /> : <UserInfo user={user} />}
              </animated.div>
            </StackItem>
          </Stack>
        </Acrylic>
      </Stack>
    </div>
  );
};

export default Auth;
