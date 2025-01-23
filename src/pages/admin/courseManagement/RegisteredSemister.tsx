import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { TSemester } from "../../../types";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { registrationStatus } from "../../../constant/semester";
import { useState } from "react";

type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = registrationStatus.map((item) => ({
  label: item,
  key: item,
}));

const RegisteredSemester = () => {
  const [semesterId, setSemesterId] = useState("");
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);
  //   console.log(semesterData);

  const [updateStatus] = useUpdateRegisteredSemesterMutation();
  //   const onChange: TableProps<TTableData>["onChange"] = (
  //     _pagination,
  //     filters,
  //     _sorter,
  //     extra
  //   ) => {
  //     // console.log(filters);
  //     if (extra.action === "filter") {
  //       const queryParams: TQueryParam[] = [];
  //       filters.name?.forEach((item) => {
  //         // console.log(item);
  //         queryParams.push({ name: "name", value: item });
  //         setParams(queryParams);
  //       });
  //       filters.year?.forEach((item) => {
  //         queryParams.push({
  //           name: "year",
  //           value: item,
  //         });
  //       });
  //     }
  //   };

  const handleStatusUpdate = (data: { key: string }) => {
    const semesterUpdateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    // console.log(semesterUpdateData);
    updateStatus(semesterUpdateData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  //   console.log(semesterData?.data);
  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMM"),
      endDate: moment(new Date(endDate)).format("MMM"),
      status,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "Upcoming") {
          color = "blue";
        }
        if (item === "Ongoing") {
          color = "green";
        }
        if (item === "Ended") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <div>
            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button onClick={() => setSemesterId(item.key)}>
                Change Status
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>This is academic Semester</h1>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        // onChange={onChange}
      />
    </div>
  );
};

export default RegisteredSemester;
