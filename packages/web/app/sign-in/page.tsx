"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { AuthSignInDto } from "@portfolio/api";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useMemo } from "react";
import { useAuthStore } from "@/stores/auth";

const validationSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const authSignIn = useAuthStore((state) => state.signIn);

  const signInMutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: signIn,
    onSuccess: (res) => {
      authSignIn(res.data.access_token);
      router.push("/admin");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    },
  });

  const form = useFormik<AuthSignInDto>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => signInMutation.mutate(values),
  });

  const errorMessages = useMemo(() => {
    // @ts-ignore
    const message = signInMutation.error?.response?.data?.message;

    if (!message) return [];
    return Array.isArray(message) ? message : [message];
  }, [signInMutation.error]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
                {errorMessages.length > 0 && (
                  <Alert variant="destructive" className="max-w-md">
                    <AlertCircleIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      <ul>
                        {errorMessages.map((msg, index) => (
                          <li key={index}>{msg}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...form.getFieldProps("email")}
                      id="email"
                      type="text"
                      placeholder="m@example.com"
                    />
                    {form.touched.email && form.errors.email && (
                      <FieldDescription className="mt-1 text-sm text-red-600">
                        {form.errors.email}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      {/* <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a> */}
                    </div>
                    <Input
                      {...form.getFieldProps("password")}
                      id="password"
                      type="password"
                    />
                    {form.touched.password && form.errors.password && (
                      <FieldDescription className="mt-1 text-sm text-red-600">
                        {form.errors.password}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <Button type="submit" disabled={signInMutation.isPending}>
                      {signInMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                    {/* <Button variant="outline" type="button">
                      Login with GitHub
                    </Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account? <a href="#">Sign up</a>
                    </FieldDescription> */}
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
