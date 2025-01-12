import OfferedCourses from "../pages/faculty/OfferedCourses";
import StudentDashboard from "../pages/student/StudentDashboard";

export const StudentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Student",
    path: "offered-courses",
    element: <OfferedCourses />,
  },
];
