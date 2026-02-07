export default function Blog() {
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
        <div style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}>
          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div data-slot="card-content" className="px-6 space-y-4">
              <div className="overflow-hidden rounded-md">
                <img
                  alt="Quantive Analytics Dashboard Interface"
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:max-h-60.5"
                  src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/portfolio/image-69.png"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl leading-tight font-semibold">
                  Quantive Analytics Dashboard
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Designed a powerful, AI-enhanced analytics dashboard for
                  Quantive a B2B SaaS platform helping startups and enterprises.
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
          </div>
        </div>
        <div style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}>
          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div data-slot="card-content" className="px-6 space-y-4">
              <div className="overflow-hidden rounded-md">
                <img
                  alt="LifestyleLoop Blog Platform Interface"
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:max-h-60.5"
                  src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/portfolio/image-70.png"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl leading-tight font-semibold">
                  LifestyleLoop Blog Platform
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Developed a modern, editorial-style blog website for
                  LifestyleLoop – a digital publication covering wellness,
                  culture, and productivity.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground inline-block font-medium">
                  Web Design
                </span>
                <span className="bg-muted-foreground inline-block h-1.5 w-1.5 rounded-full"></span>
                <span className="text-muted-foreground inline-block font-medium">
                  Product Management
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}>
          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div data-slot="card-content" className="px-6 space-y-4">
              <div className="overflow-hidden rounded-md">
                <img
                  alt="Dailywise Productivity UI Dashboard"
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:max-h-60.5"
                  src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/portfolio/image-71.png"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl leading-tight font-semibold">
                  Dailywise Productivity UI
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Designed a playful, illustrated productivity dashboard concept
                  for Dailywise a tool aimed at helping remote teams manage
                  habits, goals.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground inline-block font-medium">
                  UI/UX Design
                </span>
                <span className="bg-muted-foreground inline-block h-1.5 w-1.5 rounded-full"></span>
                <span className="text-muted-foreground inline-block font-medium">
                  Graphic Design
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}>
          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div data-slot="card-content" className="px-6 space-y-4">
              <div className="overflow-hidden rounded-md">
                <img
                  alt="Minta Interiors Website Interface"
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:max-h-60.5"
                  src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/portfolio/image-72.png"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl leading-tight font-semibold">
                  Minta Interiors Website
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built a clean, visually-driven site for Minta Interiors a
                  boutique interior design studio which focused on showcasing
                  portfolio pieces.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground inline-block font-medium">
                  Web Design
                </span>
                <span className="bg-muted-foreground inline-block h-1.5 w-1.5 rounded-full"></span>
                <span className="text-muted-foreground inline-block font-medium">
                  Content Writing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
