import { useFormik } from 'formik';
import { TLoginForm } from '../constants/types';
import { loginSchema } from '../validators/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../redux/actions/AuthActions';
import { selectLoading } from '../redux/selectors/CommonSelector';
import { ClipLoader } from 'react-spinners';
import logo from '../assets/logo/Logo.png';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const initialValues: TLoginForm = {
  identifier: '',
  password: '',
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(authActions.login(values));
    },
  });

  return (
    <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="NOID" src={logo} className="mx-auto h-32 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              Email or Username
            </label>
            <input
              id="identifier"
              name="identifier"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.identifier}
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.touched.identifier && formik.errors.identifier ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Enter your email or username"
            />
            {formik.touched.identifier && formik.errors.identifier && <p className="text-red-500 text-sm mt-1">{formik.errors.identifier}</p>}
          </div>
          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`mt-2 block w-full px-3 py-2 border ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Enter your password"
            />
            <button type="button" className="absolute right-3 bottom-2.5 text-gray-500 hover:text-gray-700" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
            </button>
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>}
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md bg-default-orange px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-orange ${
                loading ? 'btn-loading' : ''
              }`}
            >
              {loading ? <ClipLoader color="white" loading={loading} size={24} /> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
