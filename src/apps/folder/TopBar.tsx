import MaterialIcon from "atoms/materialIcon";
import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 40px;
  border-bottom: 1px solid;
  justify-content: space-between;
`;

interface IProps {
  onPreviousClick: () => void;
  onNextClick: () => void;
  onCloseClick: () => void;
}

const TopBar = ({ onPreviousClick, onNextClick, onCloseClick }: IProps) => {
  return (
    <Wrapper className="flex align-items-center">
      <div className="flex align-items-center">
        <MaterialIcon onClick={onPreviousClick} size={32} name="arrow_left" />
        <MaterialIcon onClick={onNextClick} size={32} name="arrow_right" />
      </div>
      <div className="flex align-items-center">
        <MaterialIcon onClick={onCloseClick} size={24} name="close" />
      </div>
    </Wrapper>
  );
};

export default TopBar;
