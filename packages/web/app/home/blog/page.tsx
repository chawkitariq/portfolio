import { findAllBlogPost } from "@/api/post";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Blog() {
  const response = await findAllBlogPost();
  const posts = response.data;

  return (
    <div
      data-state="active"
      data-orientation="vertical"
      role="tabpanel"
      aria-labelledby="radix-_R_n5fiv5ubsnpfj9b_-trigger-all-projects"
      id="radix-_R_n5fiv5ubsnpfj9b_-content-all-projects"
      tabIndex={0}
      data-slot="tabs-content"
      className="flex-1 outline-none mt-0"
    >
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {posts.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-16">
            No posts yet. Check back soon!
          </p>
        ) : (
          posts.map((post) => (
          <div
            style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
            key={post.id}
          >
            <div
              data-slot="card"
              className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <Link href={`/home/blog/${post.id}`}>
                <div data-slot="card-content" className="px-6 space-y-4">
                  <div className="overflow-hidden rounded-md">
                    <img
                      alt={post.title}
                      className="w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:max-h-60.5"
                      src={post.thumbnailUrl!}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl leading-tight font-semibold">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-muted-foreground inline-block font-medium">
                      Content Writing
                    </span>
                    <span className="bg-muted-foreground inline-block h-1.5 w-1.5 rounded-full"></span>
                    <span className="text-muted-foreground inline-block font-medium">
                      Web Development
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
