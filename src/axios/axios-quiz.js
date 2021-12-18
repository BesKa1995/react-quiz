import axios from 'axios'

export default axios.create({
  baseURI:'https://react-quiz-ded8b-default-rtdb.firebaseio.com/'
  // baseURI: 'https://react-quiz-ded8b-default-rtdb.firebaseio.com/',
})