"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "./AuthContext"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Phone, Lock, Github, Chrome, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [signupUrl, setSignupUrl] = useState("/signup")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  })
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Set the signup URL with the current page as return URL
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    setSignupUrl(`/signup?returnUrl=${encodeURIComponent(currentUrl)}`);
  }, [pathname]); // Re-run when pathname changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login({
        [loginMethod]: formData[loginMethod],
        password: formData.password,
      })
      onClose()
    } catch (error) {
      console.error("Login failed:", error)
      // TODO: Show error message
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
          <DialogDescription className="text-center">
            Login to view service provider details
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="credentials" className="w-full">
          <TabsContent value="credentials" className="mt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    type="button"
                    variant={loginMethod === "email" ? "default" : "outline"}
                    onClick={() => setLoginMethod("email")}
                    className="w-full"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={loginMethod === "phone" ? "default" : "outline"}
                    onClick={() => setLoginMethod("phone")}
                    className="w-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </Button>
                </div>

                <div className="space-y-1">
                  <Label htmlFor={loginMethod}>
                    {loginMethod === "email" ? "Email" : "Phone Number"}
                  </Label>
                  <div className="relative">
                    <Input
                      id={loginMethod}
                      type={loginMethod === "email" ? "email" : "tel"}
                      placeholder={loginMethod === "email" ? "name@example.com" : "+27 123 456 789"}
                      value={formData[loginMethod]}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [loginMethod]: e.target.value }))
                      }
                      className="pl-10"
                      required
                    />
                    {loginMethod === "email" ? (
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, password: e.target.value }))
                      }
                      className="pl-10 pr-10"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="w-full">
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <Link
                  href={signupUrl}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                  onClick={onClose}
                >
                  Sign up
                </Link>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 