import { SidebarContainer, Icon, CloseIcon, SideBtnWrapper, SidebarMenu, SidebarLink, SidebarWrapper, SidebarBtn } from "./elements"
import { useNavigate } from "react-router-dom"
import * as cookies from "Cookies"
import Theme from "Theme"


const SideMenu = ({ isOpen, toggle }) => {
  const navigate = useNavigate()
  return (
    <Theme>
      <SidebarContainer isOpen={isOpen}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          <SidebarMenu>
            <SidebarLink to="/">Home</SidebarLink>
            <SidebarLink to="/topics">Topics</SidebarLink>
            <SidebarLink to="/history">History</SidebarLink>
          </SidebarMenu>
          <SideBtnWrapper>
            <SidebarBtn onClick={() => {
              cookies.removeUserCookie()
              navigate("/login");
            }}>Logout</SidebarBtn>
          </SideBtnWrapper>
        </SidebarWrapper>
      </SidebarContainer>
    </Theme>
  )
}

export default SideMenu;