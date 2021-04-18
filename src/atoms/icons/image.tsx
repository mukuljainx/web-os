import * as React from "react";

// this will be generated
export const availableIcons: Record<string, string> = {
  desktop: "desktop.png",
  library: "library.png",
  music: "music.png",
  system: "system.png",
  // "folder" : "folder.png",
  user: "user.png",
  applications: "applications.png",
  windows: "windows.svg",
  calculator: "calculator.png",
  calendar: "calendar.png",
  edge: "edge.png",
  mail: "mail.png",
  photos: "photos.png",
  settings: "settings.png",
  partlyCloudy: "partly-cloudy.png",
};

interface IProps {
  name: string;
  size: number;
  style?: React.CSSProperties;
}

const Image = ({ name, size, style }: IProps) => {
  const iconName = availableIcons[name] || "generic.png";

  return (
    <img
      style={style}
      height={size}
      width={size}
      className="icon__image"
      src={require(`./assets/${iconName}`).default}
    />
  );
};

export default Image;
