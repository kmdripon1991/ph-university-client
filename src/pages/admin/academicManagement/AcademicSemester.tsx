import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, TQueryParam } from "../../../types";
import { useState } from "react";

type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

// type TTableData = Pick<TResponse>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery(params);
  // console.log(semesterData);

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // console.log(filters);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) => {
        // console.log(item);
        queryParams.push({ name: "name", value: item });
        setParams(queryParams);
      });
      filters.year?.forEach((item) => {
        queryParams.push({
          name: "year",
          value: item,
        });
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );
  return (
    <div>
      <h1>This is academic Semester</h1>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        onChange={onChange}
      />
    </div>
  );
};

export default AcademicSemester;
