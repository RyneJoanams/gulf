import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);  // State for password visibility toggle
  const navigate = useNavigate();
  const location = useLocation();
  const department = location.state?.department || 'Default Department';  // Fallback if department is undefined

  // Mapping departments to their respective routes
  const departmentRoutes = {
    'Front-office': '/front-office',
    'Accounts': '/accounts',
    'Phlebotomy': '/phlebotomy',
    'Laboratory': '/lab',
    'Clinical': '/clinical',
    'Admin': '/admin',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate authentication logic (replace with real API call)
    if (values.username === 'user' && values.password === 'pass') {
      const route = departmentRoutes[department] || '/';  // Default to home if department is unknown
      navigate(route);
    } else {
      alert('Invalid credentials');
    }
    setSubmitting(false);  // Finish submission process
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">Login to {department}</h1>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Username Field */}
              <div className="flex flex-col relative">
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password Field with Toggle Visibility */}
              <div className="flex flex-col relative">
                <Field
                  type={showPassword ? "text" : "password"}  // Toggle between text and password types
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500"
                />
                {/* Show/hide password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 0 12 0c2.21 0 4.302.742 5.983 1.992M22 12c0 2.21-.742 4.302-1.992 5.983M16.5 12a4.5 4.5 0 00-9 0m-6 0a9 9 0 0118 0"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h.01M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zm-7.5 0a3 3 0 100 6 3 3 0 000-6zm-7 0a7 7 0 0014 0"></path>
                    </svg>
                  )}
                </button>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded text-white font-bold ${
                  isSubmitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-teal-500 hover:bg-teal-600 transition duration-300'
                }`}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>

        {/* Back to Home Button */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-teal-500 hover:text-teal-600 font-semibold transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
