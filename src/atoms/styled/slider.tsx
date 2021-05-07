import * as React from "react";
import { Slider, ISliderProps } from "@fluentui/react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  span {
    background: ${({ theme }) => theme.colors.blue} !important;
    border-color: ${({ theme }) => theme.colors.blue} !important;
  }

  span:last-child {
    background: ${({ theme }) => theme.colors.plain} !important;
  }
`;

const CustomSlider = (props: ISliderProps) => {
  return (
    <Wrapper>
      <Slider {...props} />
    </Wrapper>
  );
};

export default CustomSlider;
