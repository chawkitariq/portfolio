"use client";

import { useFormik } from "formik";
import { object, string } from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { MaltIcon } from "@/components/malt-icon";

const contactInfo = [
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "linkedin.com/in/chawkitariq",
    link: "https://linkedin.com/in/chawkitariq",
  },
  {
    icon: Github,
    title: "GitHub",
    value: "github.com/chawkitariq",
    link: "https://github.com/chawkitariq",
  },
  {
    icon: MaltIcon,
    title: "Malt",
    value: "malt.fr/profile/tariqchawki",
    link: "https://www.malt.fr/profile/tariqchawki",
  },
];

const validationSchema = object({
  name: string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Le nom est requis"),
  email: string()
    .email("Adresse email invalide")
    .required("L'email est requis"),
  subject: string()
    .min(3, "Le sujet doit contenir au moins 3 caractères")
    .required("Le sujet est requis"),
  message: string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .required("Le message est requis"),
});

export default function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: (_values, { resetForm }) => {
      toast.success(
        "Merci pour votre message ! Je vous répondrai dans les plus brefs délais.",
      );
      resetForm();
    },
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl tracking-tight font-semibold">
            Contact
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Un projet en tête ? N&apos;hésitez pas à me contacter. Je serai ravi
            d&apos;échanger avec vous.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Informations</h2>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <Card key={info.title} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {info.title}
                        </p>
                        {info.link ? (
                          <a
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Envoyez-moi un message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et je vous répondrai dans
                  les plus brefs délais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Field>
                        <FieldLabel htmlFor="name">Nom complet</FieldLabel>
                        <Input
                          {...formik.getFieldProps("name")}
                          id="name"
                          placeholder="Jean Dupont"
                          aria-invalid={
                            formik.touched.name && !!formik.errors.name
                          }
                        />
                        {formik.touched.name && formik.errors.name && (
                          <FieldDescription className="text-destructive">
                            {formik.errors.name}
                          </FieldDescription>
                        )}
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          {...formik.getFieldProps("email")}
                          id="email"
                          type="email"
                          placeholder="jean.dupont@email.com"
                          aria-invalid={
                            formik.touched.email && !!formik.errors.email
                          }
                        />
                        {formik.touched.email && formik.errors.email && (
                          <FieldDescription className="text-destructive">
                            {formik.errors.email}
                          </FieldDescription>
                        )}
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="subject">Sujet</FieldLabel>
                      <Input
                        {...formik.getFieldProps("subject")}
                        id="subject"
                        placeholder="Discussion sur un projet"
                        aria-invalid={
                          formik.touched.subject && !!formik.errors.subject
                        }
                      />
                      {formik.touched.subject && formik.errors.subject && (
                        <FieldDescription className="text-destructive">
                          {formik.errors.subject}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="message">Message</FieldLabel>
                      <Textarea
                        {...formik.getFieldProps("message")}
                        id="message"
                        placeholder="Parlez-moi de votre projet..."
                        rows={6}
                        aria-invalid={
                          formik.touched.message && !!formik.errors.message
                        }
                      />
                      {formik.touched.message && formik.errors.message && (
                        <FieldDescription className="text-destructive">
                          {formik.errors.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto"
                      disabled={formik.isSubmitting}
                    >
                      Envoyer le message
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
