import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// Sample Data
const students = Array.from({ length: 50 }, (_, index) => {
  const areas = ["Gulshan", "Nazimabad", "Defence", "Malir", "Clifton", "Korangi", "F.B Area", "Model Colony", "Orangi Town", "Gulistan-e-Johar"];
  const names = ["Ahmed", "Ali", "Usman", "Zoya", "Hina", "Iqra", "Faisal", "Laiba", "Saad", "Nimra", "Areeba", "Bilal", "Kashif", "Sara", "Junaid", "Tooba", "Anum", "Danish", "Adnan", "Rania"];
  const surnames = ["Khan", "Raza", "Malik", "Sheikh", "Qureshi", "Tariq", "Asif", "Ahmed", "Rehman", "Waheed", "Mir", "Mirza", "Shah", "Butt", "Yousuf"];

  const name = `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;
  const area = areas[Math.floor(Math.random() * areas.length)];
  return {
    rollNo: 1001 + index,
    name,
    area,
  };
});

// Printable Table
const PrintableTable = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Student List</h2>
    <table border="1" cellPadding="10" cellSpacing="0" width="100%">
      <thead style={{ backgroundColor: "#f0f0f0" }}>
        <tr>
          <th style={{textAlign: "center"}}>Roll No</th>
          <th style={{textAlign: "center"}}>Name</th>
          <th style={{textAlign: "center"}}>Area</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.rollNo}>
            <td style={{textAlign: "center"}}>{student.rollNo}</td>
            <td style={{textAlign: "center"}}>{student.name}</td>
            <td style={{textAlign: "center"}}>{student.area}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

 
const Testing2 = () => {
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Student List",
  });

  return (
    <div style={{ padding: "20px" }}>
      <PrintableTable ref={printRef} />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handlePrint} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Print Table
        </button>
      </div>
    </div>
  );
};

export default Testing2;
