import React from 'react'

const ToDoItem = (props) => {
  return (
    <div className='todo'>
        <div>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
      </div>
      <div>
        <input onChange={()=>props.updateHandler(props.id)} type='checkbox' checked={props.isCompleted}/>
        <button onClick={()=>props.deleteHandler(props.id)} className='btn' type='submit'>Delete</button>
      </div>
    </div>
  )
}

export default ToDoItem