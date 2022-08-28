import styled from "styled-components"

const Title = styled.h1(({ theme }) => `
  color: ${theme.colors.title};
  margin: 1rem;
`)

export default Title;