import RegisterForm from "./registerFom";

export default function RegisterPage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Register</h1>
      <RegisterForm />
    </main>
  );
}
