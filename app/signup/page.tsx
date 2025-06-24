"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/auth/AuthContext"
import { Mail, Phone, Lock, User, Github, Chrome, Upload, Check, X, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

// Update the form data type to match the User interface
interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl')
  const { signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Password strength requirements
  const requirements = [
    { re: /.{8,}/, label: 'At least 8 characters' },
    { re: /[0-9]/, label: 'At least one number' },
    { re: /[a-z]/, label: 'At least one lowercase letter' },
    { re: /[A-Z]/, label: 'At least one uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'At least one special character' }
  ]

  // Update password strength when password changes
  useEffect(() => {
    const password = formData.password
    let strength = 0
    requirements.forEach(requirement => {
      if (requirement.re.test(password)) {
        strength += 1
      }
    })
    setPasswordStrength((strength / requirements.length) * 100)
  }, [formData.password])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (passwordStrength < 60) {
      newErrors.password = "Password is not strong enough"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Create user data object that matches the User interface
      const userData = {
        name: formData.fullName, // Use fullName as the name
        email: formData.email,
        phone: formData.phone,
        fullName: formData.fullName,
        profileImage: imagePreview, // Use the image preview URL
      }
      await signup(userData)
      router.push(returnUrl || '/')
    } catch (error) {
      console.error("Signup failed:", error)
      // TODO: Show error message
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-2 xs:p-4">
      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md space-y-8 bg-white dark:bg-gray-900 p-4 xs:p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-xl xs:text-2xl font-bold tracking-tight">Create an Account</h2>
          <p className="text-xs xs:text-sm text-muted-foreground mt-2">
            Enter your details below to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-24">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-[#00A3E0] text-white p-2 rounded-full cursor-pointer hover:bg-[#00A3E0]/90 transition"
              >
                <Upload className="w-4 h-4" />
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <span className="text-sm text-muted-foreground">Profile picture (optional)</span>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className={cn("pl-10", errors.fullName && "border-red-500")}
                placeholder="John Doe"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={cn("pl-10", errors.email && "border-red-500")}
                placeholder="name@example.com"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={cn("pl-10", errors.phone && "border-red-500")}
                placeholder="+27 123 456 789"
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className={cn("pl-10 pr-10", errors.password && "border-red-500")}
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
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            
            {/* Password Strength Indicator */}
            <div className="space-y-2">
              <Progress value={passwordStrength} className="h-2" />
              <div className="text-sm text-muted-foreground">
                Password strength: {passwordStrength < 20 ? 'Very Weak' : passwordStrength < 40 ? 'Weak' : passwordStrength < 60 ? 'Fair' : passwordStrength < 80 ? 'Good' : 'Strong'}
              </div>
              <div className="space-y-2">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {requirement.re.test(formData.password) ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm text-muted-foreground">{requirement.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className={cn("pl-10 pr-10", errors.confirmPassword && "border-red-500")}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
              }
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground"
            >
              I accept the{" "}
              <Link href="/terms" className="text-[#00A3E0] hover:underline">
                terms and conditions
              </Link>
            </label>
          </div>
          {errors.acceptTerms && <p className="text-sm text-red-500">{errors.acceptTerms}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#00A3E0] hover:bg-[#00A3E0]/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          {errors.submit && <p className="text-sm text-red-500 text-center">{errors.submit}</p>}

          {/* Social Sign Up */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-muted-foreground">
                Or continue with
              </span>
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

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={returnUrl ? `/?returnUrl=${encodeURIComponent(returnUrl)}` : "/"}
              className="text-[#00A3E0] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
} 