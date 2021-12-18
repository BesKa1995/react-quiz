import React, {Component} from 'react'
import classes from './QuizCreator.module.css'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from '../../from/formFramework'
import Select from "../../components/UI/Select/Select";
import {connect} from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/createQuizAction'

function createOptionControl(number) {
  return createControl({
    label: `Variant ${number}`,
    errorMessage: 'value cant be empty',
    id: number,


  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'enter the question',
      errorMessage: 'question cant be empty',

    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }

}

class QuizCreator extends Component {

  state = {
    isFormValid: false,
    rightAnswerId: 1,

    formControls: createFormControls()
  }
  submitHandler = event => {
    event.preventDefault()
  }
  addQuestionHandler = event => {
    event.preventDefault()

    const id = this.props.quiz.length + 1
    console.log('id',id)
    const questionItem = {
      question: this.state.formControls.question.value,
      id: id,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: this.state.formControls.option1.value, id: this.state.formControls.option1.id},
        {text: this.state.formControls.option2.value, id: this.state.formControls.option2.id},
        {text: this.state.formControls.option3.value, id: this.state.formControls.option3.id},
        {text: this.state.formControls.option4.value, id: this.state.formControls.option4.id},
      ]
    }
    this.props.createQuizQuestion(questionItem)
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()

    })

  }
  createQuizHandler = event => {
    event.preventDefault()



    this.setState({
      quiz: [],
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()

    })
    this.props.finishCreateQuiz()

  }
  changeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = event.target.value
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control
    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })

  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
        <React.Fragment key={controlName + index}>
          <Input

            label={control.label}
            // type={'text'}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event, controlName)}
          />

          {index === 0 ? <hr/> : null}
        </React.Fragment>

      )
    })

  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: event.target.value
    })
  }

  render() {

    const select = <Select
      label={'Select right answer'}
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      oprtions={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4},
      ]}
    />
    return (
      <div className={classes.QuizCreator}>


        <form onSubmit={this.submitHandler}>
          <h1>Test creating</h1>
          {this.renderControls()}

          {select}
          <Button
            type={'primary'}
            onClick={this.addQuestionHandler}
            disabled={!this.state.isFormValid}
          >
            Add Questions
          </Button>

          <Button
            type={'success'}
            onClick={this.createQuizHandler}
            disabled={this.props.quiz.length === 0}

          >
            Create Test
          </Button>

        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quizCreateReducer.quiz
  }
}


function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)