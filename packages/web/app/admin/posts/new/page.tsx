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
import { toast } from "sonner";
import { useBreadcrumbStore } from "@/stores/breadcrumb";
import { useCallback, useEffect } from "react";
import { uploadFile } from "@/api/upload";

type NewPostFormValues = Omit<CreatePostInput, "thumbnailUrl"> & {
  thumbnailUrl?: string | File;
};

export default function NewPostPage() {
  const router = useRouter();

  const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/admin" },
      { label: "Posts", href: "/admin/posts" },
      { label: "New Post" },
    ]);
  }, [setBreadcrumbs]);

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/admin/posts");
    },
    onError: () => {
      toast.error("Failed to create post. Please try again.");
    },
  });

  const handleUploader = useCallback(async (file: File): Promise<string> => {
    const { data } = await uploadFile(file);
    return data.url;
  }, []);

  const formik = useFormik<NewPostFormValues>({
    initialValues: {
      title: "",
      summary: "",
      content: "",
      thumbnailUrl: undefined,
    },
    onSubmit: async (values) => {
      let thumbnailUrl = values.thumbnailUrl;
      if (thumbnailUrl instanceof File) {
        const { data } = await uploadFile(thumbnailUrl);
        thumbnailUrl = data.url;
      }
      createPostMutation.mutate({ ...values, thumbnailUrl } as CreatePostInput);
    },
  });

  console.log(formik.values);

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
            uploader={handleUploader}
          />

          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl">Thumbnail</Label>
            <Input
              onChange={(e) =>
                formik.setFieldValue("thumbnailUrl", e.target.files?.[0])
              }
              id="thumbnailUrl"
              type="file"
            />
          </div>

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
