import { FormType } from "./type";
import { Link } from "react-router";
import { LoginForm } from "../../form";
import { Logo } from "../../components/Logo";
import { ChangeEvent, FormEvent } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { FormInput } from "../../components/common/FormInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export const LoginPresenter = ({
  form,
  errors,
  onChange,
  onSubmit,
}: {
  form: FormType;
  errors: Partial<FormType>;
  onChange: (
    field: string,
  ) => (e: ChangeEvent<HTMLInputElement, Element>) => void;
  onSubmit: (e: FormEvent<Element>) => void;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              {LoginForm.map(item => (
                <FormInput
                  id={item.id}
                  key={item.id}
                  type={item.type}
                  label={item.label}
                  onChange={onChange(item.id)}
                  placeholder={item.placeholder}
                  value={form[item.id as keyof typeof form]}
                />
              ))}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?
              </span>{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
