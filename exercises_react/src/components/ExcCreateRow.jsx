import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ExcCreateRow() {
  const [cName, setCName] = useState("Deadlift");
  const [cReps, setCReps] = useState(1000);
  const [cWeight, setCWeight] = useState(500);
  const [cUnit, setCUnit] = useState("kgs");
  const [cDate, setCDate] = useState("04-20-15");

  const navigate = useNavigate();

  const submit = async () => {
    const newExc = {
      name: cName,
      reps: cReps,
      weight: cWeight,
      unit: cUnit,
      date: cDate,
    };
    const response = await fetch(`/exercises`, {
      method: "POST",
      body: JSON.stringify(newExc),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 201) {
      alert("Exercise Created!");
    } else {
      alert(`Failed to Create Exercise, status code = ${response.status}`);
    }
    navigate("/");
  };

  return (
    <div>
      <form id="create-form" className="create-info">
        <fieldset>
          <legend>Create Mode</legend>
          <label>Name</label>
          <input
            type="text"
            value={cName}
            onChange={(e) => setCName(e.target.value)}
          />
          <label>Reps</label>
          <input
            type="text"
            value={cReps}
            onChange={(e) => setCReps(e.target.value)}
          />
          <label>Weight</label>
          <input
            type="text"
            value={cWeight}
            onChange={(e) => setCWeight(e.target.value)}
          />
          <label>Unit</label>
          <select
            id="unit"
            name="unit"
            onChange={(e) => setCUnit(e.target.value)}
          >
            <option value="kgs">kgs</option>
            <option value="lbs">lbs</option>
          </select>

          <label>date</label>
          <input
            type="text"
            value={cDate}
            onChange={(e) => setCDate(e.target.value)}
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

export default ExcCreateRow;
