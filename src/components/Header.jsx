import React, { useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/clothes-img/logo.png';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CartContext } from '../store/CartContext';
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Dropdown,
} from 'react-bootstrap';
import { auth } from '../config/Config';

const Header = (props) => {
  // const navBarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);
  const handleContentSearch = (value) => {
    setSearchTerm(value);
    // if(!props.onSearch) return;
    // if(searchRef.current){
    //   clearTimeout(searchRef.current);
    // }

    // searchRef.current = setTimeout(() => {
    //   props.onSearch(searchTerm);
    // },369)
  };

  const [state, ] = useContext(CartContext); 
  // console.log(state.shoppingCart.length)

  // useEffect (() => {
  //   dispatch({
  //     type:'view_cart',
  //     payload: {
  //       userID: props.user.UserID
  //     }
  //   })
  // },[])
  // console.log(props.user);
  const history = useHistory();
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!props.onSearch) return;
      else {
        let path = window.location.pathname;
        if (path !== '/catalog') {
          history.push('/catalog');
        }
        props.onSearch(searchTerm);
        // setSearchTerm('');
      }
    }
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       document.body.scrollTop > 50 ||
  //       document.documentElement.scrollTop > 50
  //     ) {
  //       navBarRef.current.classList.add('shrink');
  //     } else {
  //       navBarRef.current.classList.remove('shrink');
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const logout = () => {
    auth.signOut().then(() => {
      history.push('/login');
    });
  };
  return (
    <div className="container-fluid header">
      <div className="row">
        <Navbar
          // ref={navBarRef}
          fixed="top"
          expand="lg"
          variant="dark"
          collapseOnSelect
          className="header__navbar"
        >
          <Container>
            <div className="d-flex header__left">
              <Navbar.Brand href="/" className="fs-1">
                <img className="logo" src={logo} />
                <span className="ps-3">Wendies</span>
              </Navbar.Brand>
              <Form className="d-flex header__left__item">
                <FormControl
                  ref={searchRef}
                  type="search"
                  placeholder="Search"
                  className="search bg-transparent text-white header__left__item__search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => handleContentSearch(e.target.value)}
                  onKeyPress={(e) => handleSearch(e)}
                />
              </Form>
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse className="header__right justify-content-end">
              <Nav className="header__right__link mx-3 my-auto">
                <Link to="/" className="px-3 link">
                  Trang chủ
                </Link>

                <Link to="/catalog" className="px-3 link">
                  Cửa hàng
                </Link>

                <Link to="/contact" className="px-3 link">
                  Liên hệ
                </Link>
                {props.user ? (
                  <Dropdown className="my-account px-3">
                    <Dropdown.Toggle 
                     className='toggle form-control'>
                      <img
                        className="avatar me-2"
                        src={props.user.UserImg}
                        alt=""
                      />
                      <span>{props.user.UserName}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='drop-menu'>
                      <Dropdown.Item as={Link} to="/account">
                        My account
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/order">
                        My order
                      </Dropdown.Item>
                      <hr className='text-white'/>
                      <Dropdown.Item href="/login" onClick={logout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link to="/login" className="px-3 link">
                    Login
                  </Link>
                )}

                <Link to="/cart" className="link">
                  <AiOutlineShoppingCart className="fs-1" />
                  <span className='quantity'>{state.shoppingCart.length}</span>
                  
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
