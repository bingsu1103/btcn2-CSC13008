import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import apiAuth from "@/services/apiAuth";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const loginSchema = z.object({
  username: z.string().min(3, "Username phải ít nhất 3 ký tự"),
  password: z.string().min(6, "Password phải ít nhất 6 ký tự"),
});

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values) => {
    try {
      const response = await apiAuth.login(values);

      if (response?.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", response.token);
        toast.success(response.message || "Login successful");
        form.reset();
        return;
      }

      toast.error(response?.message || "Login failed");
    } catch (error) {
      toast.error("Login failed!");
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Login
              </Button>

              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <Link to="/register" className="underline text-primary">
                  Register
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
