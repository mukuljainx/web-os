import * as React from "react";
import { Text, ITextProps, FontWeights } from "@fluentui/react";

interface IProps extends ITextProps {
  weight?: keyof typeof FontWeights | number;
  textTransform?: React.CSSProperties["textTransform"];
  textAlign?: React.CSSProperties["textAlign"];
  ellipsis?: boolean;
}

const StyledText = ({
  weight,
  textTransform,
  className,
  textAlign,
  ellipsis,
  style,
  ...rest
}: IProps) => {
  return (
    <Text
      {...rest}
      style={{
        fontWeight: weight as any,
        textTransform,
        textAlign,
        width: "100%",
        ...style,
      }}
      className={`${ellipsis ? "ellipsis " : ""}${className || ""}`}
    />
  );
};

export default StyledText;
