import * as React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import ContextMenu from "molecules/contextMenu";
import "./icons.scss";
import Image from "./image";
import Label from "./label";
import { renameFolder } from "apps/folder/store";

const Wrapper = styled.div<{ highlight?: boolean }>`
  &:focus {
    outline: none;
  }
  .icon__image,
  .icon__label {
    &:focus {
      outline: none;
    }
  }
  ${({ highlight }) =>
    highlight
      ? `
    .icon__image {
      // margin-bottom: 2px;
      padding: 0px;
      border-radius: 4px;
      border: 2px solid var(--icon-border-color);
    }
    .icon__label {
      background: var(--icon-text-background);
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
    path: string;
  }
>;

export const sizeChart = { DESKTOP: 64 };

const Icon = ({ desktop, name, path, label, innnerRef, ...rest }: IProps) => {
  const folderName = React.useRef(label);
  const dispatch = useDispatch();
  const iconRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <ContextMenu
        test-id={`menux-${path}`}
        wrapperRef={iconRef}
        items={[
          {
            label: "Rename",
            action: () => {
              const pElement = iconRef.current!.children[1] as HTMLElement;
              pElement.classList.remove("ellipsis");
              pElement.contentEditable = "true";
              pElement.focus();
            },
            id: "rename",
            icon: "Rename",
          },
        ]}
      />
      <Wrapper
        {...rest}
        ref={iconRef}
        className={`inline-flex flex-column justify-content-center align-items-center icon ${
          rest.className || ""
        }`}
      >
        <Image name={name} size={64} />
        <Label
          desktop={desktop}
          onKeyDown={(e) => e?.stopPropagation()}
          onKeyUp={(e) => e?.stopPropagation()}
          onBlur={(event) => {
            if (folderName.current === (event.target.textContent || "")) {
              return;
            }
            folderName.current = event.target.textContent || "";
            dispatch(
              renameFolder({
                route: path,
                name: folderName.current,
              })
            );
            event.target.classList.add("ellipsis");
            event.target.contentEditable = "false";
          }}
          name={label || ""}
        />
      </Wrapper>
    </>
  );
};

export default Icon;
