
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../ContextAPI/AuthContext"
import { useForm } from "react-hook-form"
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa"
import wencong_logo from '../../../public/huntrerboom_logo.png'
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, loading, error } = useContext(AuthContext)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (data) => {
    const remember = !!data.rememberAccount;
    const result = await signIn(data.email, data.password, remember);
    if (result.success) {
      navigate("/dashboard");
    }
    // error handled by context
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="w-full h-full bg-cover bg-center bg-hero-bg"
          // style={{ backgroundImage: "url('../../../public/login_side.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30" />
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 bg-white">
        <div className="w-full max-w-lg space-y-4 sm:space-y-6">
          <div className="text-center">
            <div className="rounded-full flex items-center justify-center mx-auto mb-4">
              <img src={wencong_logo} alt="" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#DE472D]">Sign In</h2>
            <p className="text-[#35465B] text-base sm:text-xl md:text-[20px] capitalize mt-2 sm:mt-3">Welcome back</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="">
    
            <div className="mb-8 sm:mb-12 md:mb-16">
              <label className="block text-[#F04E24] text-base sm:text-lg md:text-[18px] font-medium mb-1">Email Address</label>
              <input
                type="email"
                className={`input input-bordered h-[50px] sm:h-[55px] md:h-[61px] rounded-[12px] sm:rounded-[18px] ps-3 sm:ps-5 w-full bg-[#FFE4DF] border-none text-sm sm:text-base md:text-[16px] text-[#797D8C] font-medium ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[#F04E24] text-base sm:text-lg md:text-[18px] font-medium">Password</label>
                <button
                  type="button"
                  className="text-sm italic hover:underline text-[#516F90]"
                  onClick={() => alert("Password reset link")}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered h-[50px] sm:h-[55px] md:h-[61px] rounded-[12px] sm:rounded-[18px] ps-3 sm:ps-5 text-sm sm:text-base md:text-[16px] text-[#797D8C] font-medium w-full bg-red-50 border-red-200 focus:border-orange-500 pr-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

          <div className="flex items-center gap-2 pt-3 pb-10">
            <input type="checkbox" className="checkbox rounded-[3px] h-[20px] w-[20px] bg-[#FFE4DF] border-none checked:bg-[#FFE4DF]" {...register("rememberAccount")}/>
              <p className="italic text-base text-[#7C97B6]">Remember Me</p>
          </div>

            {/* Submit Button */}
           <div className="flex items-center justify-center">
             <button
              type="submit"
            
              className="h-[45px] sm:h-[50px] md:h-[58px] w-full sm:w-[200px] md:w-[252px] bg-[#F04E24] text-base sm:text-lg md:text-[20px] hover:bg-orange-600 rounded-[12px] sm:rounded-[18px] text-white font-medium"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}
            </button>
           </div>
          </form>

        
        </div>
      </div>
    </div>
  )

}
