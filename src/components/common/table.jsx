import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data }) => {
  return (
    <table className="table-borderless" width="100%">
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
