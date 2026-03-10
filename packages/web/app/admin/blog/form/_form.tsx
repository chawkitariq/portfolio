"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import Link from "next/link";
import { useCallback } from "react";
import { uploadFile } from "@/api/upload";
import { useFormik } from "formik";
import { CreatePostInput, UpdatePostInput } from "@portfolio/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarWithPresets } from "@/components/calendar-with-presets";
import { format } from "date-fns";

type PostInput = CreatePostInput | UpdatePostInput;

export type BlogPostFormThumbnailUrl<T extends PostInput> = Omit<
  T,
  "thumbnailUrl"
> & {
  thumbnailUrl?: string | File | null;
};

interface BlogPostFormProps<T extends PostInput = PostInput> {
  form: ReturnType<typeof useFormik<BlogPostFormThumbnailUrl<T>>>;
  submitButtonRender: () => React.ReactNode;
}

export default function Form<T extends PostInput = PostInput>({
  form,
  submitButtonRender,
}: BlogPostFormProps<T>) {
  const handleUploader = useCallback(async (file: File): Promise<string> => {
    const { data } = await uploadFile(file);
    return data.url;
  }, []);

  return (
    <form onSubmit={form.handleSubmit} className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            {...form.getFieldProps("title")}
            id="title"
            type="text"
            placeholder="Enter post title"
            aria-invalid={form.touched.title && !!form.errors.title}
          />
          {form.touched.title && form.errors.title && (
            <FieldDescription className="text-destructive">
              {String(form.errors.title)}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="summary">Summary</FieldLabel>
          <Textarea
            {...form.getFieldProps("summary")}
            id="summary"
            placeholder="Brief summary of the post"
            rows={3}
            aria-invalid={form.touched.summary && !!form.errors.summary}
          />
          {form.touched.summary && form.errors.summary && (
            <FieldDescription className="text-destructive">
              {String(form.errors.summary)}
            </FieldDescription>
          )}
        </Field>
      </FieldGroup>

      <Field>
        <FieldLabel>Content</FieldLabel>
        <MinimalTiptapEditor
          value={form.values.content}
          onChange={(value) => form.setFieldValue("content", value)}
          className="w-full"
          editorContentClassName="p-5 h-[800px] overflow-y-scroll"
          output="html"
          placeholder="Post content"
          editable={true}
          editorClassName="focus:outline-hidden"
          uploader={handleUploader}
        />
        {form.touched.content && form.errors.content && (
          <FieldDescription className="text-destructive">
            {String(form.errors.content)}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="thumbnailUrl">Thumbnail</FieldLabel>
        <Input
          onChange={(e) =>
            form.setFieldValue("thumbnailUrl", e.target.files?.[0])
          }
          id="thumbnailUrl"
          type="file"
        />
      </Field>

      <Field className="w-44">
        <FieldLabel htmlFor="date-picker-simple">Publish Date</FieldLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-simple"
              className="justify-start font-normal"
            >
              {form.values.publishedAt ? (
                format(form.values.publishedAt, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarWithPresets
              value={new Date(form.values.publishedAt!)}
              onChange={(date) => form.setFieldValue("publishedAt", date)}
            />
          </PopoverContent>
        </Popover>
        {form.touched.publishedAt && form.errors.publishedAt && (
          <FieldDescription className="text-destructive">
            {String(form.errors.publishedAt)}
          </FieldDescription>
        )}
      </Field>

      <div className="flex gap-4">
        {submitButtonRender()}
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/blog">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
