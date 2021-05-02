import * as React from "react";

const useDidUpdate = () => {
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    firstRender.current = false;
  }, []);

  return { firstRender: firstRender.current };
};

export default useDidUpdate;
