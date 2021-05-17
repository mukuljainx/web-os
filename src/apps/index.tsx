import * as React from "react";

import Folder from "apps/folder";
import Photo from "apps/photo";
import AppManager from "apps/appManager";
import { IApp, IMetaData } from "base/interfaces";
import AnimatedFileWrapper from "atoms/animatedFileWrapper";
import ExternalAppShell from "apps/externalAppShell";

interface IProps {
  app: IApp;
  id: string;
  data: any;
  metaData: IMetaData;
  style: React.CSSProperties;
  onMouseDown: (event: React.MouseEvent, dragId: string) => void;
  dragId: string;
  weight: number;
}

const App = (props: IProps) => {
  const { app, data, id, metaData, style, weight, dragId, onMouseDown } = props;
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
            dragId={dragId}
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
            dragId={dragId}
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
            dragId={dragId}
            appName={app.appName}
            onMouseDown={onMouseDown}
          />
        </AnimatedFileWrapper>
      );
    }
  }

  if (app.data.appType === "EXTERNAL") {
    return (
      <AnimatedFileWrapper
        appName={app.appName}
        id={id}
        style={style}
        metaData={metaData}
        weight={weight}
      >
        <ExternalAppShell
          data={app.data}
          instanceId={id}
          dragId={dragId}
          appName={app.appName}
          onMouseDown={onMouseDown}
        />
      </AnimatedFileWrapper>
    );
  }

  return null;
};

export default React.memo(App);
