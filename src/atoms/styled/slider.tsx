import * as React from "react";
import { Slider, ISliderProps } from "@fluentui/react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  span {
    background: rgb(64, 149, 219) !important;
    border-color: rgb(64, 149, 219) !important;
  }

  span:last-child {
    background: white !important;
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
