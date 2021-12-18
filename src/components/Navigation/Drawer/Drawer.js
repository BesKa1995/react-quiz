import React, {Component} from 'react'

import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from 'react-router-dom'

class Drawer extends Component {

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>

          <NavLink
            to={link.to}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>

        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]
    const links = []
    console.log(this.props.isAuthenticated)
    if (this.props.isAuthenticated) {
      links.push({to: '/', label: 'Quiz List'})
      links.push({to: '/quiz-creator', label: 'Create Test'})
      links.push({to: '/logout', label: 'Log out'})

    } else {

      links.push({to: '/', label: 'Quiz List'})
      links.push({to: '/auth', label: 'Auth'})
    }

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClose={this.props.onClose}/> : null}
      </React.Fragment>

    )
  }
}


export default Drawer
