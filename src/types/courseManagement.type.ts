import { TAcademicSemester } from "./academicManagement.type";

export type TSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credit: number;
  isDeleted: boolean;
  preRequisiteCourses: PreRequisiteCourse[];
  createdAt: string;
  updatedAt: string;
};

export type PreRequisiteCourse = {
  course: string;
  isDeleted: boolean;
};
