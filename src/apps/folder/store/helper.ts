export const getPath = (route: string) => {
  const splits = route.split("/");
  let path = "";
  splits.forEach((split) => {
    if (split === "") {
      return;
    }
    path += path + `files.${split}`;
  });

  return path;
};
