"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navigation } from "./data.json";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="h-full w-full">
      <section className="bg-muted py-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8">
          <div className="space-y-4">
            <p
              className="text-primary text-sm font-medium uppercase"
              style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
            >
              MY PORTFOLIO
            </p>
            <h2
              className="relative z-1 text-2xl font-semibold md:text-3xl lg:text-4xl"
              style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
            >
              <span className="relative">
                CHAWKI Tariq
                <span
                  className="from-primary absolute bottom-0 left-0 -z-1 h-0.5 w-full rounded-full bg-gradient-to-r to-transparent"
                  aria-hidden="true"
                ></span>
              </span>
            </h2>
            <p
              className="text-muted-foreground text-base md:text-xl"
              style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
            >
              Fullstack & DevOps Engineer specializing in NestJS, React, and AWS
            </p>
            <div style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}>
              <a
                href="#"
                data-slot="button"
                className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 group rounded-lg text-base has-[&gt;svg]:px-6"
              >
                View all
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
          <div style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}>
            <div
              dir="ltr"
              data-orientation="vertical"
              data-slot="tabs"
              className="flex flex-col relative gap-6 md:flex-row"
            >
              <div
                data-slot="card"
                className="bg-card text-card-foreground flex flex-col border shadow-sm w-full flex-shrink-0 gap-2.5 rounded-md p-5 md:sticky md:top-5 md:h-235 md:w-70 xl:w-83"
              >
                <h3 className="text-lg leading-relaxed font-semibold">
                  Categories
                </h3>
                <hr className="border-t" />
                <div className="flex h-full flex-1 flex-col justify-between gap-2 overflow-auto">
                  <div
                    dir="ltr"
                    data-slot="scroll-area"
                    className="relative max-w-119"
                    style={{
                      position: "relative",
                      "--radix-scroll-area-corner-width": "0px",
                      "--radix-scroll-area-corner-height": "0px",
                    }}
                  >
                    <style>
                      {`[data-radix-scroll-area-viewport] {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    -webkit-overflow-scrolling: touch;
                  }
                  [data-radix-scroll-area-viewport]::-webkit-scrollbar {
                    display: none;
                  }`}
                    </style>
                    <div
                      data-radix-scroll-area-viewport=""
                      data-slot="scroll-area-viewport"
                      className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
                      style={{ overflow: "scroll" }}
                    >
                      <div style={{ minWidth: "100%", display: "table" }}>
                        <div
                          role="tablist"
                          aria-orientation="vertical"
                          data-slot="tabs-list"
                          className="text-muted-foreground items-center justify-center rounded-lg flex h-auto w-full gap-2.5 bg-transparent p-0 max-md:pb-2 md:flex-col"
                          tabIndex={0}
                          data-orientation="vertical"
                          style={{ outline: "none" }}
                        >
                          {navigation.map((item) => (
                            <Button
                              key={item.href}
                              type="button"
                              role="tab"
                              aria-selected="true"
                              aria-controls="radix-_R_n5fiv5ubsnpfj9b_-content-all-projects"
                              data-state={
                                pathname === item.href ? "active" : "inactive"
                              }
                              id="radix-_R_n5fiv5ubsnpfj9b_-trigger-all-projects"
                              data-slot="tabs-trigger"
                              className="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center gap-1.5 border-transparent whitespace-nowrap focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 hover:bg-muted data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground text-muted-foreground w-full justify-start rounded-md border bg-transparent px-4 py-1.5 text-left text-base font-medium shadow-none transition-all"
                              tabIndex={0}
                              data-orientation="vertical"
                              data-radix-collection-item=""
                              asChild
                            >
                              <Link href={item.href}>{item.name}</Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
