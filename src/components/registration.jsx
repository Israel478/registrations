import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError, setLoading } from '../store/slices/authSlice';

export default function Registration() {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.auth);
  
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
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [focusedField, setFocusedField] = useState(null);

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

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.firstname.trim() !== '' &&
      formData.lastname.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      formData.password === formData.confirmPassword &&
      passwordStrength >= 3 // Requiring at least medium password strength
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      dispatch(setLoading(true));
      try {
        // Here you would typically make an API call to register the user
        // For now, we'll simulate a successful registration
        const userData = {
          ...formData,
          id: Date.now(), // temporary ID
        };
        dispatch(setUser(userData));
        setIsSubmitted(true);
        setFormData({
          firstname: '',
          middlename: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-2xl p-8 space-y-6 border border-white/20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Create Account
            </h2>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields */}
            {Object.entries({
              firstname: 'First Name',
              middlename: 'Middle Name',
              lastname: 'Last Name',
              email: 'Email',
              password: 'Password',
              confirmPassword: 'Confirm Password'
            }).map(([field, label]) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <motion.input
                  type={field.includes('password') ? 'password' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(field)}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-gray-800/50 text-white rounded-lg border ${
                    errors[field] 
                      ? 'border-red-500' 
                      : focusedField === field 
                        ? 'border-cyan-400' 
                        : 'border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300`}
                  placeholder={label}
                />
                <AnimatePresence>
                  {errors[field] && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute text-sm text-red-400 mt-1"
                    >
                      {errors[field]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Password Strength Indicator */}
            {formData.password && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1 w-full rounded-full ${
                        index < passwordStrength
                          ? [
                              'bg-red-500',
                              'bg-orange-500',
                              'bg-yellow-500',
                              'bg-green-500',
                              'bg-cyan-500'
                            ][passwordStrength - 1]
                          : 'bg-gray-600'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-300">
                  Password Strength: {
                    ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][
                      passwordStrength - 1
                    ] || 'None'
                  }
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isFormValid() || loading}
              className={`w-full relative overflow-hidden group ${
                isFormValid() && !loading
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
                  : 'bg-gray-600 cursor-not-allowed'
              } text-white px-6 py-3 rounded-lg font-medium transition-all duration-300`}
              whileHover={{ scale: isFormValid() ? 1.02 : 1 }}
              whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-3 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                <>
                  <span className="relative z-10">Register</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{ opacity: isFormValid() ? 0 : 1 }}
                  />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="max-w-md mx-auto mt-8 space-y-4">
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="backdrop-blur-lg bg-green-500/20 border border-green-500/50 rounded-lg p-4"
            >
              <p className="text-green-400">
                <span className="font-bold">Success!</span> Registration completed successfully.
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="backdrop-blur-lg bg-red-500/20 border border-red-500/50 rounded-lg p-4"
            >
              <p className="text-red-400">
                <span className="font-bold">Error!</span> {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Users List */}
      <AnimatePresence>
        {users.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="px-6 py-5">
                <h3 className="text-2xl font-bold text-white">
                  Registered Users
                </h3>
                <p className="text-gray-300 mt-1">
                  Total users: {users.length}
                </p>
              </div>
              <div className="border-t border-white/10">
                <ul className="divide-y divide-white/10">
                  {users.map((user, index) => (
                    <motion.li
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-6 py-4 hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                            {user.firstname[0]}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <motion.p 
                            className="text-lg font-medium text-white truncate group-hover:text-cyan-400 transition-colors"
                            whileHover={{ scale: 1.02 }}
                          >
                            {user.firstname} {user.middlename ? `${user.middlename} ` : ''}{user.lastname}
                          </motion.p>
                          <p className="text-gray-400 truncate">
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
