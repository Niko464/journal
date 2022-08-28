import styled from "styled-components"

const Description = styled.p(({ theme }) => `
  color: ${theme.colors.subtitle};
  margin-left: 1rem;
  margin-top: 0;
  margin-bottom: 0rem;
`)

export default Description;