"use client";

import { Button } from "@/components/ui/button";
import { CreatePostInput } from "@portfolio/api";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/post";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBreadcrumbStore } from "@/stores/breadcrumb";
import { useEffect } from "react";
import { uploadFile } from "@/api/upload";
import { validationSchema } from "../form/validation-schema";
import Form, { BlogPostFormThumbnailUrl } from "../form/_form";

export default function NewPostPage() {
  const router = useRouter();

  const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/admin" },
      { label: "Blog", href: "/admin/blog" },
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
      router.push("/admin/blog");
    },
    onError: () => {
      toast.error("Failed to create post. Please try again.");
    },
  });

  const formik = useFormik<BlogPostFormThumbnailUrl<CreatePostInput>>({
    initialValues: {
      title: "",
      summary: "",
      content: "",
      thumbnailUrl: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let thumbnailUrl = values.thumbnailUrl;
      if (thumbnailUrl instanceof File) {
        const { data } = await uploadFile(thumbnailUrl);
        thumbnailUrl = data.url;
      }
      createPostMutation.mutate({ ...values, thumbnailUrl } as CreatePostInput);
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

        <Form
          form={formik}
          submitButtonRender={() => (
            <Button type="submit" disabled={createPostMutation.isPending}>
              {createPostMutation.isPending ? "Creating..." : "Create Post"}
            </Button>
          )}
        />
      </div>
    </div>
  );
}
