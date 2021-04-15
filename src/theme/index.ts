const theme = {
  colors: { plain: "white", plainHover: "gray" },
  borderRadius: 4,
  zIndex: {
    contextMenu: 1000,
    app: 11,
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
