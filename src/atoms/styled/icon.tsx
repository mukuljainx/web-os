import * as React from "react";
import { Icon, IIconProps } from "@fluentui/react";

interface IProps extends IIconProps {
  size?: number;
  disabled?: boolean;
  cursor?: React.CSSProperties["cursor"];
}

const StyledIcon = ({ size, style, cursor, disabled, ...rest }: IProps) => {
  return (
    <Icon
      {...rest}
      style={{
        ...style,
        fontSize: size,
        cursor,
        ...(disabled ? { opacity: 0.3, pointerEvents: "none" } : {}),
      }}
    />
  );
};

export default StyledIcon;
