import { toast } from "sonner";
import { useState } from "react";
import { FormType } from "./type";
import { useNavigate } from "react-router";
import { useAuth } from "../../hook/useAuth";
import { LoginPresenter } from "./LoginPresenter";

export const LoginContainer = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<FormType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormType>>({});

  const handleForm =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      setErrors(prev => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Partial<FormType> = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    login(form.email, form.password);
    toast.success("Logged in successfully!");
    navigate("/dashboard");
  };

  return (
    <LoginPresenter
      form={form}
      errors={errors}
      onChange={handleForm}
      onSubmit={handleSubmit}
    />
  );
};
