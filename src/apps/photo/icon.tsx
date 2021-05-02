import * as React from "react";

import { Image, AppImage } from "atoms/styled";
import useAnimationEndRender from "utils/hooks/useAnimationEndRender";

interface IProps {
  path: string;
  instanceId?: string;
}

const PhotoIcon = ({ path, instanceId }: IProps) => {
  const { render } = useAnimationEndRender({ instanceId });

  return render ? (
    <Image
      height={64}
      style={{ padding: "4px 0" }}
      src={require(`apps/photo/assests/${path}`).default}
    />
  ) : (
    <AppImage size={64} name="photo"></AppImage>
  );
};

export default React.memo(PhotoIcon);
