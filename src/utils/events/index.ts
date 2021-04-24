import * as React from "react";

export const useEvent = (name: string, callback: (e: any) => void) => {
  React.useEffect(() => {
    console.log("GLOBAL EVENT LISTNER ADDED: ", name);
    document.addEventListener(name, callback);
    if (window.os) {
      window.os.events[name] = (window.os.events[name] || 0) + 1;
    }
    return () => {
      console.log("GLOBAL EVENT LISTNER REMOVED: ", name);
      document.removeEventListener(name, callback);
    };
  }, []);
};

export const dispatchEvent = (name: string, detail?: Record<string, any>) => {
  var selectionFired = new CustomEvent(name, {
    detail,
  });

  console.log("GLOBAL EVENT: ", name, detail);

  document.dispatchEvent(selectionFired);
};
