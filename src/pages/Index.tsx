// import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import { AuthForm } from "@/components/AuthForm";
// import { TodoForm } from "@/components/TodoForm";
// import { TodoList } from "@/components/TodoList";
// import { Button } from "@/components/ui/button";
// import { LogOut, CheckSquare } from "lucide-react";
// import { toast } from "@/hooks/use-toast";

// const Index = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   useEffect(() => {
//     // Check initial session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     toast({ title: "Signed out", description: "You have been signed out successfully." });
//   };

//   const handleTodoCreated = () => {
//     setRefreshTrigger((prev) => prev + 1);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-background">
//         <div className="animate-pulse text-primary">Loading...</div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <AuthForm />;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <header className="border-b border-primary/30 gradient-card glow-primary">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <CheckSquare className="h-8 w-8 text-primary animate-glow-pulse" />
//               <h1 className="text-3xl font-bold text-gradient">Todo Manager</h1>
//             </div>
//             <Button variant="outline" className="border-primary/50 hover:bg-primary/10" onClick={handleSignOut}>
//               <LogOut className="h-4 w-4 mr-2" />
//               Sign Out
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto space-y-8">
//           <TodoForm onTodoCreated={handleTodoCreated} />
//           <TodoList refreshTrigger={refreshTrigger} />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Index;
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthForm } from "@/components/AuthForm";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out", description: "You have been signed out successfully." });
  };

  const handleTodoCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/30 gradient-card glow-primary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gradient">Todo Manager</h1>
            <Button
              variant="outline"
              className="border-primary/50 hover:bg-primary/10"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <TodoForm onTodoCreated={handleTodoCreated} />
          <TodoList refreshTrigger={refreshTrigger} />
        </div>
      </main>
    </div>
  );
};

export default Index;
