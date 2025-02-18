import { useAuth } from '../context/AuthContext';

function Login() {
  const { setIsLoggedIn } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    setIsLoggedIn(true);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold text-primary mb-6">Business Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-primary hover:text-primary-dark">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
        >
          Sign in
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">Don't have a business account? </span>
        <a href="#" className="text-sm text-primary hover:text-primary-dark">
          Register here
        </a>
      </div>
    </div>
  );
}

export default Login; 