import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
	reducerPath: "userApi",
	refetchOnFocus: true,
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com/",
	}),
	endpoints(build) {
		return {
			/**
			 * Get all users
			 */
			getUsers: build.query({
				query: () => "users",
			}),

			/**
			 * Get user by ID
			 */
			getUserById: build.query({
				query: (id) => `users/${id}`,
			}),
		};
	},
});

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
