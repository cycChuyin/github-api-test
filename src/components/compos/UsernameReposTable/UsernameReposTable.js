import React from "react";
import { Button, Table } from "antd";
import moment from "moment";

function UsernameReposTable({ dataSource }) {
  const columns = [
    {
      title: "Index",
      key: "index",
      render: (_, record, index) => index + 1,
    },

    {
      title: "Repo Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (_, record) => {
        moment(record.updated_at).format("YYYY-MM-DD");
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        console.log("----record", record);
        return (
          <Button type='link' key={record.id}>
            View Detail
          </Button>
        );
      },
    },
  ];

  return (
    <Table key='UsernameReposTable' dataSource={dataSource} columns={columns} />
  );
}

export default UsernameReposTable;
