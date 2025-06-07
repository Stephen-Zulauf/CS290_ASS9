import { FaPencil, FaDeleteLeft } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";

function ExcRow({ item, editItem, deleteItem }) {
  return (
    <>
      <tr className="order-row">
        <td>{item.name}</td>
        <td>{item.reps}</td>
        <td>{item.weight}</td>
        <td>{item.unit}</td>
        <td>{item.date}</td>
        <td>
          <Link to="/Edit">
            <FaPencil onClick={() => editItem(item)} />
          </Link>
        </td>
        <td>
          <Link to="/">
            <FaDeleteLeft onClick={() => deleteItem(item._id)} />
          </Link>
        </td>
      </tr>
    </>
  );
}

export default ExcRow;
