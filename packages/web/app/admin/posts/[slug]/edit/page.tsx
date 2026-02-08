"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

export default function EditPostPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/admin" },
      { label: "Posts", href: "/admin/posts" },
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
      router.push("/admin/posts");
    },
    onError: () => {
      toast.error("Failed to edit post. Please try again.");
    },
  });

  const handleUploader = useCallback(async (file: File): Promise<string> => {
    const { data } = await uploadFile(file);
    return data.url;
  }, []);

  const formik = useFormik<UpdatePostInput>({
    initialValues: {
      id: post?.id || 0,
      title: post?.title || "",
      summary: post?.summary || "",
      content: post?.content || "",
      thumbnailUrl: post?.thumbnailUrl || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (values.thumbnailUrl instanceof File) {
        const { data } = await uploadFile(values.thumbnailUrl);
        values.thumbnailUrl = data.url;
      }
      updatePostMutation.mutate(values);
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

          <div className="space-y-2">
            <Label>Content</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl">Thumbnail</Label>
            <Input
              id="thumbnailUrl"
              type="file"
              onChange={(e) =>
                formik.setFieldValue("thumbnailUrl", e.currentTarget.files?.[0])
              }
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Editing..." : "Edit Post"}
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
