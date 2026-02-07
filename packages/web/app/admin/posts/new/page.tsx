"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CreatePostInput } from "@portfolio/api";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/post";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/admin/posts");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const formik = useFormik<CreatePostInput>({
    initialValues: {
      title: "",
      summary: "",
      content: "",
    },
    onSubmit: (values) => {
      createPostMutation.mutate(values);
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">New Post</h1>
          <p className="text-muted-foreground">
            Fill in the details below to create a new blog post.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              {...formik.getFieldProps("title")}
              id="title"
              type="text"
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              {...formik.getFieldProps("summary")}
              id="summary"
              placeholder="Brief summary of the post"
              rows={3}
              required
            />
          </div>

          <MinimalTiptapEditor
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue("content", value)}
            className="w-full"
            editorContentClassName="p-5 h-[800px] overflow-y-scroll"
            output="html"
            placeholder="Post content"
            editable={true}
            editorClassName="focus:outline-hidden"
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={createPostMutation.isPending}>
              {createPostMutation.isPending ? "Creating..." : "Create Post"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/posts">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
