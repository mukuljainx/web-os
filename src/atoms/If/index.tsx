import * as React from "react";

interface IProps {
  condition: boolean;
  children: React.ReactNode;
}

const If = ({ condition, children }: IProps) => {
  if (condition) {
    return <>{children}</>;
  }
  return null;
};

export default If;
