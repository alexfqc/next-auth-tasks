import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-orange-600 px-4">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
}
