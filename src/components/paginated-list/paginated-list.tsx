import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";

interface Props {
  total: number;
  totalPerPageDefault?: number;
  columns: ColumnsType<any>;
  dataSource: any[];
  onSelectRow?: any;
}

const PaginatedList: React.FC<Props> = (props) => {
  const {
    total = 1,
    totalPerPageDefault = 10,
    columns,
    dataSource = [],
    onSelectRow = Function,
  } = props;
  const [totalPerPage, setTotalPerPage] = useState(totalPerPageDefault);

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
        style={{cursor: 'pointer'}}
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
