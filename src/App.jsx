import { useState } from "react"

const formatDate = (date) => {

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate(); // Сегодняшнее число
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year} (${hour < 10 ? "0" + hour : hour}:${minutes < 10 ? "0" + minutes : minutes})`;
}



function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "Купить продукты",
      checked: false,
      date: new Date(),
    },
    {
      id: 2,
      name: "Сходить к врачу",
      checked: true,
      date: new Date(),
    },
  ]);

  const [value, setValue] = useState("");

  const onChangeHandle = (event) => {
    setValue(event.target.value);
  }

  const onSubmitHandle = (event) => {
    event.preventDefault();

    setTodos([...todos, {
      id: Date.now(),
      name: value,
      checked: false,
      date: new Date(),
    }]);

    setValue('');
  }

  const toggleChecked = (id) => {
    setTodos((prevState) => {
      prevState = [...prevState];

      prevState = prevState.map((todo) => {
        if (id === todo.id) {
          return {
            ...todo,
            checked: !todo.checked
          };
        }

        return todo;
      });

      return prevState;
    });
  }

  const removeTodo = (id) => {
    setTodos((prevState) => {
      prevState = [...prevState];
      prevState = prevState.filter((todo) => todo.id !== id);
      return prevState;
    });
  }


  return (
    <div className="App">
      {/* Контейнер */}
      <div>
        {/* Header */}
        <header>
          <h2>Добавить задачу</h2>
          <form onSubmit={(event) => onSubmitHandle(event)}>
            <input type="text" onChange={(event) => onChangeHandle(event)}
              value={value} placeholder="Например: купить продукты" />

          </form>
        </header>

        {/* Todos */}
        <div className="todos">
          {
            todos.map((todo) => {
              return (
                <div className="todo">

                  <div className="title--todo">
                    <h3>{todo.name}</h3>
                    <p>Дата создания: {formatDate(todo.date)}</p>
                  </div>  

                  <div className="todo-button">
                    <button id="done" onClick={() => { toggleChecked(todo.id) }}>{todo.checked ? "Not Done" : "Done"}</button>
                    <button id="remove" onClick={() => { removeTodo(todo.id) }}>Remove</button>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}


export default App