import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate()
  const navbar = useRef()
  const hamburger = useRef()

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  return (
    <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
           <h1 className="title is-4"></h1>
        </a>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {
            token
              ?
              <Link to="/posts" className="navbar-item">All Posts</Link>
              :
              ""
          }
           {
            token
              ?
              <Link to="/createpost" className="navbar-item">New Posts</Link>
              :
              ""
          }
          {
            token
              ?
              <Link to="/myposts" className="navbar-item">My Posts</Link>
              :
              ""
          }
          {
            token
              ?
              <Link to="/categories" className="navbar-item">Category Manager</Link>
              :
              ""
          }
          {
            token
              ?
              <Link to="/tags" className="navbar-item">Tag Manager</Link>
              :
              ""
          }
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                token
                  ?
                  <button className="button is-outlined" onClick={() => {
                    setToken('')
                    navigate('/login')
                  }}>Logout</button>
                  :
                  <>
                    <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
