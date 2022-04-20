import styled from "styled-components"
import { Link } from "react-router-dom"

export const Wrapper = styled.div(({ theme }) => `
  display: flex;
  flex-direction: column;
  background: ${theme.colors.middleground};
  max-width: 900px;
  width: 100%;
  border-radius: 5px;

  @media screen and (min-width: 900px) {
    width: 900px;
  }
`)

export const TopicsList = styled.div`
  display: flex;
`

export const TopicsTitle = styled.h1(({ theme }) => `
  color: ${theme.colors.title};
  margin: 1rem;
`)

export const TopicsDescription = styled.body(({theme}) => `
  color: ${theme.colors.subtitle};
  margin: 0rem 0rem 1rem 1rem;
`)

export const TopicWrapper = styled.div(({ theme }) => `
  display: flex;
`)

export const TopicElem = styled.p(({ theme }) => `
  color: ${theme.colors.primary.textWhite};
  border-radius: 10px;
  font-size: 1.1rem;
  background: transparent;
  outline: none;
  border: solid .1rem;
  margin: 5px;
`)

export const TopicElemDel = styled.button(({ theme}) => `

`)

export const AddTopicBtn = styled(Link)(({ theme }) => `
  border-radius: 10px;
  background: ${theme.colors.primary.main};
  color: ${theme.colors.primary.textBlack};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  outline: none;
  border: none;
  padding: 0.3rem 0.5rem;
  font-size: 1rem;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${theme.colors.hover.main};
    color: ${theme.colors.hover.textBlack};
  }
`)