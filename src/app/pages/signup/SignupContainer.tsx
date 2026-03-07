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
    firstName: "",
    lastName: "",
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validation
      const { lastName, firstName, email, password, confirmPassword } = form;
      const newErrors: Partial<FormType> = Object.fromEntries(
        [
          !lastName && ["lastName", "Last Name is required"],
          !firstName && ["firstName", "First Name is required"],
          !email && ["email", "Email is required"],
          !password && ["password", "Password is required"],
          !confirmPassword && [
            "confirmPassword",
            "Please confirm your password",
          ],
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

      const message = await signup({ lastName, firstName, email, password });
      toast.success(message);
      navigate("/dashboard");
    },
    [form, signup, navigate],
  );

  return (
    <SingupPresenter
      form={form}
      errors={errors}
      onChange={handleForm}
      onSubmit={handleSubmit}
    />
  );
};
