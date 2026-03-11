import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité relative au formulaire de contact — informations sur la collecte, l’utilisation et la conservation de vos données personnelles (RGPD).",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Politique de confidentialité | Chawki Tariq",
    url: "/home/politique-de-confidentialite",
  },
};

export default function PolitiqueDeConfidentialite() {
  return (
    <div className="w-full">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl tracking-tight font-semibold">
              Politique de confidentialité
            </h1>
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : mars 2026
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              1. Responsable du traitement
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Le responsable du traitement des données collectées via le
              formulaire de contact de ce site est <strong>Chawki Tariq</strong>
              , développeur freelance. Pour exercer vos droits ou poser toute
              question relative à vos données, vous pouvez me contacter
              directement via le{" "}
              <Link
                href="/home/contact"
                className="underline hover:text-primary transition-colors"
              >
                formulaire de contact
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Données collectées</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le formulaire de contact collecte uniquement les données
              strictement nécessaires au traitement de votre demande :
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                <strong>Nom complet</strong> — pour personnaliser la réponse
              </li>
              <li>
                <strong>Adresse email</strong> — pour vous répondre
              </li>
              <li>
                <strong>Sujet</strong> — pour qualifier votre demande
              </li>
              <li>
                <strong>Message</strong> — contenu de votre demande
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Aucune autre donnée (adresse IP, cookies de traçage, données de
              navigation) n&apos;est collectée via ce formulaire.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Finalité du traitement</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données sont collectées dans l&apos;unique but de traiter et
              répondre à votre demande de contact. Elles ne sont utilisées à
              aucune autre fin (prospection commerciale, profilage, revente à
              des tiers).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Durée de conservation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données sont conservées uniquement le temps nécessaire au
              traitement de votre demande :
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                EmailJS conserve un historique des emails envoyés, mais le
                stockage des données personnelles a été désactivé : les
                informations identifiantes (nom, adresse email, sujet, contenu) ne sont
                pas conservées dans cette historique.
              </li>
              <li>
                Les emails reçus dans ma boîte de réception sont supprimés dès
                que votre demande est traitée.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Aucun archivage long terme n&apos;est effectué.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Base légale</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le traitement repose sur votre{" "}
              <strong>consentement explicite</strong> (article 6.1.a du RGPD),
              exprimé en cochant la case de consentement avant l&apos;envoi du
              formulaire.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Vos droits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Conformément au RGPD, vous disposez des droits suivants sur vos
              données :
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                <strong>Droit d&apos;accès</strong> — savoir quelles données
                sont détenues
              </li>
              <li>
                <strong>Droit de rectification</strong> — corriger des données
                inexactes
              </li>
              <li>
                <strong>Droit à l&apos;effacement</strong> — demander la
                suppression de vos données
              </li>
              <li>
                <strong>Droit de retrait du consentement</strong> — à tout
                moment, sans effet rétroactif
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Pour exercer ces droits, contactez-moi via le{" "}
              <Link
                href="/home/contact"
                className="underline hover:text-primary transition-colors"
              >
                formulaire de contact
              </Link>
              . Vous pouvez également introduire une réclamation auprès de la{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                CNIL
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Sous-traitant</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le formulaire utilise{" "}
              <a
                href="https://www.emailjs.com/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                EmailJS
              </a>{" "}
              pour l&apos;acheminement des messages. Ce service agit en tant que
              sous-traitant et dispose de sa propre politique de
              confidentialité. Vos données transitent par leurs serveurs sans
              être conservées de leur côté.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
