import {
  TCourse,
  TQueryParam,
  TResponseRedux,
  TSemester,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        console.log("inside api args", args);

        const params = new URLSearchParams();

        // console.log(params);
        if (args) {
          args.forEach((item: TQueryParam) => {
            // console.log(item);
            params.append(item.name, item.value as string);
            console.log(params);
          });
        }

        return {
          url: "/semester-registration/all-semester-registration",
          method: "GET",
          params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    // getSingleSemester: builder.query({
    //   query: () => ({
    //     url: "/academic-semesters/id", //will be changed
    //     method: "GET",
    //   }),
    // }),
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registration/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),

    //Academic Faculties
    // addAcademicFaculties: builder.mutation({
    //   query: (data) => ({
    //     url: "/academic-faculties/create-academic-faculty",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    //Academic Department
    // getAllAcademicDepartments: builder.query({
    //   query: () => ({
    //     url: "/academic-departments/",
    //     method: "GET",
    //   }),
    //   transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
    //     return { data: response.data, meta: response.meta };
    //   },
    // }),

    getAllCourses: builder.query({
      query: (args) => {
        console.log("inside api args", args);

        const params = new URLSearchParams();

        // console.log(params);
        if (args) {
          args.forEach((item: TQueryParam) => {
            // console.log(item);
            params.append(item.name, item.value as string);
            console.log(params);
          });
        }

        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),

    //assign faculties
    assignFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      // invalidatesTags: ["courses"],
    }),
  }),
});

export const {
  //semester
  useGetAllRegisteredSemestersQuery,
  useAddSemesterRegistrationMutation,
  useUpdateRegisteredSemesterMutation,
  //courses
  useGetAllCoursesQuery,
  useAddCourseMutation,
  // assign faculties
  useAssignFacultiesMutation,
} = courseManagementApi;
