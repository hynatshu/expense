import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function Budget() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const currentMonth = new Date().toISOString().slice(0, 7) + "-01";
    
    const [categoriesResult, budgetsResult, expensesResult] = await Promise.all([
      supabase.from("categories").select("*").eq("user_id", user?.id),
      supabase.from("budgets").select("*, categories(*)").eq("user_id", user?.id).eq("month", currentMonth),
      supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user?.id)
        .gte("date", currentMonth)
    ]);

    if (categoriesResult.data) setCategories(categoriesResult.data);
    if (budgetsResult.data) setBudgets(budgetsResult.data);
    if (expensesResult.data) setExpenses(expensesResult.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentMonth = new Date().toISOString().slice(0, 7) + "-01";
    
    const { error } = await supabase.from("budgets").upsert({
      user_id: user?.id,
      category_id: selectedCategory,
      month: currentMonth,
      limit_amount: parseFloat(amount),
    }, {
      onConflict: "user_id,category_id,month"
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Budget updated successfully!",
      });
      setSelectedCategory("");
      setAmount("");
      fetchData();
    }
  };

  const getCategorySpending = (categoryId: string) => {
    return expenses
      .filter(exp => exp.category_id === categoryId)
      .reduce((sum, exp) => sum + Number(exp.amount), 0);
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Budget Planner</h1>
          <p className="text-muted-foreground">
            Set monthly budgets and track your spending limits
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Set Category Budget</CardTitle>
            <CardDescription>
              Define spending limits for this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Budget Limit ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" disabled={!selectedCategory || !amount}>
                Set Budget
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Current Month Budgets</h2>
          
          {budgets.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No budgets set for this month. Start by setting a budget above!
              </CardContent>
            </Card>
          ) : (
            budgets.map((budget) => {
              const spent = getCategorySpending(budget.category_id);
              const limit = Number(budget.limit_amount);
              const percentage = (spent / limit) * 100;
              const isOverBudget = percentage > 100;
              
              return (
                <Card key={budget.id} className={isOverBudget ? "border-destructive" : ""}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {budget.categories?.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            ${spent.toFixed(2)} of ${limit.toFixed(2)}
                          </p>
                        </div>
                        {isOverBudget ? (
                          <div className="flex items-center gap-2 text-destructive">
                            <AlertCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">Over Budget</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="text-sm font-medium">On Track</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{percentage.toFixed(1)}% used</span>
                          <span>${(limit - spent).toFixed(2)} remaining</span>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className={isOverBudget ? "[&>div]:bg-destructive" : "[&>div]:bg-success"}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}
