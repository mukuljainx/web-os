import * as React from "react";

interface IProps {
  name: string;
}

const Label = ({ name }: IProps) => {
  return <p className="icon__label">{name}</p>;
};

export default Label;
