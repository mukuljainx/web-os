import MaterialIcon from "atoms/materialIcon";
import * as React from "react";
import styled from "styled-components";

export const Button = styled.button`
  background: none;
  position: absolute;
  right: 2px;
  top: 2px;
  padding: 1px 0;
  ${({ theme: { input } }) => `
    border: 2px solid ${input.actionButton.color};
    color: ${input.actionButton.color};
    border-radius: ${input.actionButton.borderRadius};
    height: ${input.height - 4}px;
    width: ${input.height - 4}px;
  `}
  &:focus {
    outline: none;
  }
`;

const InputWrapper = styled.div`
  border-radius: ${({ theme }) => theme.input.borderRadius}px;
  position: relative;
  input {
    ${({ theme: { input } }) => `
      border-radius: ${input.borderRadius}px;
      height: ${input.height}px;
      font-size: ${input.fontSize}px;
    `}
    background: rgba(255,255,255,0.6);
    border: none;
    padding: 0 16px;
    &:focus {
      outline: none;
    }
  }
`;

type IProps = ReactHTMLElement<
  "input",
  {
    withForm?: boolean;
    onSubmit: (value: string) => void;
  }
>;

const Input = ({ withForm, onSubmit, ...props }: IProps) => {
  return (
    <InputWrapper
      onSubmit={
        withForm && onSubmit
          ? (event: React.FormEvent) => {
              onSubmit(
                ((event.target as HTMLFormElement)
                  .elements[0] as HTMLInputElement).value
              );
              event.preventDefault();
            }
          : undefined
      }
      as={withForm ? "form" : undefined}
    >
      <input {...props}></input>
      {withForm && (
        <Button type="submit">
          <MaterialIcon size={14} bold type="two-tone" name="east" />
        </Button>
      )}
    </InputWrapper>
  );
};

export default Input;
