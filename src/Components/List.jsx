// List.jsx
function List({ label, items, itemKey }) {
    return (
      <ul>
        <label>{label}</label>
        {items.map((item, i) => (
          <li key={i}>{itemKey(item)}</li>
        ))}
      </ul>
    );
  }
  
  export default List;