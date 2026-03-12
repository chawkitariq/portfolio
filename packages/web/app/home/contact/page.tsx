"use client";

import emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import { boolean, object, string } from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
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

const faqItems = [
  {
    question: "Quels sont vos disponibilités ?",
    answer: "Je ne suis actuellement disponible que les week-ends et soir",
  },
  {
    question: "Quels sont vos tarifs ?",
    answer:
      "La tarification dépend du projet et surtout du temps qui sera nécessaire pour le mener à bien. À titre indicatif mon tarif journalier moyen se situe aux alentour de 250€/jour.",
  },
  {
    question: "Effectuez-vous des missions en Agence ?",
    answer: "J'effectue l'ensemble de mes missions à distance.",
  },
  {
    question: "Faites-vous la partie design des projets ?",
    answer:
      "Je ne suis malheureusement pas en capacité d'effectuer le design d'une application aussi il sera nécessaire de fournir le design si la mission le nécessite.",
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
  consent: boolean()
    .oneOf([true], "Vous devez accepter la politique de confidentialité")
    .required("Vous devez accepter la politique de confidentialité"),
});

export default function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      consent: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.error("[EmailJS] Missing environment variables:", {
          serviceId: !!serviceId,
          templateId: !!templateId,
          publicKey: !!publicKey,
        });
        toast.error("Configuration du service d'email manquante.");
        setSubmitting(false);
        return;
      }

      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: values.name,
            reply_to: values.email,
            subject: values.subject,
            message: values.message,
          },
          { publicKey },
        );
        toast.success(
          "Merci pour votre message ! Je vous répondrai dans les plus brefs délais.",
        );
        resetForm();
      } catch (error) {
        console.error("[EmailJS] Send failed:", error);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      } finally {
        setSubmitting(false);
      }
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
                    <Field>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="consent"
                          checked={formik.values.consent}
                          onCheckedChange={(checked) =>
                            formik.setFieldValue("consent", checked === true)
                          }
                          onBlur={() => formik.setFieldTouched("consent", true)}
                          aria-invalid={
                            formik.touched.consent && !!formik.errors.consent
                          }
                        />
                        <label
                          htmlFor="consent"
                          className="text-sm leading-relaxed cursor-pointer"
                        >
                          J&apos;accepte que mes données (nom, adresse email)
                          soient utilisées uniquement pour traiter ma demande,
                          conformément à la{" "}
                          <Link
                            href="/home/politique-de-confidentialite"
                            className="underline hover:text-primary transition-colors"
                            target="_blank"
                          >
                            politique de confidentialité
                          </Link>
                          .
                        </label>
                      </div>
                      {formik.touched.consent && formik.errors.consent && (
                        <FieldDescription className="text-destructive">
                          {formik.errors.consent}
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

      {/* FAQ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="rounded-lg border border-border/50 px-6">
            <Accordion type="single" collapsible defaultValue="faq-0">
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
