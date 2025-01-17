import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { AdminPaths } from "../../routes/admin.routes";
import { FacultyPaths } from "../../routes/faculty.routes";
import { StudentPaths } from "../../routes/student.routes";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";

const { Sider } = Layout;

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  let sidebarItems;
  const userRole = {
    Admin: "admin",
    Faculty: "faculty",
    Student: "student",
  };
  switch (user!.role) {
    case userRole.Admin:
      sidebarItems = sidebarItemsGenerator(AdminPaths, userRole.Admin);
      break;
    case userRole.Faculty:
      sidebarItems = sidebarItemsGenerator(FacultyPaths, userRole.Faculty);
      break;
    case userRole.Student:
      sidebarItems = sidebarItemsGenerator(StudentPaths, userRole.Student);
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH University</h1>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
