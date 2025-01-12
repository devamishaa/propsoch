import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { IoMdMap } from "react-icons/io";
import { FiUser } from "react-icons/fi";

// Styled components
const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  align-items: center;
  background: #fff;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #ffa154;

    .nav-icon {
      color: #ffa154;
    }
  }
`;

const NavIcon = styled.div`
  font-size: 24px;
  color: #636262;
  margin-bottom: 4px;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <NavItem to="/">
        <NavIcon className="nav-icon">
          <AiOutlineSearch />
        </NavIcon>
        <span>Explore</span>
      </NavItem>
      <NavItem to="/wishlist">
        <NavIcon className="nav-icon">
          <AiOutlineHeart />
        </NavIcon>
        <span>Wishlists</span>
      </NavItem>
      <NavItem to="/map">
        <NavIcon className="nav-icon">
          <IoMdMap />
        </NavIcon>
        <span>Show Map</span>
      </NavItem>
      <NavItem to="/login">
        <NavIcon className="nav-icon">
          <FiUser />
        </NavIcon>
        <span>Login</span>
      </NavItem>
    </NavbarContainer>
  );
}

export default Navbar;
