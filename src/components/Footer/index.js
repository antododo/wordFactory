import React from 'react';

const Footer = function(props){
  return (
    <nav className="navbar pure-menu pure-menu-horizontal">
      <div className="pure-g">
        <div className="pure-u-1-3">
          <span
            className="pure-menu-heading">
            Footer</span>
        </div>
        <div className="pure-u-1-3">
          <a
            href="https://github.com/pl4ym0re"
            target="_blank"
            className="pure-menu-heading pure-menu-link">
            Github</a>
        </div>
        <div className="pure-u-1-3">
          <a
            href="https://about.me/antoine.domergue"
            target="_blank"
            className="pure-menu-heading pure-menu-link">
            About me</a>
        </div>
      </div>
    </nav>
  )
}

export default Footer
