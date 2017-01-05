
import React from 'react'
import { Link } from 'react-router'

class Nav extends React.Component {
  render(){
    return (
      <div>

        <div id="nav-container">
          <nav id="nav">

            <div id="nav-brand-outer-container">
              <div id="nav-brand-inner-container">

                <h4 id="nav-brand">
                  <Link to="/about">
                    NLP ME
                  </Link>
                </h4>

                <span id="nav-brand-extension">
                  -- chat with NLP APIs
                </span>
              </div>
            </div>

            <div id="nav-item-container">

              <div className="nav-item" id="nav-item-about">
                <h5>
                  <Link to='/about' activeClassName='active-nav-item'>About</Link>
                </h5>
              </div>

              <div className="nav-item">
                <h5>
                  <Link to='/chat' activeClassName='active-nav-item'>Chat with APIs</Link>
                </h5>
              </div>

            </div>

          </nav>
        </div>

        {this.props.children}

      </div>

    )
  }
}

export default Nav
