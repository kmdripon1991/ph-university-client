import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const {studentId} = useParams();
//   console.log(params);
  return (
    <div>
      <h1>Hello from student details of {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
