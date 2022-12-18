const ListGroup = ({ items, currentItem, onChange }) => {
  return (
    <div className="mb-3">
      <ul class="list-group list-group-horizontal">
        {items.map((item) => (
          <li
            key={item.name}
            className={
              item === currentItem
                ? "list-group-item d-flex justify-content-between align-items-center project-filter-options clickable"
                : "list-group-item d-flex justify-content-between align-items-center project-filter-options clickable"
            }
            onClick={() => onChange(item)}
          >
            {item.name}
            <span
              class={
                item === currentItem
                  ? "badge badge-pill"
                  : "badge badge-primary badge-pill"
              }
            >
              {item.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
