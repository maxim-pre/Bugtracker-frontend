const ListGroup = ({ items, currentItem, onChange }) => {
  return (
    <ul class="list-group">
      {items.map((item) => (
        <li
          key={item.name}
          className={
            item === currentItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onChange(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
