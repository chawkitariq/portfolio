export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Hey 👋 I&apos;m Tariq
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            <span className="font-semibold text-foreground">
              Full-Stack Cloud Engineer
            </span>{" "}
            specializing in building scalable applications and modern cloud
            infrastructure.
          </p>
        </div>

        <hr className="border-muted" />

        {/* Bio */}
        <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
          <p>
            I help startups and companies design, build, and deploy reliable
            digital products from end to end — from frontend interfaces to
            backend services and production-ready cloud environments.
          </p>
          <p>
            My work combines product engineering, software architecture, and
            DevOps practices to deliver systems that are performant,
            maintainable, and ready to scale.
          </p>
          <p>
            I primarily work with{" "}
            <span className="font-semibold text-foreground">React</span> and{" "}
            <span className="font-semibold text-foreground">Next.js</span> for
            frontend development,{" "}
            <span className="font-semibold text-foreground">NestJS</span> for
            backend services, and cloud-native infrastructure on{" "}
            <span className="font-semibold text-foreground">AWS</span> using{" "}
            <span className="font-semibold text-foreground">Docker</span>,{" "}
            <span className="font-semibold text-foreground">Kubernetes</span>,
            and{" "}
            <span className="font-semibold text-foreground">Terraform</span>,
            with automated CI/CD pipelines powered by{" "}
            <span className="font-semibold text-foreground">
              GitHub Actions
            </span>{" "}
            and{" "}
            <span className="font-semibold text-foreground">GitLab CI</span>.
          </p>
        </div>

        <hr className="border-muted" />

        {/* Technologies */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "NestJS",
              "GraphQL",
              "Amazon Web Services",
              "Docker",
              "Kubernetes",
              "Terraform",
              "GitHub Actions",
              "GitLab CI/CD",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-muted text-muted-foreground rounded-md px-3 py-1 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
