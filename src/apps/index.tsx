import * as React from "react";

import Folder from "apps/folder";
import { IMetaData } from "base/interfaces";
import AnimatedFileWrapper from "atoms/animatedFileWrapper";

interface IProps {
  app: string;
  id: string;
  data: any;
  metaData: IMetaData;
  style: React.CSSProperties;
  onMouseDown: (event: React.MouseEvent) => void;
  weight: number;
}

const App = ({
  app,
  data,
  id,
  metaData,
  style,
  weight,
  onMouseDown,
}: IProps) => {
  switch (app) {
    case "folder": {
      return (
        <AnimatedFileWrapper style={style} metaData={metaData} weight={weight}>
          <Folder
            onMouseDown={onMouseDown}
            metaData={metaData}
            key={id}
            appName={app}
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
