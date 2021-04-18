import * as React from "react";
import { Text, ITextProps, FontWeights } from "@fluentui/react";

interface IProps extends ITextProps {
  weight?: keyof typeof FontWeights;
  textTransform?: React.CSSProperties["textTransform"];
}

const StyledText = ({ weight, textTransform, ...rest }: IProps) => {
  return (
    <Text {...rest} style={{ fontWeight: weight as any, textTransform }} />
  );
};

export default StyledText;
