import { TAcademicSemester, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
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
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },
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
