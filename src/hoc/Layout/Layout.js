import React, {Component} from 'react'

import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import {connect} from 'react-redux'
import Drawer from '../../components/Navigation/Drawer/Drawer'

class Layout extends Component {

  state = {
    menu: false
  }

  toggleMenuHandler = props => {
    this.setState({menu: !this.state.menu})
  }
  menuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {

    return (
      <div className={classes.Layout}>

        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} isAuthenticated={this.props.isAuthenticated}/>

        <main>
          {this.props.children}
        </main>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.authReducer.token
  }
}

export default connect(mapStateToProps)(Layout)
