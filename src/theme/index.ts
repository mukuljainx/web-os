const theme = {
  colors: {
    plain: "white",
    plainHover: "gray",
    acrylic: "rgba(255, 255, 255, 0.6)",
  },
  borderRadius: 4,
  zIndex: {
    contextMenu: 2147483001,
    app: 11,
    menu: 2147483000,
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
