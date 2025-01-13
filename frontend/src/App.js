import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    // axios
    //   .get("http://localhost:4000/api/")
    //   .then(({ data }) => data)
    //   .then((data) => {
    //     console.log(data);
    //     setList(data);
    //   });
  }, []);

  return (
    <div className="App">
      <h1>하이하이</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios.post("/api/value", { value }).then((res) => {
            if (res.data.success) {
              setList([...list, value]);
              setValue("");
            } else {
              alert("실패");
            }
          });
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Enter your item"
        />
        <button>확인</button>
      </form>

      <div className="list">
        <ul>
          {list.map((item, index) => (
            <li className="item" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
