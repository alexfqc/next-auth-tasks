export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-4 max-w-md">
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </main>
  );
}
