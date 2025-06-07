import ExcTable from "../components/ExcTable";
import { useState, useEffect } from "react";

function HomePage({ editItem }) {
  const [exercises, setExercises] = useState([]);

  const loadItems = async () => {
    const response = await fetch("/exercises");

    const result = await response.json();
    setExercises(result);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const deleteItem = async (id) => {
    const response = await fetch(`/exercises/${id}`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      console.log("deleted " + id);
      setExercises(exercises.filter((e) => e._id !== id));
    } else {
      console.log("failed to delete " + id);
    }
  };

  return (
    <>
      <h2>Welcome!</h2>
      <ExcTable items={exercises} editItem={editItem} deleteItem={deleteItem} />
    </>
  );
}

export default HomePage;
