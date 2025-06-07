import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ExcEditRow({ item }) {
  const [name, setName] = useState(item.name);
  const [reps, setReps] = useState(item.reps);
  const [weight, setWeight] = useState(item.weight);
  const [unit, setUnit] = useState(item.unit);
  const [date, setDate] = useState(item.date);

  const navigate = useNavigate();

  const submit = async () => {
    const newEdit = { name, reps, weight, unit, date };
    const response = await fetch(`/exercises`, {
      method: "POST",
      body: JSON.stringify(newEdit),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 201) {
      alert("Successfully Edited the Exercise!");
    } else {
      alert(`Failed to Edit, status code = ${response.status}`);
    }
    navigate("/");
  };

  return (
    <div>
      <form id="edit-form" className="edit-info">
        <fieldset>
          <legend>Edit Mode</legend>
          <label>Name</label>
          <input
            id="Name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Reps</label>
          <input
            id="reps"
            type="text"
            autoComplete="off"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <label>Weight</label>
          <input
            id="weight"
            type="text"
            autoComplete="off"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <label>Unit</label>
          <select
            id="unit"
            name="unit"
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value={unit}>{unit}</option>
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
          </select>

          <label>date</label>
          <input
            id="date"
            type="text"
            autoComplete="off"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </fieldset>
        <button
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ExcEditRow;
