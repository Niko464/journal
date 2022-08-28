import styled from "styled-components"
import { Link } from "react-router-dom"



export const TopicElem = styled.button(({ theme, selected }) => `
  color: ${selected ? theme.colors.primary.main : theme.colors.primary.textWhite};
  border-radius: 10px;
  font-size: 1.1rem;
  background: transparent;
  outline: none;
  border: solid .1rem;
  margin: 5px;
  //padding-right: 25px;
  cursor: pointer;

  &:focus {
    border-color: ${theme.colors.primary.main};
  }
`)

export const TopicElemClose = styled.p(({ theme, selected }) => `
  color: ${theme.colors.primary.textWhite};
  margin-left: 5px;
  display: ${selected ? "inline" : "none"};
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
  margin-left: 5px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${theme.colors.hover.main};
    color: ${theme.colors.hover.textBlack};
  }
`)