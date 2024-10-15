import React, { useContext } from "react"
import { Link } from "react-router-dom"
import StateContext from "../StateContext"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderLoggedOut from "./HeaderLoggedOut"

function Header(props) {
  const appState = useContext(StateContext)

  return (
    <header className="header-bar mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white font-weight-bold text-decoration-none">
            Thoughts by Posts
          </Link>
        </h4>
        {appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
      </div>
    </header>
  )
}

export default Header
