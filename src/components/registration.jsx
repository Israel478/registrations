import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css'

export default function Registration() {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Update password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Get password strength color
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
      case 3:
        return 'bg-yellow-500';
      case 4:
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  // Validate form fields
  const validateForm = () => {
    const formErrors = {};
    const { firstname, lastname, email, password, confirmPassword } = formData;

    // Name validations
    if (!firstname.trim()) {
      formErrors.firstname = 'First name is required';
    } else if (!/^[A-Za-z\s]{2,}$/.test(firstname)) {
      formErrors.firstname = 'First name should contain only letters and be at least 2 characters';
    }

    if (!lastname.trim()) {
      formErrors.lastname = 'Last name is required';
    } else if (!/^[A-Za-z\s]{2,}$/.test(lastname)) {
      formErrors.lastname = 'Last name should contain only letters and be at least 2 characters';
    }

    // Email validation
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      formErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)) {
      formErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    return formErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitted(true);
      
      // Add new user to the list
      const newUser = {
        id: Date.now(),
        firstname: formData.firstname,
        middlename: formData.middlename,
        lastname: formData.lastname,
        email: formData.email,
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers([...users, newUser]);
      
      // Reset form
      setFormData({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setPasswordStrength(0);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } else {
      setErrors(formErrors);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-3 sm:max-w-xl sm:mx-auto"
      >
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-5"
            >
              <div className="block pl-2 font-semibold text-xl text-gray-700">
                <h2 className="leading-relaxed">Create an Account</h2>
              </div>
            </motion.div>
            
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
                >
                  Registration Successful!
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col"
                >
                  <label className="leading-loose">First Name *</label>
                  <input
                    type="text"
                    className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none ${errors.firstname ? 'border-red-500' : ''}`}
                    placeholder="Enter your first name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.firstname && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.firstname}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col"
                >
                  <label className="leading-loose">Middle Name</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                    placeholder="Enter your middle name (optional)"
                    name="middlename"
                    value={formData.middlename}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col"
                >
                  <label className="leading-loose">Last Name *</label>
                  <input
                    type="text"
                    className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none ${errors.lastname ? 'border-red-500' : ''}`}
                    placeholder="Enter your last name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.lastname && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.lastname}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col"
                >
                  <label className="leading-loose">Email *</label>
                  <input
                    type="email"
                    className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col"
                >
                  <label className="leading-loose">Password *</label>
                  <input
                    type="password"
                    className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {/* Password strength indicator */}
                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                      className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password strength: {passwordStrength === 0 ? 'Very Weak' : 
                                     passwordStrength === 1 ? 'Weak' :
                                     passwordStrength === 2 ? 'Fair' :
                                     passwordStrength === 3 ? 'Good' :
                                     passwordStrength === 4 ? 'Strong' : 'Very Strong'}
                  </p>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col"
                >
                  <label className="leading-loose">Confirm Password *</label>
                  <input
                    type="password"
                    className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-cyan-800 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-cyan-700 transition-colors"
                >
                  Create Account
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* User List Section */}
      <AnimatePresence>
        {users.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 sm:max-w-xl sm:mx-auto"
          >
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Registered Users
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  List of all registered users
                </p>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <motion.li
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-cyan-800 truncate">
                            {user.firstname} {user.middlename ? `${user.middlename} ` : ''}{user.lastname}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
