import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import { IFile } from "base/interfaces";
import { interpolate } from "utils/string";
import { getPath } from "base/helper";

interface IProps extends RouteComponentProps<{}> {
  files: IFile[];
  user: string;
}

const Folder = ({ files, user }: IProps) => {
  return (
    <>
      {files.map((file, i) => {
        const fileName = interpolate(file.name, { user });
        if (file.isFolder) {
          const childPath = getPath(file, user);
          return (
            <div key={i}>
              <div>
                <Link
                  to={{
                    pathname: childPath,
                  }}
                >
                  {fileName}
                </Link>
              </div>
            </div>
          );
        } else {
          return <div key={i}>{fileName}</div>;
        }
      })}
    </>
  );
};

export default Folder;
