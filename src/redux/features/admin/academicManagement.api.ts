import { TAcademicSemester, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    getSingleSemester: builder.query({
      query: () => ({
        url: "/academic-semesters/id", //will be changed
        method: "GET",
      }),
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    updateAcademicSemester: builder.mutation({
      query: () => ({
        url: "academic-semester/674d169d6455cba853f0e6ba", //will be changed
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useGetSingleSemesterQuery,
  useAddAcademicSemesterMutation,
  useUpdateAcademicSemesterMutation,
} = academicManagementApi;
