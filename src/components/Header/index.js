import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <nav className="nav-bar">
      <div>
        <Link to="/" className="item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image-web"
          />
        </Link>
      </div>
      <ul className="unordered-list-container-sm">
        <li className="list-item">
          <Link to="/" className="item">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li className="list-item">
          <Link to="/jobs" className="item">
            <BsBriefcaseFill className="icon" />
          </Link>
        </li>
        <li className="list-item" onClick={onClickLogout}>
          <FiLogOut className="icon" />
        </li>
      </ul>

      <ul className="unordered-list-container-lg">
        <li className="list-item">
          <Link to="/" className="item">
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link to="/jobs" className="item">
            Jobs
          </Link>
        </li>
      </ul>

      <button className="button" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
