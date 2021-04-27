import * as React from "react";
import styled from "styled-components";

import ContextMenu from "molecules/contextMenu";
import "./icons.scss";
import { AppImage } from "atoms/styled";
import Label from "./label";
import useActions from "./useActions";

const Wrapper = styled.div<{ highlight?: boolean; desktop?: boolean }>`
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
    name: string;
    label?: string;
    innnerRef?: any;
    highlight?: boolean;
    safe?: boolean;
    path: string;
  }
>;

export const sizeChart = { DESKTOP: 64 };

const Icon = ({
  safe,
  desktop,
  name,
  path,
  label,
  innnerRef,
  ...rest
}: IProps) => {
  const folderName = React.useRef(label);
  const iconRef = React.useRef<HTMLDivElement>(null);

  const actions = useActions(iconRef, folderName.current || "", path);

  return (
    <>
      <ContextMenu
        test-id={`menux-${path}`}
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
        <AppImage name={name} size={64} />
        <Label
          desktop={desktop}
          onKeyDown={(e) => e?.stopPropagation()}
          onKeyUp={(e) => e?.stopPropagation()}
          onBlur={actions.renameFolder}
          name={label || ""}
        />
      </Wrapper>
    </>
  );
};

export default Icon;
