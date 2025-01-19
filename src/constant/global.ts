const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = monthNames.map((month) => ({
  value: month,
  label: month,
}));

const genderName = ["Male", "Female", "Others"];
export const genderOptions = genderName.map((gender) => ({
  value: gender,
  label: gender,
}));

const bloodGroupName = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const bloodGroupOptions = bloodGroupName.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));

const academicFaculties = [
  "Faculty of Arts",
  "Faculty of Science",
  "Faculty of Engineering",
  "Faculty of Business",
  "Faculty of Medicine",
  "Faculty of Law",
  "Faculty of Education",
  "Faculty of Social Sciences",
  "Faculty of Computer Science",
  "Faculty of Architecture",
];

export const academicFacultyOptions = academicFaculties.map(
  (academicFaculty) => ({
    value: academicFaculty,
    label: academicFaculty,
  })
);
