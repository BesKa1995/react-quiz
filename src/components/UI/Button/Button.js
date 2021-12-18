import React from 'react'
import classes from './Button.module.css'


const Button = props => {

  const cls = [classes.Button, classes[props.type]]
  if (props.disabled) {
    cls.push(classes.disabled)
      cls.splice(cls.indexOf(classes[props.type]), 1)

  }
  return (

    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={cls.join(' ')}
    >{props.children}
    </button>
  )
}

export default Button