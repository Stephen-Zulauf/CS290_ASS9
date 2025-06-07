import ExcEditRow from "../components/ExcEditRow";

function EditPage({ item }) {
  return (
    <>
      <h2>EditPage id: {item.id}</h2>
      <ExcEditRow item={item} />
    </>
  );
}

export default EditPage;
