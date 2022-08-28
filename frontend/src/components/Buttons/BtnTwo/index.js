import styled from "styled-components"

export const BtnTwo = styled.button(({ theme }) => `
  outline: none;
  border: 1.5px solid ${theme.colors.primary.main};
  border-radius: 30px;
  color: ${theme.colors.primary.textWhite};
  font-size: 1.1rem;
  transition: all 0.2s ease-in-out;
  background: transparent;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${theme.colors.hover.main};
    color: ${theme.colors.hover.textBlack};
  }
`)

export default BtnTwo