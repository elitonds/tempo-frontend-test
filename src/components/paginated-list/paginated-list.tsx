import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface Props {
  total: number;
  totalPerPage?: number;
  columns: ColumnsType<any>;
  dataSource: any[];
  onSelectRow?: any;
}

const PaginatedList: React.FC<Props> = (props) => {
  const {
    total = 1,
    totalPerPage = 10,
    columns,
    dataSource = [],
    onSelectRow = () => {},
  } = props;

  return (
    <>
      <Table
        className="col-md-12 mt-2"
        dataSource={dataSource}
        columns={columns}
        pagination={{
          total: total,
          defaultCurrent: 1,
          pageSize: totalPerPage,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              onSelectRow(record);
            },
          };
        }}
      />
    </>
  );
};

export default PaginatedList;
