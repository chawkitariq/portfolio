import graphql from "@/configs/graphql";
import { CreatePostInput, Post } from "@portfolio/api";
import { AxiosResponse } from "axios";

export function createPost(
  input: CreatePostInput,
): Promise<AxiosResponse<{ data: Post }>> {
  return graphql({
    data: {
      query: `
      mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
          id
        title
        summary
        content
        createdAt
        updatedAt
        }
      }
    `,
      variables: {
        input,
      },
    },
  });
}
