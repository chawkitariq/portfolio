"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CreatePostInput } from "@portfolio/api";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/post";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function NewPostPage() {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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

  const editor = useEditor({
    extensions: [StarterKit],
    content: formik.values.content,
    onUpdate: ({ editor }) => {
      formik.setFieldValue("content", editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Post</h1>
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

          <EditorContent editor={editor} />

          <div className="flex gap-4">
            <Button type="submit" disabled={createPostMutation.isPending}>
              {createPostMutation.isPending ? "Creating..." : "Create Post"}
            </Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
