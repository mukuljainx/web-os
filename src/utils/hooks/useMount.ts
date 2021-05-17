import * as React from "react";

const useMount = (cb: () => (() => void) | void) => {
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (!isMounted.current) {
      cb();
      isMounted.current = true;
    }
  }, []);
};

export default useMount;
