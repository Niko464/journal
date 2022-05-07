
import { DesktopNavContainer, NavLink, Bars, NavMenu, RightBtnContainer, NavBtnLink } from "./elements"
import Theme from "Theme"
import * as cookies from "Cookies"
import { useNavigate } from "react-router-dom"
import SideMenu from "./SideMenu"
import { FaBars } from "react-icons/fa"
import { useState } from "react"

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setOpen(!isOpen);
  }
  return (
    <div style={{height: "120px", marginTop: "10px"}}>
      <Theme>
        <DesktopNavContainer>
          <NavLink to="/">
            <img src={"logo.png"} width={64} alt="logo" />
          </NavLink>
          <Bars onClick={toggle}>
            <FaBars />
          </Bars>
          <NavMenu>
            <NavLink to="/">
              Home
            </NavLink>
            <NavLink to="/topics">
              Topics
            </NavLink>
            <NavLink to="/history">
              History
            </NavLink>
          </NavMenu>
          <RightBtnContainer>
            <NavBtnLink onClick={() => {
              cookies.removeUserCookie()
              navigate("/login");
            }}>
              Logout
            </NavBtnLink>
          </RightBtnContainer>
        </DesktopNavContainer>
        <SideMenu isOpen={isOpen} toggle={toggle} />
      </Theme>
    </div>
  )
}

export default Navbar