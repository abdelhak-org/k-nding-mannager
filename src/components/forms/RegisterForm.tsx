"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/lib/validation/auth";

export default function RegisterForm() {
  const router = useRouter();
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const termsId = useId();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = form;

  async function onSubmit(values: RegisterFormValues) {
    clearErrors("root");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json().catch(() => null)) as {
      error?: string;
      fieldErrors?: Partial<Record<keyof RegisterFormValues, string[]>>;
    } | null;

    if (!response.ok) {
      if (payload?.fieldErrors) {
        const fieldErrors = payload.fieldErrors;

        const fieldNames = Object.keys(fieldErrors) as Array<
          keyof RegisterFormValues
        >;

        for (const fieldName of fieldNames) {
          const message = fieldErrors[fieldName]?.[0];

          if (message) {
            setError(fieldName, {
              type: "server",
              message,
            });
          }
        }
      }

      setError("root", {
        type: "server",
        message: payload?.error ?? "Unable to create your account right now.",
      });
      return;
    }

    router.push(appConfig.routes.login);
    router.refresh();
  }

  return (
    <Card className="w-full rounded-3xl border border-border/70 bg-card/95 shadow-lg shadow-black/5 backdrop-blur">
      <CardHeader className="space-y-2 px-6 pt-6 sm:px-8 sm:pt-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Create account
        </p>
        <CardTitle className="text-3xl">
          Start reviewing contracts with clarity.
        </CardTitle>
        <CardDescription className="text-sm leading-6 sm:text-base">
          Build your account to save analyses, revisit results, and compare
          German telecom offers in one place.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={firstNameId}>First name</Label>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => {
                  const { ref: _ref, ...fieldProps } = field;

                  return (
                    <Input
                      id={firstNameId}
                      type="text"
                      placeholder="Max"
                      autoComplete="given-name"
                      aria-invalid={Boolean(errors.firstName)}
                      className="h-12 rounded-2xl px-4"
                      {...fieldProps}
                    />
                  );
                }}
              />
              {errors.firstName ? (
                <p className="text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor={lastNameId}>Last name</Label>
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => {
                  const { ref: _ref, ...fieldProps } = field;

                  return (
                    <Input
                      id={lastNameId}
                      type="text"
                      placeholder="Mustermann"
                      autoComplete="family-name"
                      aria-invalid={Boolean(errors.lastName)}
                      className="h-12 rounded-2xl px-4"
                      {...fieldProps}
                    />
                  );
                }}
              />
              {errors.lastName ? (
                <p className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              ) : null}
            </div>
          </div>

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

          <div className="grid gap-5 sm:grid-cols-2">
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
                      placeholder="Create a strong password"
                      autoComplete="new-password"
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

            <div className="space-y-2">
              <Label htmlFor={confirmPasswordId}>Confirm password</Label>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => {
                  const { ref: _ref, ...fieldProps } = field;

                  return (
                    <PasswordInput
                      id={confirmPasswordId}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      aria-invalid={Boolean(errors.confirmPassword)}
                      className="h-12 rounded-2xl px-4"
                      {...fieldProps}
                    />
                  );
                }}
              />
              {errors.confirmPassword ? (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              ) : null}
            </div>
          </div>

          <Alert className="rounded-2xl border-border bg-secondary/70">
            <AlertTitle>What happens next</AlertTitle>
            <AlertDescription>
              Your details are sent to the registration endpoint, your password
              is hashed on the server, and you can then sign in with NextAuth
              credentials.
            </AlertDescription>
          </Alert>

          <div className="rounded-2xl border border-border px-4 py-3">
            <div className="flex items-start gap-3">
              <Controller
                control={control}
                name="terms"
                render={({ field }) => (
                  <Checkbox
                    id={termsId}
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                    aria-invalid={Boolean(errors.terms)}
                  />
                )}
              />
              <div className="space-y-1">
                <Label htmlFor={termsId} className="leading-5 text-foreground">
                  I understand that {appConfig.name} is a decision-support tool
                  and not legal advice.
                </Label>
                <p className="text-sm text-muted-foreground">
                  You can still review telecom offers, but the output should not
                  replace professional legal advice.
                </p>
              </div>
            </div>
            {errors.terms ? (
              <p className="mt-3 text-sm text-destructive">
                {errors.terms.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-2xl text-sm font-semibold"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>

          {errors.root?.message ? (
            <Alert variant="destructive" className="rounded-2xl">
              <AlertTitle>Registration failed</AlertTitle>
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          ) : null}

          {isSubmitSuccessful ? (
            <Alert className="rounded-2xl border-primary/20 bg-primary/10">
              <AlertTitle>Account created</AlertTitle>
              <AlertDescription>
                Redirecting you to the sign-in page.
              </AlertDescription>
            </Alert>
          ) : null}

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={appConfig.routes.login}
              className="font-medium text-primary underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
