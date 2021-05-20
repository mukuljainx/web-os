import * as React from "react";

// this will be generated
export const availableIcons: Record<string, string> = {
  desktop: "desktop.png",
  library: "library.png",
  music: "music.png",
  user: "user.png",
  applications: "applications.png",
  windows: "windows.svg",
  calculator: "calculator.png",
  calendar: "calendar.png",
  edge: "edge.png",
  mail: "mail.png",
  photo: "photo.svg",
  settings: "settings.png",
  partlyCloudy: "partly-cloudy.png",
  myPc: "my-pc.png",
  star: "star.png",
  generic: "generic.svg",
  download: "download.png",
  document: "document.png",
  symlink: "symlink.png",
  system: "system.png",
  pictures: "pictures.png",
  avatar: "avatar.png",
  appManager: "app-manager.png",
};

type IProps = ReactHTMLElement<
  "img",
  {
    name: string;
    size?: number;
  }
>;

const Image = ({ name, size, ref, height, width, ...rest }: IProps) => {
  const iconName = availableIcons[name] || "generic.svg";
  let href = "";

  if (name && name.includes("http")) {
    href = name;
  }

  return (
    <img
      {...rest}
      height={height || size}
      width={width || size}
      src={href ? href : require(`./assets/${iconName}`).default}
    />
  );
};

export default Image;
