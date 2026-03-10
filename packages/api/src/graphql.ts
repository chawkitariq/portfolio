
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreatePostInput {
    title: string;
    thumbnailUrl?: Nullable<string>;
    summary: string;
    content: string;
    publishedAt: string;
}

export interface UpdatePostInput {
    id: number;
    title?: Nullable<string>;
    thumbnailUrl?: Nullable<string>;
    summary?: Nullable<string>;
    content?: Nullable<string>;
    publishedAt?: Nullable<string>;
}

export interface Post {
    id: number;
    title: string;
    thumbnailUrl?: Nullable<string>;
    summary: string;
    content: string;
    readDuration: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface IQuery {
    post(): Nullable<Post>[] | Promise<Nullable<Post>[]>;
    postOne(id: number): Nullable<Post> | Promise<Nullable<Post>>;
}

export interface IMutation {
    createPost(input: CreatePostInput): Post | Promise<Post>;
    updatePost(input: UpdatePostInput): Post | Promise<Post>;
    removePost(id: number): Nullable<Post> | Promise<Nullable<Post>>;
}

type Nullable<T> = T | null;
