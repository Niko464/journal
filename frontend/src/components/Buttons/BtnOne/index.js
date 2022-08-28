import styled from "styled-components"

export const BtnOne = styled.button(({ theme }) => `
  border-radius: 10px;
  background: ${theme.colors.primary.main};
  color: ${theme.colors.primary.textBlack};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  outline: none;
  border: 2px solid transparent;
  //padding: 0.3rem 0.5rem;
  font-size: 1rem;
  margin: 10px;
  text-align: center;
  vertical-align: baseline;
  min-width: 50px;
  width: 100px;
  height: 25px;



  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${theme.colors.hover.main};
    color: ${theme.colors.hover.textBlack};
  }
`)

export default BtnOne