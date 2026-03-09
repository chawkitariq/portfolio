import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl tracking-tight font-semibold">
            Mes Services
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Des solutions complètes pour construire, déployer et faire évoluer
            vos produits numériques — du développement à l&apos;infrastructure
            cloud.
          </p>
        </div>
      </section>

      {/* What I can help you build */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold text-center">
              Ce que je peux vous aider à construire
            </h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
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
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.title}
              className="border-border/50 hover:shadow-lg transition-shadow flex flex-col"
            >
              <CardHeader>
                <div className="text-3xl mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-2 mb-6 flex-1">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted-foreground flex items-start"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Intéressé par mes services ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Discutons de votre projet et voyons comment je peux vous aider à
              le concrétiser.
            </p>
            <Link href="/home/contact">
              <Button size="lg" className="mt-4">
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
