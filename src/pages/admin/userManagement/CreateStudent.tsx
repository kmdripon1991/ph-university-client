import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const CreateStudent = () => {
  const [addStudent] = useAddStudentMutation();
  // const studentDummyData = {
  //   password: "student123",
  //   student: {
  //     // Personal ifo
  //     name: {
  //       firstName: "Student2",
  //       middleName: "Doe",
  //       lastName: "Smith",
  //     },
  //     gender: "male",
  //     // dateOfBirth: "2001-01-01",
  //     bloodGroup: "A+",

  //     //contact info
  //     email: "student2@gmail.com",
  //     contactNo: "1234567890",
  //     emergencyContactNo: "0987654321",
  //     presentAddress: "123 Main St, City, Country",
  //     permanentAddress: "123 Main St, City, Country",

  //     //guardian info
  //     guardian: {
  //       fatherName: "Mr. Doe",
  //       fatherOccupation: "Engineer",
  //       fatherContactNo: "1234567890",
  //       motherName: "Mrs. Doe",
  //       motherOccupation: "Teacher",
  //       motherContactNo: "0987654321",
  //     },

  //     //local guardian info
  //     localGuardian: {
  //       name: "Mr. Local Guardian",
  //       occupation: "Manager",
  //       contactNo: "1122334455",
  //       address: "456 Local St, City, Country",
  //     },

  //     //academic info
  //     admissionSemester: "677029ff3c3447d71760b437",
  //     academicDepartment: "677023823c3447d71760b434",
  //     isActive: "active",
  //   },
  // };

  const studentDefaultValues = {
    // Personal ifo
    name: {
      firstName: "I am",
      middleName: "a",
      lastName: "Student101",
    },
    gender: "male",
    // dateOfBirth: new Date("2001-01-01"),
    bloodGroup: "A+",

    //contact info
    email: "student102@gmail.com",
    contactNo: "1234567890",
    emergencyContactNo: "0987654321",
    presentAddress: "123 Main St, City, Country",
    permanentAddress: "123 Main St, City, Country",

    //guardian info
    guardian: {
      fatherName: "Mr. Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "1234567890",
      motherName: "Mrs. Doe",
      motherOccupation: "Teacher",
      motherContactNo: "0987654321",
    },

    //local guardian info
    localGuardian: {
      name: "Mr. Local Guardian",
      occupation: "Manager",
      contactNo: "1122334455",
      address: "456 Local St, City, Country",
    },

    //academic info
    // admissionSemester: "677029ff3c3447d71760b437",
    // academicDepartment: "677023823c3447d71760b434",
  };

  //Semester data info
  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);
  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  //Department data info
  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentsQuery(undefined);
  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const studentData = {
      password: "student101",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImg);
    // formData.append("name", "ripon");
    // console.log(Object.fromEntries(formData));
    addStudent(formData);
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          {/* Personal ifo */}
          <Divider>Personal Info.</Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image">
                    <Input
                      type="file"
                      value={value?.fileNme}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              ></Controller>
            </Col>
          </Row>

          {/* Contact info */}
          <Divider>Contact Info.</Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact No." />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact NO."
              />
            </Col>
          </Row>
          {/* Guardian ifo */}
          <Divider>Guardian Info.</Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact No."
              />
            </Col>
          </Row>

          {/* Local Guardian info */}
          <Divider>Local Guardian Info.</Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>

          {/* Academic info */}
          <Divider>Academic Info</Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Academic Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
