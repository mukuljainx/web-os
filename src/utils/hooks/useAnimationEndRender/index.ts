import * as React from "react";

import { useEvent } from "utils/events";

interface IProps {
  instanceId?: string;
}

const useAnimationEndRender = ({ instanceId }: IProps) => {
  const [render, setRender] = React.useState(0);

  const onAnimationEnds = React.useCallback(
    (e) => {
      if (instanceId && e.detail.id === instanceId) {
        setRender(1);
      } else if (!instanceId) {
        setRender(1);
      }
    },
    [instanceId]
  );
  useEvent("ANIMATED_FOLDER_ANIMATION_COMPLETED", onAnimationEnds);

  return { render };
};

export default useAnimationEndRender;
