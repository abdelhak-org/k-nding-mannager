"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { appConfig } from "@/constants";
import { loginFormSchema, type LoginFormValues } from "@/lib/validation/auth";

export default function LoginForm() {
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();
  const rememberId = useId();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = form;

  async function onSubmit(values: LoginFormValues) {
    clearErrors("root");

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: appConfig.routes.dashboard,
    });

    if (!result || result.error) {
      setError("root", {
        type: "server",
        message: "Invalid email or password.",
      });
      return;
    }

    router.push(result.url ?? appConfig.routes.dashboard);
    router.refresh();
  }

  return (
    <Card className="w-full rounded-3xl border border-border/70 bg-card/95 shadow-lg shadow-black/5 backdrop-blur">
      <CardHeader className="space-y-2 px-6 pt-6 sm:px-8 sm:pt-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Welcome back
        </p>
        <CardTitle className="text-3xl">
          Sign in to continue your contract reviews.
        </CardTitle>
        <CardDescription className="text-sm leading-6 sm:text-base">
          Access saved analyses, review flagged terms, and continue comparing
          German telecom offers from your dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor={emailId}>Email address</Label>
            <Controller
              control={control}
              name="email"
              render={({ field }) => {
                const { ref: _ref, ...fieldProps } = field;

                return (
                  <Input
                    id={emailId}
                    type="email"
                    placeholder="name@example.de"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    className="h-12 rounded-2xl px-4"
                    {...fieldProps}
                  />
                );
              }}
            />
            {errors.email ? (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor={passwordId}>Password</Label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => {
                const { ref: _ref, ...fieldProps } = field;

                return (
                  <PasswordInput
                    id={passwordId}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-invalid={Boolean(errors.password)}
                    className="h-12 rounded-2xl px-4"
                    {...fieldProps}
                  />
                );
              }}
            />
            {errors.password ? (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Controller
                control={control}
                name="remember"
                render={({ field }) => (
                  <Checkbox
                    id={rememberId}
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                )}
              />
              <Label
                htmlFor={rememberId}
                className="leading-5 font-normal text-muted-foreground"
              >
                Keep me signed in
              </Label>
            </div>

            <Button
              type="button"
              variant="link"
              className="h-auto px-0 text-sm font-medium"
            >
              Forgot password?
            </Button>
          </div>

          <Alert className="rounded-2xl border-border bg-secondary/70">
            <AlertTitle>How sign-in works</AlertTitle>
            <AlertDescription>
              This form now signs in through NextAuth credentials and redirects
              after a successful login.
            </AlertDescription>
          </Alert>

          {errors.root?.message ? (
            <Alert variant="destructive" className="rounded-2xl">
              <AlertTitle>Sign-in failed</AlertTitle>
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          ) : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-2xl text-sm font-semibold"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>

          {isSubmitSuccessful ? (
            <Alert className="rounded-2xl border-primary/20 bg-primary/10">
              <AlertTitle>Login successful</AlertTitle>
              <AlertDescription>Redirecting you to the app.</AlertDescription>
            </Alert>
          ) : null}

          <p className="text-center text-sm text-muted-foreground">
            Need an account?{" "}
            <Link
              href={appConfig.routes.register}
              className="font-medium text-primary underline underline-offset-4"
            >
              Create one
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
