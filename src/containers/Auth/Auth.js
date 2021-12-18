import React, {Component} from 'react'
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/authAction'

 class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'email',
        errorMessage: 'enter correct email',
        valid: false,
        touched: false,
        validation: {
          require: true,
          email: true,

        }
      },

      password: {
        value: '',
        type: 'password',
        label: 'password',
        errorMessage: 'enter correct password',
        valid: false,
        touched: false,
        validation: {
          require: true,
          minLength: 6

        }
      }
    }

  }

  submitHandler = event => {
    event.preventDefault()
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )


  }


  validate = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== ''
    }

    if (validation.email) {
      isValid = is.email(value)
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid
  }
  onChangeHandler = (event, controlName) => {

    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}
    control.value = event.target.value
    control.touched = true
    control.valid = this.validate(control.value, control.validation)
    formControls[controlName] = control
    let isFormValid = true
    for (const key in formControls) {
      isFormValid = formControls[key].valid && isFormValid
    }
    this.setState({formControls, isFormValid})
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          label={control.label}
          errorMessage={control.errorMessage}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Registration</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>

            {this.renderInputs()}

            <Button
              type={'success'}
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Log in
            </Button>

            <Button
              type={'primary'}
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    )
  }
}



function mapDispatchToProps(dispatch) {
  return{
    auth: (email,password,isLogin) => dispatch(auth(email,password,isLogin))
  }
}

export default connect(null,mapDispatchToProps)(Auth)