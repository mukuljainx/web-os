import * as React from "react";
import styled from "styled-components";

import ContextMenu from "molecules/contextMenu";
import "./icons.scss";
import { AppImage } from "atoms/styled";
import Label from "./label";
import useActions from "./useActions";
import CustomIcon from "./customIcon";

const SymlinkIcon = styled(AppImage)`
  position: absolute;
  height: 24px;
  bottom: 24px;
  left: 2px;
`;

const Wrapper = styled.div<{ highlight?: boolean; desktop?: boolean }>`
  position: relative;
  .icon__image {
    padding: 2px;
    margin-bottom: 4px;
  }
  &:focus {
    outline: none;
  }
  .icon__image,
  .icon__label {
    &:focus {
      outline: none;
    }
  }
  ${({ highlight, desktop, theme: { colors } }) =>
    highlight
      ? `
    .icon__image {
      border-radius: 4px;
      background: rgba(${desktop ? colors.plainRGB : colors.blackRGB}, 0.15);
    }
    .icon__label {
      background: rgba(${desktop ? colors.blueRGB : colors.blueRGB},0.85);
    }
  `
      : ""}
`;

type IProps = ReactHTMLElement<
  "div",
  {
    desktop?: boolean;
    innnerRef?: any;
    highlight?: boolean;
    safe?: boolean;
    path: string;
    icon: string;
    name: string;
    fileId: string;
    symlink?: boolean;
    appName: "folder" | "photo";
    data: Record<string, any>;
    instanceId?: string;
  }
>;

export const sizeChart = { DESKTOP: 64 };

const AppIcon = ({
  symlink,
  safe,
  desktop,
  path,
  name,
  icon,
  innnerRef,
  appName,
  data,
  instanceId,
  fileId,
  ...rest
}: IProps) => {
  const folderName = React.useRef(name);
  const iconRef = React.useRef<HTMLDivElement>(null);

  const actions = useActions(iconRef, folderName.current || "", path, fileId);

  return (
    <>
      <ContextMenu
        wrapperRef={iconRef}
        items={[
          {
            disabled: safe,
            label: "Rename",
            action: actions.initRename,
            id: "rename",
            icon: "Rename",
          },
          {
            disabled: safe,
            label: "Delete",
            action: actions.deleteFolder,
            id: "delete",
            icon: "Delete",
          },
        ]}
      />
      <Wrapper
        {...rest}
        desktop={desktop}
        ref={iconRef}
        className={`inline-flex flex-column justify-content-center align-items-center icon ${
          rest.className || ""
        }`}
      >
        {appName === "folder" ? (
          <AppImage className="icon__image" name={icon} size={64} />
        ) : (
          <CustomIcon instanceId={instanceId} appName={appName} data={data} />
        )}
        <Label
          desktop={desktop}
          onKeyDown={(e) => e?.stopPropagation()}
          onKeyUp={(e) => e?.stopPropagation()}
          onBlur={actions.renameFolder}
          name={name || ""}
        />
        {symlink && <SymlinkIcon name="symlink" />}
      </Wrapper>
    </>
  );
};

export default AppIcon;
