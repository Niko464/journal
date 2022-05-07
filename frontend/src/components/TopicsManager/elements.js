import styled from "styled-components"
import { Link } from "react-router-dom"

export const Wrapper = styled.div(({ theme }) => `
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

export const TopicsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`

export const TopicsTitle = styled.h1(({ theme }) => `
  color: ${theme.colors.title};
  margin: 1rem;
`)

export const TopicsDescription = styled.p(({ theme }) => `
  color: ${theme.colors.subtitle};
  margin: 0rem 0rem 1rem 1rem;
`)

export const TopicWrapper = styled.div(({ theme }) => `
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 7px 3px;
  border: 2px solid ${theme.colors.subtitle};

  &:hover {
    border: 2px solid ${theme.colors.primary.main};
  }
`)

export const TopicElem = styled.p(({ theme }) => `
  /*color: ${theme.colors.primary.textBlack};
  border-radius: 10px;
  font-size: 1.2rem;
  background: ${theme.colors.primary.main};
  outline: none;
  border: solid 1.5px ${theme.colors.title};
  padding: 1px 5px;
  margin: 5px;*/

  color: white;
  border: none;
  font-size: 1.2rem;
  outline: none;
  margin: 5px;
`)

export const TopicElemDel = styled.button(({ theme }) => `
  background: transparent;
  //border: 2px solid ${theme.colors.primary.main};
  border: none;
  border-radius: 50px;
  color: white;
  padding-top: 0.3rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    //border-color: #f04747;
    color: #f04747
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

export const TextBox = styled.input(({ theme }) => `
  background: #1B1D23;
  border-radius: 10px;
  color: ${theme.colors.primary.textWhite};
  font-size: 1.1rem;
  outline: none;
  border: solid 1.5px transparent;
  padding-left: 10px;

  margin-bottom: 15px;

  &:focus {
    border: solid 1.5px ${theme.colors.primary.main};
  }

  ::placeholder {
    color: ${theme.colors.subtitle};
  }
`)

export const CreateBtn = styled.button(({ theme }) => `
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