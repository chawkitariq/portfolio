import { findOneBlogPost } from "@/api/post";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BlogPostDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await findOneBlogPost(+slug);
  const post = response.data;

  if (!post) {
    return (
      <div className="container max-w-4xl py-16 text-center">
        <h1 className="text-2xl font-semibold">Article introuvable</h1>
      </div>
    );
  }

  return (
    <article className="container max-w-4xl py-8 lg:py-12">
      {/* Back Link */}
      <Link href="/home/blog" className="inline-block mb-8">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour au blog
        </Button>
      </Link>

      {/* Header Section */}
      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.createdAt}>
              {new Date(+post.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>5 min de lecture</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {post.title}
        </h1>

        {post.summary && (
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.summary}
          </p>
        )}
      </header>

      <Separator className="my-8" />

      {/* Featured Image */}
      {post.thumbnailUrl && (
        <div className="mb-8 overflow-hidden rounded-lg border relative aspect-video">
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-7 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:border"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Separator className="my-12" />

      {/* Footer Section */}
      <footer className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Dernière mise à jour :{" "}
          <time dateTime={post.updatedAt}>
            {new Date(+post.updatedAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </footer>
    </article>
  );
}
