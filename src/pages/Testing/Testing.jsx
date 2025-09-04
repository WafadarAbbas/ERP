import React, { useState } from "react";

export default function Testing() {
  const [item, setItem] = useState("");     // input value
  const [list, setList] = useState([]);     // list ka data

  // add item in list
  const addItem = () => {
    if (item.trim() === "") return; // blank na ho
    setList([...list, item]);       // list update
    setItem("");                    // input clear
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Test Page</h2>

      {/* Input */}
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter something..."
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button onClick={addItem}>Add</button>

      {/* List */}
      <ul style={{ marginTop: "20px" }}>
        {list.map((val, index) => (
          <li key={index}>{val}</li>
        ))}
      </ul>
    </div>
  );
}
