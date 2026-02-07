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
              Fullstack & DevOps Engineer
            </span>{" "}
            specializing in{" "}
            <span className="font-semibold text-foreground">NestJS</span>,{" "}
            <span className="font-semibold text-foreground">React</span>, and{" "}
            <span className="font-semibold text-foreground">AWS</span>
          </p>
          <p className="text-lg text-muted-foreground">
            I build scalable backend services, fullstack applications, and cloud
            infrastructure.
          </p>
        </div>

        <hr className="border-muted" />

        {/* Tech Stack */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            🔧 Tech Stack
          </h2>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Backend:</span>{" "}
              <span className="text-muted-foreground">
                Node.js • NestJS • TypeScript • Python • GraphQL • REST •
                SQL/NoSQL
              </span>
            </div>
            <div>
              <span className="font-semibold">Frontend:</span>{" "}
              <span className="text-muted-foreground">
                React • React Native • Vue.js • Nuxt.js • Angular
              </span>
            </div>
            <div>
              <span className="font-semibold">Cloud/DevOps:</span>{" "}
              <span className="text-muted-foreground">
                AWS • Terraform • Docker • Kubernetes • GitHub Actions • GitLab
                CI
              </span>
            </div>
            <div>
              <span className="font-semibold">AI/ML:</span>{" "}
              <span className="text-muted-foreground">
                MLOps • AWS SageMaker • Machine Learning pipelines
              </span>
            </div>
          </div>
        </div>

        <hr className="border-muted" />

        {/* What I'm doing */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            💼 What I&apos;m doing
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1">🏢</span>
              <span>
                Fullstack & DevOps Engineer at{" "}
                <span className="font-semibold">Meetdeal</span> (hybrid remote)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">🚀</span>
              <span>
                Building fullstack apps (React + NestJS) and deploying on AWS
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">🛠️</span>
              <span>Contributing to open source</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">✍️</span>
              <span>Writing technical articles on LinkedIn</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">📚</span>
              <span>Exploring MLOps and production ML workflows</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
