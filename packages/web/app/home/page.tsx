import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cloud, Code, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Chawki Tariq — Full-Stack Cloud Engineer",
  },
  description:
    "Je conçois, développe et déploie des applications web scalables et des infrastructures cloud modernes — de l’interface utilisateur à la production. React, Next.js, NestJS, AWS.",
  openGraph: {
    title: "Chawki Tariq — Full-Stack Cloud Engineer",
    description:
      "Je conçois, développe et déploie des applications web scalables et des infrastructures cloud modernes.",
    url: "/home",
  },
};

const features = [
  {
    icon: Code,
    title: "Développement Full-Stack",
    description:
      "Applications web modernes de bout en bout avec React, Next.js et NestJS.",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description:
      "Déploiement et gestion d'infrastructures scalables sur AWS avec Terraform.",
  },
  {
    icon: Layers,
    title: "DevOps & CI/CD",
    description:
      "Pipelines automatisés, conteneurisation et livraison continue avec Docker & Kubernetes.",
  },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-semibold">
            Full-Stack Cloud Engineer
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Je conçois, développe et déploie des applications web scalables et
            des infrastructures cloud modernes — de l&apos;interface utilisateur
            à la production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/home/contact">
              <Button size="lg" className="group">
                Démarrer un projet
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/home/services">
              <Button size="lg" variant="outline">
                Découvrir mes services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/50 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Discutons ensemble de vos besoins et construisons quelque chose de
            robuste et scalable.
          </p>
          <Link href="/home/contact">
            <Button size="lg" className="mt-4">
              Me contacter
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
