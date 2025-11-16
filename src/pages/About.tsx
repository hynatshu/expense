import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Lock, Zap, Code2 } from "lucide-react";

export default function About() {
  const techStack = [
    { name: "React.js", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Vite", category: "Build Tool" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Lovable Cloud", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Recharts", category: "Visualization" },
  ];

  const features = [
    {
      icon: Database,
      title: "Secure Database",
      description: "All your data is stored securely with row-level security and encryption"
    },
    {
      icon: Lock,
      title: "User Authentication",
      description: "Built-in authentication system with email/password support"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Instant synchronization across all your devices"
    },
    {
      icon: Code2,
      title: "Modern Tech Stack",
      description: "Built with the latest web technologies for optimal performance"
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About ExpenseTracker</h1>
          <p className="text-xl text-muted-foreground">
            A modern, full-stack personal expense tracking application
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              ExpenseTracker is a comprehensive web application designed to help users manage their
              personal finances effectively. Built as a CSE minor project, it demonstrates
              full-stack development capabilities using modern web technologies.
            </p>
            <p>
              The application provides an intuitive interface for recording expenses, categorizing
              spending, setting budgets, and visualizing financial data through interactive charts
              and reports.
            </p>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>
              Built with modern, industry-standard technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  {tech.name}
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({tech.category})
                  </span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Create an Account</h3>
              <p className="text-muted-foreground">
                Sign up with your email and password to get started. Your data is automatically
                secured with Row-Level Security.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Add Expenses</h3>
              <p className="text-muted-foreground">
                Record your daily expenses with details like amount, category, payment method, and notes.
                Default categories are provided, or create your own.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Set Budgets</h3>
              <p className="text-muted-foreground">
                Define monthly spending limits for each category and get visual indicators when
                you're approaching or exceeding your budget.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4. View Reports</h3>
              <p className="text-muted-foreground">
                Analyze your spending patterns with interactive charts and detailed breakdowns by
                category and time period.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Purpose</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This project was developed as a Computer Science Engineering (CSE) minor project to
              demonstrate full-stack web development skills. It showcases proficiency in modern
              frontend frameworks, backend services, database management, authentication systems,
              and responsive UI design.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
