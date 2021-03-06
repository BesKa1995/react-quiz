import React, {Component} from 'react'
import classes from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/quizAction'


class QuizList extends Component {

  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>

            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  componentDidMount() {

    this.props.fetchQuizes()

  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>TEST LIST</h1>

          {
            this.props.loading
              ? <Loader/>
              : <ul>
                {this.renderQuizes()}
              </ul>
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quizReducer.quizes,
    loading: state.quizReducer.loading
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
