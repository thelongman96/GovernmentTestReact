import { Outlet } from "react-router";
import "./styles/authStyles.scss";
import { useState } from "react";
import { AuthLayoutContextType } from "./types/AuthLayoutContext";
// import { Eye, EyeOff, User, Mail, Lock, LogOut, Menu } from 'lucide-react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Fade,
  CircularProgress,
} from "@mui/material";

import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Dashboard,
  ExitToApp,
  AccountCircle,
} from "@mui/icons-material";

const AuthLayout = () => {
  const [showSocials, setShowSocials] = useState<boolean>(false);
  const [documentTitle, setDocumentTitle] = useState<string>("");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Outlet
        context={
          {
            showSocials,
            setShowSocials,
            documentTitle,
            setDocumentTitle,
          } satisfies AuthLayoutContextType
        }
      />
    </Box>
  );

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-4">
  //     <div className="max-w-md w-full bg-white rounded-xl shadow-2xl">
  //       <div className="p-8">
  //         <Outlet
  //           context={
  //             {
  //               showSocials,
  //               setShowSocials,
  //               documentTitle,
  //               setDocumentTitle,
  //             } satisfies AuthLayoutContextType
  //           }
  //         />
  //         {/* <div className="text-center mb-8">
  //           <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
  //             <User className="w-8 h-8 text-white" />
  //           </div>
  //           <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
  //           <p className="text-gray-600">
  //             {authTab === 'login' ? 'Sign in to your account' : 'Create your account'}
  //           </p>
  //         </div> */}

  //         {/* <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
  //           <button
  //             className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
  //               authTab === 'login'
  //                 ? 'bg-white text-blue-600 shadow-sm'
  //                 : 'text-gray-600 hover:text-gray-900'
  //             }`}
  //             onClick={() => setAuthTab('login')}
  //           >
  //             Login
  //           </button>
  //           <button
  //             className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
  //               authTab === 'register'
  //                 ? 'bg-white text-blue-600 shadow-sm'
  //                 : 'text-gray-600 hover:text-gray-900'
  //             }`}
  //             onClick={() => setAuthTab('register')}
  //           >
  //             Register
  //           </button>
  //         </div>

  //         <div>

  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Email
  //             </label>
  //             <div className="relative">
  //               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  //               <input
  //                 type="email"
  //                 name="email"
  //                 value={formData.email}
  //                 onChange={handleInputChange}
  //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //                 placeholder="Enter your email"
  //               />
  //             </div>
  //           </div>

  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Password
  //             </label>
  //             <div className="relative">
  //               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  //               <input
  //                 type={showPassword ? 'text' : 'password'}
  //                 name="password"
  //                 value={formData.password}
  //                 onChange={handleInputChange}
  //                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //                 placeholder="Enter your password"
  //               />
  //               <button
  //                 type="button"
  //                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
  //                 onClick={() => setShowPassword(!showPassword)}
  //               >
  //                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  //               </button>
  //             </div>
  //           </div>

  //           <button
  //             onClick={handleAuth}
  //             className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
  //           >
  //             {authTab === 'login' ? 'Sign In' : 'Create Account'}
  //           </button>
  //         </div> */}
  //       </div>
  //     </div>
  //   </div>
  //   // <div className="authStyles__container">
  //   //   <div className="authStyles__backgroundCover" />
  //   //   <title>{documentTitle}</title>
  //   //   <div className="authStyles__content">
  //   //     <div className="authStyles__wrapper">
  //   //       <div className="authStyles__outlet">
  //   //         <Outlet
  //   //           context={
  //   //             {
  //   //               showSocials,
  //   //               setShowSocials,
  //   //               documentTitle,
  //   //               setDocumentTitle,
  //   //             } satisfies AuthLayoutContextType
  //   //           }
  //   //         />
  //   //       </div>
  //   //     </div>
  //   //   </div>
  //   //   <footer className="authStyles__footer">
  //   //     <Footer />
  //   //   </footer>
  //   // </div>
  // );

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-4">
  //         <div className="max-w-md w-full">
  //           <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transition-all duration-300">
  //             <div className="text-center mb-8">
  //               <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
  //                 <Lock className="w-8 h-8 text-white" />
  //               </div>
  //               <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
  //               <p className="text-gray-600">Sign in to your account</p>
  //             </div>

  //             <form onSubmit={handleSubmit} className="space-y-6">
  //               <div>
  //                 <div className="relative">
  //                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  //                   <input
  //                     type="email"
  //                     placeholder="Email Address"
  //                     className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
  //                       errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
  //                     }`}
  //                     value={formData.email}
  //                     onChange={handleInputChange('email')}
  //                   />
  //                 </div>
  //                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
  //               </div>

  //               <div>
  //                 <div className="relative">
  //                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  //                   <input
  //                     type={showPassword ? 'text' : 'password'}
  //                     placeholder="Password"
  //                     className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
  //                       errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
  //                     }`}
  //                     value={formData.password}
  //                     onChange={handleInputChange('password')}
  //                   />
  //                   <button
  //                     type="button"
  //                     onClick={() => setShowPassword(!showPassword)}
  //                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
  //                   >
  //                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  //                   </button>
  //                 </div>
  //                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
  //               </div>

  //               <button
  //                 type="submit"
  //                 disabled={loading}
  //                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  //               >
  //                 {loading ? (
  //                   <div className="flex items-center justify-center">
  //                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
  //                     Signing In...
  //                   </div>
  //                 ) : (
  //                   'Sign In'
  //                 )}
  //               </button>

  //               <div className="relative">
  //                 <div className="absolute inset-0 flex items-center">
  //                   <div className="w-full border-t border-gray-300" />
  //                 </div>
  //                 <div className="relative flex justify-center text-sm">
  //                   <span className="px-2 bg-white text-gray-500">or</span>
  //                 </div>
  //               </div>

  //               <div className="text-center">
  //                 <span className="text-gray-600">Don't have an account? </span>
  //                 <button
  //                   type="button"
  //                   onClick={() => setCurrentPage('register')}
  //                   className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
  //                 >
  //                   Sign Up
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  // )
};

export default AuthLayout;
