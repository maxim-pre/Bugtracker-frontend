import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data, onSort, sortColumn, clickable, onSelect }) => {
  return (
    <table className="table table-borderless table-hovered" width="100%">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody
        columns={columns}
        data={data}
        clickable={clickable}
        onSelect={onSelect}
      />
    </table>
  );
};

export default Table;
