"use client";

import { Button } from "@/components/ui/button";
import { UpdatePostInput } from "@portfolio/api";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findOnePost, updatePost } from "@/api/post";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import { useBreadcrumbStore } from "@/stores/breadcrumb";
import { uploadFile } from "@/api/upload";
import Form, { BlogPostFormThumbnailUrl } from "../../form/_form";
import { validationSchema } from "../../form/validation-schema";

export default function EditPostPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/admin" },
      { label: "Blog", href: "/admin/blog" },
      { label: "Edit Post" },
    ]);
  }, [setBreadcrumbs]);

  const findOnePostQuery = useQuery({
    queryKey: ["posts", params.slug],
    queryFn: () => findOnePost(Number(params.slug)),
    enabled: !!params.slug,
  });

  const post = useMemo(
    () => findOnePostQuery.data?.data?.data?.postOne,
    [findOnePostQuery.data],
  );

  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    mutationKey: ["posts", params.slug],
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success("Post edited successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/admin/blog");
    },
    onError: () => {
      toast.error("Failed to edit post. Please try again.");
    },
  });

  const formik = useFormik<BlogPostFormThumbnailUrl<UpdatePostInput>>({
    initialValues: {
      id: post?.id || 0,
      title: post?.title || "",
      summary: post?.summary || "",
      content: post?.content || "",
      thumbnailUrl: post?.thumbnailUrl || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let thumbnailUrl = values.thumbnailUrl;
      if (thumbnailUrl instanceof File) {
        const { data } = await uploadFile(thumbnailUrl);
        thumbnailUrl = data.url;
      }
      updatePostMutation.mutate({ ...values, thumbnailUrl } as UpdatePostInput);
    },
  });

  return (
    <div className="px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Post</h1>
          <p className="text-muted-foreground">
            Fill in the details below to edit the blog post.
          </p>
        </div>

        <Form
          form={formik}
          submitButtonRender={() => (
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Editing..." : "Edit Post"}
            </Button>
          )}
        />
      </div>
    </div>
  );
}
