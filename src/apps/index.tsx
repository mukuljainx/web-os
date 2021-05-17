import * as React from "react";

import Folder from "apps/folder";
import Photo from "apps/photo";
import AppManager from "apps/appManager";
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
        <AnimatedFileWrapper
          appName={app.appName}
          id={id}
          style={style}
          metaData={metaData}
          weight={weight}
        >
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
    case "photo": {
      return (
        <AnimatedFileWrapper
          appName={app.appName}
          id={id}
          style={style}
          metaData={metaData}
          weight={weight}
        >
          <Photo
            {...(data as any)}
            instanceId={id}
            appName={app.appName}
            onMouseDown={onMouseDown}
          />
        </AnimatedFileWrapper>
      );
    }
    case "appManager": {
      return (
        <AnimatedFileWrapper
          appName={app.appName}
          id={id}
          style={style}
          metaData={metaData}
          weight={weight}
        >
          <AppManager
            {...(data as any)}
            instanceId={id}
            appName={app.appName}
            onMouseDown={onMouseDown}
          />
        </AnimatedFileWrapper>
      );
    }
  }

  return null;
};

export default App;
