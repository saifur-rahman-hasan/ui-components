import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uiComponentApi = createApi({
	reducerPath: "uiComponentApi",
	refetchOnFocus: true,
	tagTypes: [
		'UIComponents'
	],
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_APP_API_URL,
	}),
	endpoints: (builder) => ({
		/**
		 * Get All or filtered pricing plans
		 */
		getUIComponents: builder.query({
			query: (params) => {
				const queryString = new URLSearchParams(params).toString();
				return {
					url: `/ui-components${queryString}`,
					method: 'GET'
				}
			},
			transformResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.data
			},
		}),

		/**
		 * Create a new pricing plan
		 */
		createUIComponent: builder.mutation({
			query(body) {
				return {
					url: `/ui-components`,
					method: 'POST',
					body,
				}
			}
		}),
	})
});

export const {
	useGetUIComponentsQuery,
	useCreateUIComponentMutation
} = uiComponentApi;
