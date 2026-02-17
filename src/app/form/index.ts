export const LoginForm = [
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "you@example.com",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "••••••••",
  },
];

export const SignupForm = [
  {
    id: "name",
    type: "text",
    label: 'Full Name',
    placeholder: "John Doe",
  },
  ...LoginForm,
  {
    id: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    placeholder: "••••••••",
  },
];
