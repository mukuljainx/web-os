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
  photos: "photos.png",
  settings: "settings.png",
  partlyCloudy: "partly-cloudy.png",
  myPc: "my-pc.png",
  star: "star.png",
  generic: "generic.svg",
  download: "download.png",
  document: "document.png",
  pictures: "pictures.png",
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

  return (
    <img
      {...rest}
      height={height || size}
      width={width || size}
      className="icon__image"
      src={require(`./assets/${iconName}`).default}
    />
  );
};

export default Image;
