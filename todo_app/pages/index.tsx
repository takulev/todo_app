import type { NextPage } from 'next';
import { Dispatch, FC, useState } from 'react';

type CardType = {
  todo: TodoType
  todos: TodoType[]
  setTodos: Dispatch<TodoType[]>
};

type FormType = {
  todos: TodoType[]
  setTodos: Dispatch<TodoType[]>
};

type TodoType = {
  id: number
  description: string
};

const Card: FC<CardType> = ({ todo, todos, setTodos }) => {
  const [canInput, setCanInput] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const onUpdate = (id: number, _description: string) => {
    setDescription(_description);
    todos.map((todo: TodoType) => {
      if(todo.id === id) todo.description = _description;
      return todo;
    });

    setTodos(todos);
  };

  return (
    <div onClick={(event) => setCanInput(event.target !== event.currentTarget)}>
      {!canInput && <p>{todo.description}</p>}
      {canInput && <input value={description} onInput={(event) => onUpdate(todo.id, event.target.value)} />}
      <button onClick={() => setTodos(todos.filter(_todo => _todo.id !== todo.id))}>Delete</button>
    </div>
  );
};

const Form: FC<FormType> = ({ todos, setTodos }) => {
  const [description, setDescription] = useState('');
  const onSubmit = () => {
    setTodos([...todos, { id: todos.length + 1, description }]);
    setDescription('');
  };

  return (
    <>
      <input value={description} onInput={(event) => setDescription(event.target.value)}></input>
      <button onClick={() => onSubmit()}>SAVE</button>
    </>
  );
};

const Home: NextPage = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  return (
    <div>
      <ul>
        {todos.map((todo: TodoType) => (
          <li key={todo.id}><Card todo={todo} todos={todos} setTodos={setTodos} /></li>
        ))}
      </ul>
      <Form todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Home
