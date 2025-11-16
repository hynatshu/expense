import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Shield, TrendingUp, Wallet, PieChart, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: Wallet,
      title: "Track Expenses",
      description: "Record and categorize all your daily expenses with ease"
    },
    {
      icon: BarChart3,
      title: "Visual Reports",
      description: "View beautiful charts and insights about your spending patterns"
    },
    {
      icon: TrendingUp,
      title: "Budget Planning",
      description: "Set monthly budgets and get alerts when you're overspending"
    },
    {
      icon: PieChart,
      title: "Category Analysis",
      description: "Understand where your money goes with category breakdowns"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is encrypted and only accessible by you"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified about budget limits and unusual spending"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Take Control of Your
              <span className="text-primary"> Finances</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A simple, powerful expense tracker for students and professionals. 
              Track spending, set budgets, and achieve your financial goals.
            </p>
            <div className="flex gap-4 justify-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth?mode=signup">
                    <Button size="lg" className="gap-2">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signin">
                    <Button size="lg" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Manage Money
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to make expense tracking simple and insightful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of users who are taking control of their finances
            </p>
            {!user && (
              <Link to="/auth?mode=signup">
                <Button size="lg">
                  Create Your Free Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
