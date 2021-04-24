import * as React from "react";
import { Text, ITextProps, FontWeights } from "@fluentui/react";

interface IProps extends ITextProps {
  weight?: keyof typeof FontWeights | number;
  textTransform?: React.CSSProperties["textTransform"];
}

const StyledText = ({
  weight,
  textTransform,
  className,
  style,
  ...rest
}: IProps) => {
  return (
    <Text
      {...rest}
      style={{
        fontWeight: weight as any,
        textTransform,
        width: "100%",
        ...style,
      }}
      className={`ellipsis ${className || ""}`}
    />
  );
};

export default StyledText;
