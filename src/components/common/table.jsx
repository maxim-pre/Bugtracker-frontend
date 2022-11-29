import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data, onSort, sortColumn }) => {
  return (
    <table className="table table-borderless table-hovered" width="100%">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
