import * as React from "react";

import Folder from "apps/folder";
import { IMetaData } from "base/interfaces";
import AnimatedFileWrapper from "atoms/animatedFileWrapper";

interface IProps {
  name: string;
  id: string;
  appId: string;
  data: any;
  metaData: IMetaData;
  style: React.CSSProperties;
  onMouseDown: (event: React.MouseEvent) => void;
}

const App = ({
  name,
  data,
  id,
  appId,
  metaData,
  style,
  onMouseDown,
}: IProps) => {
  switch (name) {
    case "folder": {
      return (
        <AnimatedFileWrapper style={style} metaData={metaData}>
          <Folder
            onMouseDown={onMouseDown}
            metaData={metaData}
            key={id}
            appId={appId}
            id={id}
            {...data}
          />
        </AnimatedFileWrapper>
      );
    }
  }

  return null;
};

export default App;
