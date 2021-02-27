import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  todoList,
  createTodo,
  deleteTodo,
  deleteAll,
} from './scheduleSlice';

const Schedule = () => {
  const _todoList = useSelector(todoList);
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    if (id === "title") {
      setTitle(value);
    } else {
      setContent(value);
    }
  };

  const handleSaveClick = () => {
    if (!title.length || !content.length) {
      return alert("제목 또는 내용은 필수입니다.")
    }
    const newTodo = {
      title,
      content,
    };

    dispatch(createTodo(newTodo))
    setTitle("");
    setContent("")
  };

  const handleDeleteClick = (index: number) => {
    dispatch(deleteTodo(index));
  };

  const handleDeleteAllClick = () => {
    dispatch(deleteAll());
  };

  return (
    <div>
      <h1>TODO</h1>
      <div>
        <label style={{ marginRight: 5 }}>제목</label>
        <input id="title" type="text" value={title} onChange={handleInputChange} style={{ margin: '10px auto' }} />
      </div>
      <div>
        <label style={{ marginRight: 5 }}>내용</label>
        <input id="content" type="text" value={content} onChange={handleInputChange} style={{ margin: '10px auto' }} />
      </div>
      <button onClick={handleSaveClick} style={{ display: "block", margin: '10px auto' }}>저장하기</button>
      <button onClick={handleDeleteAllClick} style={{ display: "block", margin: '10px auto' }}>전체삭제</button>
      {_todoList.map((_todo, index: number) => <div key={index} style={{ padding: 10, margin: '10px auto', border: '1px solid black', width: 400 }}>
        <div>제목: {_todo.title}</div>
        <div>내용: {_todo.content}</div>
        <button onClick={() => handleDeleteClick(index)}>삭제</button>
      </div>)}
    </div>
  )
}

export default Schedule;