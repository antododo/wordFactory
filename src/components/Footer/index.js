import React from 'react';

import './styles.css'

const Footer = function(props){
  return (
    <nav className="footer nav nav-pills nav-fill">
      <a className="nav-item nav-link text-muted" href="https://github.com/pl4ym0re" target="_blank">Github</a>
      <a className="nav-item nav-link text-muted" href="https://about.me/antoine.domergue" target="_blank">About me</a>
      <a className="nav-item nav-link text-muted" href="https://www.linkedin.com/in/antoinedomergue" target="_blank">Linkedin</a>
    </nav>
  )
}

export default Footer
