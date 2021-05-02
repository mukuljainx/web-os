import * as React from "react";

import PhotoIcon from "apps/photo/icon";

const map = {
  photo: PhotoIcon,
};

interface IProps {
  data: Record<string, any>;
  appName: "photo";
  // folder instance id
  instanceId?: string;
}

const CustomIcon = ({ data, appName, instanceId }: IProps) => {
  const AppIcon = map[appName];
  // pass everything from the data let the icon decide
  return <AppIcon {...(data as any)} instanceId={instanceId} />;
};

export default CustomIcon;
