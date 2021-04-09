import MaterialIcon from "atoms/materialIcon";
import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 40px;
  border-bottom: 1px solid;
`;

interface IProps {
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const TopBar = ({ onPreviousClick, onNextClick }: IProps) => {
  return (
    <Wrapper className="flex align-items">
      TopBar
      <MaterialIcon onClick={onPreviousClick} size={32} name="arrow_left" />
      <MaterialIcon onClick={onNextClick} size={32} name="arrow_right" />
    </Wrapper>
  );
};

export default TopBar;
