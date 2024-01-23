import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleAPI";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [warning, setWarning] = useState(""); // New state for warning

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const handleAddOrUpdate = async () => {
    try {
      if (!text.trim()) {
        // Check if text is empty or contains only whitespace
        setWarning("Task cannot be empty");
        return;
      }

      if (isUpdating) {
        await updateToDo(toDoId, text, setToDo, setText, setIsUpdating);
      } else {
        await addToDo(text, setText, setToDo);
      }
      
      setIsUpdating(false);
      setText("");
      setWarning(""); // Clear the warning after successful add/update
    } catch (error) {
      console.error("Error adding/updating todo:", error);
      setIsUpdating(false);
      setText("");
      setWarning("");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>TaskTrek</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add"
            onClick={handleAddOrUpdate}
          >
            {isUpdating ? "Update" : "Add"}
          </div>

        </div>

        {warning && <div className="warning">{warning}</div>}

        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
