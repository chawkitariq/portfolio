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

export default function EditPostPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const findOnePostQuery = useQuery({
    queryKey: ["posts", params.slug],
    queryFn: () => findOnePost(Number(params.slug)),
    enabled: !!params.slug,
  });

  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    mutationKey: ["posts", params.slug],
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/admin/posts");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const formik = useFormik<UpdatePostInput>({
    initialValues: {
      id: findOnePostQuery?.data?.data?.data?.postOne?.id || 0,
      title: findOnePostQuery?.data?.data?.data?.postOne?.title || "",
      summary: findOnePostQuery?.data?.data?.data?.postOne?.summary || "",
      content: findOnePostQuery?.data?.data?.data?.postOne?.content || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
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
            <Label htmlFor="content">Content</Label>
            <Textarea
              {...formik.getFieldProps("content")}
              id="content"
              placeholder="Write your post content here..."
              rows={15}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Editing..." : "Edit Post"}
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
