"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { UpdatePostInput } from "@portfolio/api";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findOnePost, updatePost } from "@/api/post";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import Link from "next/link";
import { toast } from "sonner";
import { useCallback, useEffect, useMemo } from "react";
import { useBreadcrumbStore } from "@/stores/breadcrumb";
import { uploadFile } from "@/api/upload";
import { object, string } from "yup";

const validationSchema = object({
  title: string().required("Title is required"),
  summary: string().required("Summary is required"),
  content: string().required("Content is required"),
});

type EditPostFormValues = Omit<UpdatePostInput, "thumbnailUrl"> & {
  thumbnailUrl?: string | File | null;
};

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

  const handleUploader = useCallback(async (file: File): Promise<string> => {
    const { data } = await uploadFile(file);
    return data.url;
  }, []);

  const formik = useFormik<EditPostFormValues>({
    initialValues: {
      id: post?.id || 0,
      title: post?.title || "",
      summary: post?.summary || "",
      content: post?.content || "",
      thumbnailUrl: post?.thumbnailUrl || "",
    },
    enableReinitialize: true,
    validationSchema,
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

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              {...formik.getFieldProps("title")}
              id="title"
              type="text"
              placeholder="Enter post title"
              aria-invalid={formik.touched.title && !!formik.errors.title}
            />
            {formik.touched.title && formik.errors.title && (
              <FieldDescription className="text-destructive">
                {formik.errors.title}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="summary">Summary</FieldLabel>
            <Textarea
              {...formik.getFieldProps("summary")}
              id="summary"
              placeholder="Brief summary of the post"
              rows={3}
              aria-invalid={formik.touched.summary && !!formik.errors.summary}
            />
            {formik.touched.summary && formik.errors.summary && (
              <FieldDescription className="text-destructive">
                {formik.errors.summary}
              </FieldDescription>
            )}
          </Field>
          </FieldGroup>

          <Field>
            <FieldLabel>Content</FieldLabel>
            <MinimalTiptapEditor
              uploader={handleUploader}
              value={formik.values.content}
              onChange={(value) => formik.setFieldValue("content", value)}
              className="w-full"
              editorContentClassName="p-5 h-[800px] overflow-y-scroll"
              output="html"
              placeholder="Post content"
              editable={true}
              editorClassName="focus:outline-hidden"
            />
            {formik.touched.content && formik.errors.content && (
              <FieldDescription className="text-destructive">
                {formik.errors.content}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="thumbnailUrl">Thumbnail</FieldLabel>
            <Input
              id="thumbnailUrl"
              type="file"
              onChange={(e) =>
                formik.setFieldValue("thumbnailUrl", e.currentTarget.files?.[0])
              }
            />
          </Field>

          <div className="flex gap-4">
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Editing..." : "Edit Post"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/blog">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
