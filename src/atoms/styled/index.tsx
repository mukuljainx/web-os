import styled from "styled-components";

export const Acrylic = styled.div`
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255, 255, 255, 0.6);"
      : "rgba(0, 0, 0, 0.5);"};
  backdrop-filter: blur(10px);
`;
