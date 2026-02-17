import { FormType } from "./type";
import { Link } from "react-router";
import { SignupForm } from "../../form";
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

export const SingupPresenter = ({
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your information to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              {SignupForm.map(item => (
                <FormInput
                  id={item.id}
                  key={item.id}
                  type={item.type}
                  label={item.label}
                  onChange={onChange(item.id)}
                  placeholder={item.placeholder}
                  value={form[item.id as keyof typeof form]}
                  error={errors[item.id as keyof typeof errors]}
                />
              ))}
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?
              </span>{" "}
              <Link to="/" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
