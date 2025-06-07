import ExcRow from "./ExcRow";
function ExcTable({ items, editItem, deleteItem }) {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>reps</th>
          <th>weight</th>
          <th>unit</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <ExcRow
            item={item}
            editItem={editItem}
            key={index}
            deleteItem={deleteItem}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ExcTable;
