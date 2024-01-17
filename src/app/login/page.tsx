import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="w-full h-full max-w-80 mx-auto flex flex-col items-center justify-center gap-6">
      <h3 className="text-2xl font-medium">Log In</h3>
      <LoginForm />
    </div>
  );
}
