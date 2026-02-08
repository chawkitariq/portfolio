import graphql from "@/configs/graphql";
import { CreatePostInput, Post, UpdatePostInput } from "@portfolio/api";
import { AxiosResponse } from "axios";

export function createPost(
  input: CreatePostInput,
): Promise<AxiosResponse<{ data: { post: Post } }>> {
  return graphql({
    data: {
      query: `mutation CreatePost($input: CreatePostInput!) {
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

export function findAllPost(): Promise<
  AxiosResponse<{ data: { post: Post[] } }>
> {
  return graphql({
    data: {
      query: `
      query {
        post {
          id
          title
          summary
          content
          createdAt
          updatedAt
        }
      }
    `,
    },
  });
}

export function findOnePost(
  id: number,
): Promise<AxiosResponse<{ data: { postOne: Post } }>> {
  return graphql({
    data: {
      query: `
      query FindOnePost($id: Int!) {
        postOne(id: $id) {
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
        id,
      },
    },
  });
}

export function updatePost(
  input: UpdatePostInput,
): Promise<AxiosResponse<{ data: { postOne: Post } }>> {
  return graphql({
    data: {
      query: `mutation UpdatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
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

export function removePost(id: number): Promise<AxiosResponse> {
  return graphql({
    data: {
      query: `mutation RemovePost($id: Int!) {
        removePost(id: $id) {
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
        id,
      },
    },
  });
}
