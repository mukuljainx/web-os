import * as React from "react";

import Folder from "apps/folder";
import { IMetaData } from "base/interfaces";

interface IProps {
  name: string;
  id: string;
  appId: string;
  data: any;
  metaData: IMetaData;
}

const App = ({ name, data, id, appId, metaData }: IProps) => {
  switch (name) {
    case "folder": {
      return (
        <Folder metaData={metaData} key={id} appId={appId} id={id} {...data} />
      );
    }
  }

  return null;
};

export default App;
