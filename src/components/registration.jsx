import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError } from '../store/features/auth/authSlice';

export default function Registration() {
  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.auth);
  
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      dispatch(setUser(formData));
      setIsSubmitted(true);
      setFormData({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setPasswordStrength(0);
    } else {
      setErrors(formErrors);
      dispatch(setError('Please fix the form errors'));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const formErrors = {};
    const { firstname, lastname, email, password, confirmPassword } = formData;

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

    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      formErrors.email = 'Please enter a valid email address';
    }

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

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Register</h2>
          
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-500/10 text-green-500 p-3 rounded-lg text-sm"
            >
              Registration successful!
            </motion.div>
          )}

          <div className="space-y-4">
            {/* Form fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('firstname')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-white/5 p-3 rounded-lg outline-none transition-all ${
                    focusedField === 'firstname' ? 'ring-2 ring-cyan-500' : ''
                  }`}
                  placeholder="First Name"
                />
                {errors.firstname && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.firstname}
                  </motion.p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('lastname')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-white/5 p-3 rounded-lg outline-none transition-all ${
                    focusedField === 'lastname' ? 'ring-2 ring-cyan-500' : ''
                  }`}
                  placeholder="Last Name"
                />
                {errors.lastname && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.lastname}
                  </motion.p>
                )}
              </div>
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={`w-full bg-white/5 p-3 rounded-lg outline-none transition-all ${
                focusedField === 'email' ? 'ring-2 ring-cyan-500' : ''
              }`}
              placeholder="Email"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className={`w-full bg-white/5 p-3 rounded-lg outline-none transition-all ${
                  focusedField === 'password' ? 'ring-2 ring-cyan-500' : ''
                }`}
                placeholder="Password"
              />
              {passwordStrength > 0 && (
                <div className="mt-2">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                      className={`h-full ${
                        passwordStrength <= 2
                          ? 'bg-red-500'
                          : passwordStrength <= 4
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    />
                  </div>
                  <p className="text-sm mt-1 text-gray-400">
                    Password strength: {
                      passwordStrength <= 2
                        ? 'Weak'
                        : passwordStrength <= 4
                        ? 'Medium'
                        : 'Strong'
                    }
                  </p>
                </div>
              )}
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
              className={`w-full bg-white/5 p-3 rounded-lg outline-none transition-all ${
                focusedField === 'confirmPassword' ? 'ring-2 ring-cyan-500' : ''
              }`}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white 
              ${Object.keys(errors).length === 0 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' 
                : 'bg-gray-500 cursor-not-allowed'}`}
            disabled={Object.keys(errors).length > 0}
          >
            Register
          </motion.button>
        </form>

        {users && users.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4 gradient-text">Registered Users</h3>
            <div className="space-y-4">
              {users.map((user, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 p-4 rounded-lg"
                >
                  <p className="font-medium">{user.firstname} {user.lastname}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
