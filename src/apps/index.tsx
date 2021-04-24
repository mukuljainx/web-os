import * as React from "react";

import Folder from "apps/folder";
import { IApp, IMetaData } from "base/interfaces";
import AnimatedFileWrapper from "atoms/animatedFileWrapper";

interface IProps {
  app: IApp;
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
  switch (app.appName) {
    case "folder": {
      return (
        <AnimatedFileWrapper style={style} metaData={metaData} weight={weight}>
          <Folder
            onMouseDown={onMouseDown}
            metaData={metaData}
            key={id}
            app={app}
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
