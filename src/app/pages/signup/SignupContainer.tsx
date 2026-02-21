import { toast } from "sonner";
import { FormType } from "./type";
import { useNavigate } from "react-router";
import { useAuthActions } from "../../hook";
import { useCallback, useState } from "react";
import { SingupPresenter } from "./SignupPresenter";

export const SignupContainer = () => {
  const navigate = useNavigate();
  const { signup } = useAuthActions();

  const [form, setForm] = useState<FormType>({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormType>>({});

  const handleForm = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      setErrors(prev => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const { name, email, password, confirmPassword } = form;
    const newErrors: Partial<FormType> = Object.fromEntries(
      [
        !name && ["name", "Name is required"],
        !email && ["email", "Email is required"],
        !password && ["password", "Password is required"],
        !confirmPassword && ["confirmPassword", "Please confirm your password"],
        password &&
          confirmPassword &&
          password !== confirmPassword && [
            "confirmPassword",
            "Passwords do not match",
          ],
      ].filter(Boolean) as [keyof typeof errors, string][],
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    signup(name, email, password);
    toast.success("Account created successfully!");
    navigate("/dashboard");
  };

  return (
    <SingupPresenter
      form={form}
      errors={errors}
      onChange={handleForm}
      onSubmit={handleSubmit}
    />
  );
};
