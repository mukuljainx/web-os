import * as React from "react";
import { Icon, IIconProps } from "@fluentui/react";

interface IProps extends IIconProps {
  size?: number;
}

const StyledIcon = ({ size, style, ...rest }: IProps) => {
  return <Icon {...rest} style={{ ...style, fontSize: size }} />;
};

export default StyledIcon;
