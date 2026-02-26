import { toast } from "sonner";
import { FormType } from "./type";
import { useNavigate } from "react-router";
import { useAuthActions } from "../../hook";
import { useCallback, useState } from "react";
import { LoginPresenter } from "./LoginPresenter";


export const LoginContainer = () => {
  const navigate = useNavigate();
  const { login } = useAuthActions();

  const [form, setForm] = useState<FormType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormType>>({});

  const handleForm = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validation
      const newErrors: Partial<FormType> = {};
      if (!form.email) newErrors.email = "Email is required";
      if (!form.password) newErrors.password = "Password is required";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      const message = await login(form.email, form.password);
      toast.success(message || "Logged in successfully!");
      navigate("/dashboard");
    },
    [form, login, navigate],
  );

  return (
    <LoginPresenter
      form={form}
      errors={errors}
      onChange={handleForm}
      onSubmit={handleSubmit}
    />
  );
};
