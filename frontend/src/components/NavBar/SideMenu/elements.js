import styled from 'styled-components'
import {FaTimes} from 'react-icons/fa'
import { Link } from "react-router-dom"

export const SidebarContainer = styled.div(({isOpen}) => `
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: #0d0d0d;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: all 0.3s ease-in-out;

    opacity: ${isOpen ? '100%' : '0'};
    top: ${isOpen ? '0' : '-100%'};
`)

export const CloseIcon = styled(FaTimes)(({theme}) => `
    color: #fff;
`)

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`

export const SidebarWrapper = styled.div`
    color: #fff;
`

export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 80px);
    text-align: center;
    padding: 0;
    list-style-type: none;
`

export const SidebarLink = styled(Link)(({theme}) => `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: all 0.2s ease-in-out;
    color: #fff;
    cursor: pointer;

    &:hover {
        color: ${theme.colors.primary.main};
        transition: all 0.2s ease-in-out;
    }
`)

export const SideBtnWrapper = styled.div`
    display: flex;
    justify-content: center;
`

export const SidebarBtn = styled.button(({theme}) => `
    border-radius: 50px;
    background: ${theme.colors.primary.main};
    white-space: nowrap;
    padding: 16px 64px;
    color: ${theme.colors.primary.textBlack};
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        background: ${theme.colors.hover.main};
        transition: all 0.2s ease-in-out;
        color: ${theme.colors.hover.textBlack};
    }
`)