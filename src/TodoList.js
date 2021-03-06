import React from 'react'
import Todo from './Todo'
import { connect } from 'react-redux'
import * as actions from './actionCreators'
import { withRouter } from 'react-router'
import { getVisibleTodos } from './stateManagement/reducers/todoApp'

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    { todos.map( todo => (
      <Todo key={ todo.id }
        { ...todo }
        onClick={ () => onTodoClick(todo.id) }
      />

    )) }
  </ul>
)

let VisibleTodoList = React.createClass({

  componentDidMount () {
    this.updateTodos()
  },

  componentDidUpdate (prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.updateTodos()
    }
  },

  updateTodos () {
    const { filter, fetchTodos } = this.props

    fetchTodos(filter)
  },

  render () {
    const { toggleTodo, ...rest } = this.props
    return (
      <TodoList
        { ...rest }
        onTodoClick={ toggleTodo }
      />
    )
  }
})

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'

  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick: id => {
//     dispatch( toggleTodo(id) )
//   }
// })

VisibleTodoList = withRouter( connect(
  mapStateToProps,
  actions
  // mapDispatchToProps
)(VisibleTodoList) )

// const VisibleTodoList = React.createClass({
//
//   componentDidMount () {
//     const { store } = this.context
//     this.unsubscribe = store.subscribe( () => {
//       this.forceUpdate()
//     })
//   },
//
//   componentWillUnmount () {
//     this.unsubscribe()
//   },
//
//   render () {
//     const { store } = this.context
//     const state = store.getState()
//
//     return (
//       <TodoList
//         todos={ getVisibleTodos(state.visibilityFilter, state.todos) }
//         onTodoClick={ id => {
//           store.dispatch(
//             { type: 'TOGGLE_TODO'
//             , id
//             }
//           )
//         }}
//       >
//
//       </TodoList>
//     )
//   }
// })
//
// VisibleTodoList.contextTypes = {
//   store: React.PropTypes.object
// }

export default VisibleTodoList
