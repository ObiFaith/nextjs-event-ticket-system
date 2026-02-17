import { memo } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput = memo(
  ({
    id,
    label,
    type = "text",
    placeholder,
    value,
    error,
    onChange,
  }: FormInputProps) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? "border-destructive" : ""}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
  (prev, next) => prev.value === next.value && prev.error === next.error,
);
