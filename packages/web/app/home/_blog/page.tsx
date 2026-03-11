import { findAllBlogPost } from "@/api/post";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Blog() {
  const response = await findAllBlogPost();
  const posts = response.data;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl tracking-tight font-semibold">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Articles, tutoriels et réflexions sur le développement web, le
            cloud et les technologies modernes.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">
            Aucun article pour le moment. Revenez bientôt !
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="border-border/50 hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
              >
                {post.thumbnailUrl && (
                  <div className="overflow-hidden">
                    <img
                      alt={post.title}
                      className="w-full object-cover h-48 transition-transform duration-300 hover:scale-105"
                      src={post.thumbnailUrl}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3 leading-relaxed">
                    {post.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter className="flex flex-col gap-4">
                  {post.publishedAt && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground w-full">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      {post.readDuration && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{post.readDuration} min de lecture</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  <Link href={`/home/blog/${post.id}`} className="w-full">
                    <Button variant="outline" className="w-full group">
                      Lire l&apos;article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
