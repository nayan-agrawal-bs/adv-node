/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import logo from '../../assets/images/logo.svg';
import { useAuthContext } from 'shared/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Link, Image, PageLoader } from 'design-web';
import routes from 'shared/config/routes';
import { showToast } from 'design-web';
import { useLoginAction } from 'shared/hooks/useUserData';
import { Form as FormikForm, Formik, Field as FormikField } from 'formik';
import * as Yup from 'yup';

const LoginPage: React.FC = () => {
  const { authToken: token, loginAction } = useLoginAction();
  const { emitToken, isAuthenticated, authToken } = useAuthContext();
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoading(false);
      emitToken(token, '/');
    }
  }, [token, navigate, emitToken]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    rememberMe: Yup.boolean(),
  });

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      if (values && values.email && values.password) {
        await loginAction(values, values.rememberMe);
        if (values.rememberMe) {
          document.cookie = `email=${values.email}; max-age=604800; path=/; SameSite=Strict`;
          document.cookie = `rememberToken=${authToken}; max-age=604800; path=/; SameSite=Strict`;
          document.cookie = `rememberMe=true; max-age=604800; path=/; SameSite=Strict`;
        } else {
          document.cookie =
            'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie =
            'password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie =
            'rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 400) {
          showToast('error', 'Invalid email or password');
        }
      } else if (error.request) {
        showToast('error', 'No response received.');
      } else {
        showToast('error', 'An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home);
    }
  }, [isAuthenticated, navigate]);

  const getCookie = (name: string) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : '';
  };

  {
    loading && <PageLoader />;
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ errors, submitCount, setFieldValue, values }) => {
        useEffect(() => {
          const storedEmail = getCookie('email');
          const storedRememberMe = getCookie('rememberMe') === 'true';

          if (storedEmail && storedRememberMe) {
            setFieldValue('email', decodeURIComponent(storedEmail));
            setFieldValue('rememberMe', storedRememberMe);
          }
        }, [setFieldValue]);
        return (
          <div className="flex items-center justify-center h-screen  overflow-hidden bg-gray-100">
            <div className="relative bg-white rounded-2xl pt-5 mx-auto w-full max-w-md">
              <div className="flex flex-col justify-center px-6 sm:py-2">
                <div className="mx-auto w-full flex flex-col items-center justify-center">
                  <a href="#">
                    <Image src={logo} width={110} height={110} alt="logo" />
                  </a>
                  <div className="mt-5 text-center">
                    <h1 className="font-lato text-lg font-bold text-black">
                      Log in to your account
                    </h1>
                  </div>
                  <FormikForm className="w-full  py-4 px-2">
                    <div className="p-0.5">
                      <label htmlFor="email">Email </label>
                      <FormikField
                        name="email"
                        type="email"
                        id="email"
                        value={values.email}
                        placeholder="Enter Email"
                        className="form-input border-2 focus:border-primary"
                      />
                      {submitCount ? (
                        errors.email ? (
                          <div className="text-danger mt-1">{errors.email}</div>
                        ) : (
                          ''
                        )
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="p-0.5">
                      <label htmlFor="password">Password </label>
                      <FormikField
                        name="password"
                        type="password"
                        id="password"
                        value={values.password}
                        placeholder="Enter Password"
                        className="form-input border-2 focus:border-primary"
                      />
                      {submitCount ? (
                        errors.password ? (
                          <div className="text-danger mt-1">
                            {errors.password}
                          </div>
                        ) : (
                          ''
                        )
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <Checkbox
                          label="Remember me"
                          name="rememberMe"
                          value={values.rememberMe}
                          className="ml-2 font-bold text-dark"
                          onChange={() =>
                            setFieldValue('rememberMe', !values.rememberMe)
                          }
                        />
                      </div>
                      <div className="text-primary hover:underline">
                        <Link href={routes.forgotpassword}>
                          Forget your Password?
                        </Link>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="btn mt-6 w-full bg-primary text-white"
                    >
                      Sign In
                    </Button>
                    <div className="relative my-7 text-center">
                      <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-300"></span>
                      <span className="relative bg-white px-2 font-semibold uppercase text-gray-600">
                        or
                      </span>
                    </div>
                    <div className="text-center text-gray-600">
                      Don&apos;t have a account? &nbsp;
                      <Link
                        href={routes.singup}
                        className="text-primary underline"
                      >
                        Create One
                      </Link>
                    </div>
                  </FormikForm>
                  <div className="flex items-center justify-evenly space-x-10 p-6 text-sm text-gray-600">
                    <span className="text-screen/1.5h text-gray">
                      <Link href={routes.help}>Help</Link>
                    </span>
                    <span className="text-screen/1.5h text-gray">
                      <Link href={routes.termsConditions}>Privacy Policy</Link>
                    </span>
                    <span className="text-screen/1.5h text-gray">
                      <Link href={routes.refundTerm}>Terms</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginPage;
