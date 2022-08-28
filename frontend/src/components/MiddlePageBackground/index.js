import styled from "styled-components"

const MiddlePageBackground = styled.div(({ theme }) => `
  display: flex;
  flex-direction: column;
  background: ${theme.colors.middleground};
  max-width: 900px;
  width: 100%;
  border-radius: 5px;
  margin-left: 20px;
  margin-right: 20px;

  @media screen and (min-width: 900px) {
    width: 900px;
  }
`)

export default MiddlePageBackground;