import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/clothes-img/logo.png';
import {
  AiOutlineShoppingCart,
} from 'react-icons/ai';

import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
const navBar = [
  { display: 'Trang chủ', path: '/' },
  { display: 'Cửa hàng', path: '/catalog' },
  { display: 'Tài khoản', path: '/account' },
  { display: 'Liên hệ', path: '/contact' },
];

const Header = () => {
  const navBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () =>{
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        navBarRef.current.classList.add('shrink');
      } else {
        navBarRef.current.classList.remove('shrink');
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container-fluid header">
      <div className="row">
        <Navbar
          ref={navBarRef}
          fixed="top"
          expand="lg"
          variant="dark"
          collapseOnSelect
          className="header__navbar"
        >
          <Container>
            <div className="d-flex header__left">
              <Navbar.Brand href="#home" className="fs-1">
                <img className="logo" src={logo} />
                <span className="ps-3">Wendies</span>
              </Navbar.Brand>
              <Form className="d-flex header__left__item">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="search bg-transparent text-white header__left__item__search"
                  aria-label="Search"
                />
              </Form>
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse className="header__right justify-content-end">
              <Nav className="header__right__link mx-3 my-auto">
                {navBar.map((item, index) => (
                  <Link className="px-3 link" key={index} to={item.path}>
                    {item.display}
                  </Link>
                ))}
                <Link to="/cart" className="link">
                  <AiOutlineShoppingCart className="fs-1" />
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
