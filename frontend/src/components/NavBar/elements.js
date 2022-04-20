import styled from "styled-components"
import { NavLink as Link } from "react-router-dom"

export const DesktopNavContainer = styled.nav`
  background: transparent;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`

export const NavLink = styled(Link)(({ theme }) => `
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary.main};
  }
`)

export const Bars = styled.div`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 100%);
    font-size: 2.0rem;
    cursor: pointer;
  }
`

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const RightBtnContainer = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavBtnLink = styled.button(({theme}) =>`
  border-radius: 4px;
  background: ${theme.colors.primary.main};
  padding: 10px 22px;
  color: ${theme.colors.primary.textBlack};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  outline: none;
  border: none;

  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${theme.colors.hover.main};
    color: ${theme.colors.hover.textBlack};
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`)