import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Server_url } from "../../utils/roots";

const caseApi = createApi({
  reducerPath: "case_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Server_url}`,
  }),
  endpoints(builder) {
    return {
      get_my_cases: builder.query({
        query: ({ id, access, isMediator }) => {
          const url = isMediator
            ? `${Server_url}/session/case/casess_by_mediator/`
            : `${Server_url}/session/chat_members/get_case_by_user/`;

          return {
            url: url,
            params: {
              id: id,
            },
            headers: {
              Authorization: `JWT ${access}`,
            },
          };
        },
      }),
    };
  },
});

export  {caseApi};
