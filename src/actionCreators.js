import { v4 } from 'node-uuid'
import * as fakeApi from './fakeApi'

const recieveTodos = ( filter, response ) => (
  { type: 'RECIEVE_TODOS'
  , filter
  , response
  }
)

export const fetchTodos = ( filter ) =>
  fakeApi.fetchTodos( filter ).then( (response) =>
    recieveTodos(filter, response)
  )


export const addTodo = ( text ) => (
  { type: 'ADD_TODO'
  , id: v4()
  , text
  }
)

export const toggleTodo = ( id ) => (
  { type: 'TOGGLE_TODO'
  , id
  }
)
