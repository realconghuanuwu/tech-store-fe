import { PATH } from "@/constants/router.constant";
import { Button, Input } from "antd";
import { Link } from "react-router";

export default function LoginForm() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-100 to-blue-200 items-center justify-center p-12">
        <div className="relative">
          <div className="w-96 h-96 bg-white/20 rounded-2xl flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-6xl mb-4">🛒📱🛍️</div>
              <p className="text-lg">Shopping Illustration</p>
              <p className="text-sm opacity-75">Replace with actual image</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              Log in to Exclusive
            </h1>
            <p className="text-gray-600">Enter your details below</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="sr-only">
                Email or Phone Number
              </label>
              <Input
                id="email"
                type="text"
                placeholder="Email or Phone Number"
                className="h-12 border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-gray-900 focus:ring-0"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="h-12 border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-gray-900 focus:ring-0"
              />
            </div>

            <div className="space-y-4 pt-4">
              <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-medium">
                Log in
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-center">
                <Link
                  to={PATH.FORGOT_PASSWORD}
                  className="text-red-500 hover:text-red-600"
                >
                  Forget Password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
