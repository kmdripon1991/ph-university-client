import { useGetAllSemestersQuery } from "../../../redux/features/academicManagement/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>This is academic management</h1>
    </div>
  );
};

export default AcademicSemester;
