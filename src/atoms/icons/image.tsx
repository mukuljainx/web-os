import * as React from "react";

// this will be generated
const availableIcons = new Set([
  "desktop",
  "library",
  "music",
  "system",
  // "folder",
  "user",
  "applications",
  "windows",
]);

interface IProps {
  name: string;
  size: number;
  type?: "svg";
}

const Image = ({ name, size, type }: IProps) => {
  let iconName = "generic";
  if (availableIcons.has(name)) {
    iconName = name;
  }
  return (
    <img
      height={size}
      width={size}
      className="icon__image"
      src={require(`./assets/${iconName}.${type || "png"}`).default}
    />
  );
};

export default Image;
