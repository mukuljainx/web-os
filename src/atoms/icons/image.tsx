import * as React from "react";

// this will be generated
const availableIcons = new Set([
  "desktop",
  "library",
  "music",
  "system",
  "user",
  "applications",
]);

interface IProps {
  name: string;
  size: number;
}

const Image = ({ name, size }: IProps) => {
  let iconName = "generic";
  if (availableIcons.has(name)) {
    iconName = name;
  }
  return (
    <img
      height={size}
      width={size}
      className="icon__image"
      src={require(`./assets/${iconName}.png`).default}
    />
  );
};

export default Image;
