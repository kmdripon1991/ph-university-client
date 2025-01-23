import { Button, Modal, Table, TableColumnsType } from "antd";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse } from "../../../types";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

type TTableData = {
  key: string;
  title: string;
  code: number;
};

const Courses = () => {
  //   const [semesterId, setSemesterId] = useState("");
  const {
    data: courseData,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);
  //   console.log(semesterData);

  //   const [updateStatus] = useUpdateRegisteredSemesterMutation();
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
    console.log(data);
    // const semesterUpdateData = {
    //   id: semesterId,
    //   data: {
    //     status: data.key,
    //   },
    // };
    // // console.log(semesterUpdateData);
    // updateStatus(semesterUpdateData);
  };

  //   const menuProps = {
  //     items,
  //     onClick: handleStatusUpdate,
  //   };

  //   console.log(semesterData?.data);
  const tableData = courseData?.data?.map((course: TCourse) => ({
    key: course._id,
    title: course.title,
    code: course.code,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>This is All Courses</h1>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        // onChange={onChange}
      />
    </div>
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  console.log(facultyInfo);
  const [assignFaculties] = useAssignFacultiesMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  console.log(facultiesData);
  const facultyOptions = facultiesData?.data?.map((faculty) => ({
    value: faculty._id,
    label: `${faculty.name.firstName} ${faculty.name?.middleName} ${faculty.name.lastName}`,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };
  //   const handleOk = () => {
  //     setIsModalOpen(false);
  //   };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (data) => {
    console.log(data);
    const assignFacultiesData = {
      courseId: facultyInfo.key,
      data,
    };
    console.log(assignFaculties);
    assignFaculties(assignFacultiesData);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Assign Faculty
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultyOptions}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
