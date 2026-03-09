import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = [
  "React",
  "Next.js",
  "NestJS",
  "GraphQL",
  "TypeScript",
  "Amazon Web Services",
  "Docker",
  "Kubernetes",
  "Terraform",
  "GitHub Actions",
  "GitLab CI/CD",
  "UI/UX Design",
];

const experiences = [
  {
    title: "Ingénieur Full-Stack & DevOps",
    company: "Meetdeal, Rivesaltes — Hybride / Remote",
    period: "2023 – Présent",
    description:
      "Développement full-stack des applications métiers et outils internes avec React, NestJS et TypeScript, conception d'APIs REST et GraphQL, construction de l'infrastructure AWS avec CI/CD automatisés, et livraison de projets clés : CTA Dashboard, tableau de bord de supervision, messagerie cross-plateforme et applications Zendesk.",
  },
  {
    title: "Side Projects & Expérience personnelle",
    company: "Personnel",
    period: "2019 – Présent",
    description:
      "Développement d'applications full-stack (SaaS, Mobile, PWA) avec NestJS, React et React Native, déploiement sur AWS avec Terraform et CI/CD, conception de modèles IA/ML sur SageMaker avec pratiques MLOps, et contributions open source incluant une stack DevOps complète et une bibliothèque Angular de validation de formulaires.",
  },
];

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl tracking-tight font-semibold">
              À propos de moi
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Full-Stack Cloud Engineer passionné par la construction de systèmes
              robustes, scalables et modernes — de l&apos;interface utilisateur à
              l&apos;infrastructure cloud.
            </p>
          </div>

          {/* Bio */}
          <Card className="border-border/50">
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                J&apos;aide les startups et entreprises à concevoir, construire et
                déployer des produits numériques fiables de bout en bout — des
                interfaces frontend aux services backend et aux environnements
                cloud prêts pour la production.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Mon travail combine l&apos;ingénierie produit, l&apos;architecture
                logicielle et les pratiques DevOps pour livrer des systèmes
                performants, maintenables et prêts à évoluer. Je travaille
                principalement avec{" "}
                <span className="font-semibold text-foreground">React</span> et{" "}
                <span className="font-semibold text-foreground">Next.js</span>{" "}
                pour le frontend,{" "}
                <span className="font-semibold text-foreground">NestJS</span>{" "}
                pour les services backend, et une infrastructure cloud-native
                sur{" "}
                <span className="font-semibold text-foreground">AWS</span> avec{" "}
                <span className="font-semibold text-foreground">Docker</span>,{" "}
                <span className="font-semibold text-foreground">
                  Kubernetes
                </span>{" "}
                et{" "}
                <span className="font-semibold text-foreground">Terraform</span>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl text-center font-semibold">Compétences</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-4 py-2 text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl text-center font-semibold">Expérience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="border-border/50 hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <CardTitle>{exp.title}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
