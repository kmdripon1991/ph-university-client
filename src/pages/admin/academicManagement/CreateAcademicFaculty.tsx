import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { academicFacultyOptions } from "../../../constant/global";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicFacultiesMutation } from "../../../redux/features/admin/academicManagement.api";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultiesMutation();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    addAcademicFaculty(data);
  };
  return (
    <div>
      <h1>This is create Academic faculty</h1>
      <Row>
        <Col span={12}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              options={academicFacultyOptions}
              name="name"
              label="Academic Faculty"
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAcademicFaculty;
