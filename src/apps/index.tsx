import * as React from "react";

import Folder from "apps/folder";

interface IProps {
  name: string;
  id: string;
  data: any;
}

const App = ({ name, data, id }: IProps) => {
  switch (name) {
    case "folder": {
      return <Folder key={id} {...data} />;
    }
  }

  return null;
};

export default App;
