const services = [
  {
    icon: "🚀",
    title: "Full-Stack Application Development",
    description: "End-to-end development of modern web applications.",
    includes: [
      "Frontend architecture",
      "Backend services",
      "API development",
      "Database integration",
      "Production deployment",
    ],
    tags: ["React", "Next.js", "NestJS"],
  },
  {
    icon: "⚙️",
    title: "Backend Systems & APIs",
    description:
      "Design and implementation of robust backend services.",
    includes: [
      "REST and GraphQL APIs",
      "Authentication systems",
      "Microservices architecture",
      "External service integrations",
    ],
    tags: ["NestJS"],
  },
  {
    icon: "☁️",
    title: "Cloud Infrastructure",
    description: "Design and deployment of scalable cloud environments.",
    includes: [
      "Infrastructure architecture",
      "Containerized applications",
      "Scalable deployment strategies",
      "Cloud security and networking",
    ],
    tags: ["Amazon Web Services", "Docker", "Kubernetes"],
  },
  {
    icon: "🔄",
    title: "DevOps & CI/CD Automation",
    description: "Automation of development and deployment workflows.",
    includes: [
      "Build pipelines",
      "Automated testing",
      "Continuous deployment",
      "Environment management",
    ],
    tags: ["GitHub Actions", "GitLab CI/CD"],
  },
  {
    icon: "🏗",
    title: "Infrastructure as Code",
    description:
      "Infrastructure provisioning using code-based configuration.",
    includes: [
      "Reproducible infrastructure",
      "Environment provisioning",
      "Automated infrastructure deployment",
    ],
    tags: ["Terraform"],
  },
  {
    icon: "📱",
    title: "Cross-Platform Mobile Apps",
    description: "Mobile applications built with a single codebase.",
    includes: [
      "iOS and Android apps",
      "API integration",
      "Performance optimization",
    ],
    tags: ["React Native", "Expo"],
  },
];

const deliverables = [
  "SaaS platforms",
  "Scalable web applications",
  "Mobile apps",
  "Cloud-native systems",
  "Production-ready infrastructures",
];

export default function Services() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            I help companies build scalable digital products by combining
            software engineering, cloud infrastructure, and DevOps automation.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl">
            My services cover the full lifecycle of modern applications — from
            architecture and development to deployment and infrastructure
            management.
          </p>
        </div>

        {/* What I can help you build */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">What I can help you build</h2>
          <ul className="space-y-1">
            {deliverables.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <span className="bg-primary h-1.5 w-1.5 rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-muted" />

        {/* Service Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="space-y-1">
                <div className="text-2xl">{service.icon}</div>
                <h3 className="text-lg font-semibold leading-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>

              <ul className="space-y-1 flex-1">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
