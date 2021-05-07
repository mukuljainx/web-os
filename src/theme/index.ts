const theme = {
  colors: {
    plain: "white",
    plainHover: "gray",
    acrylic: "rgba(255, 255, 255, 0.6)",
    offWhite: "rgb(248,248,248)",
    black: "black",
    blackRGB: "0,0,0",
    plainRGB: "255,255,255",
    blueRGB: "0,0,255",
    blue: "rgb(64, 149, 219)",
  },
  borderRadius: 4,
  zIndex: {
    contextMenu: 2147483001,
    app: 51,
    menu: 2147483000,
    appBar: 2147483001,
  },
  icon: {
    textColor: " white",
    textShadow: " 1px 1px black",
    borderColor: " gray",
    textBackground: " blue",
  },
  input: {
    borderRadius: 16,
    height: 24,
    fontSize: 14,
    actionButton: {
      borderRadius: "50%",
      color: "white",
    },
  },
};

type ITheme = typeof theme;

export { theme, ITheme };

export default theme;
