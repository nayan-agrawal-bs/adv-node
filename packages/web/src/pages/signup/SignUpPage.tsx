/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.svg';
import { useRegisterUserAction } from 'shared/hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Link,
  Image,
  showToast,
  PageLoader,
} from 'design-web';
import routes from 'shared/config/routes';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import * as Yup from 'yup';

const SignUpPage = () => {
  const navigate = useNavigate();

  const { data, registerUserAction } = useRegisterUserAction();
  const [loading, setLoading] = React.useState(false);
  const [termcondition, setTermsCondition] = useState(false);

  useEffect(() => {
    // Handle response
    if (data) {
      navigate(routes.login);
    }
  }, [data, navigate]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    termcondition: Yup.boolean().isTrue(
      'You must accept the Terms & Conditions.'
    ),
  });

  const handleSignUp = async (values: any) => {
    setLoading(true);
    try {
      if (
        values &&
        values.firstName &&
        values.lastName &&
        values.email &&
        values.password &&
        termcondition
      ) {
        await registerUserAction(values);
        showToast('success', 'Account created successfully.');
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 400) {
          showToast('error', error.response.data.message);
        }
      } else if (error.request) {
        showToast('error', 'No response received.');
      } else {
        showToast('error', 'An error occurred. Please try again later.');
      }
    }
  };

  {
    loading && <PageLoader />;
  }
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
    >
      {({ errors, submitCount }) => (
        <div className="flex items-center justify-center min-h-screen overflow-hidden">
          <div className="relative bg-white rounded-2xl pt-5 mx-auto w-full max-w-md">
            <div className="flex flex-col justify-center px-6 sm:py-2">
              <div className="mx-auto flex w-full flex-col items-center justify-center">
                <a href="#">
                  <Image src={logo} width={110} height={110} alt="logo" />
                </a>
                <div className="w-30px m-5">
                  <h1 className="font-nunito text-lg font-bold tracking-wider text-dark">
                    Create your account
                  </h1>
                </div>
                <FormikForm className="w-full  py-4 px-2">
                  <div className="p-0.5">
                    <label htmlFor="email">First Name </label>
                    <FormikField
                      name="firstName"
                      type="name"
                      id="text"
                      placeholder="Enter First Name"
                      className="form-input border-2 focus:border-primary"
                    />
                    {submitCount ? (
                      errors.firstName ? (
                        <div className="text-danger mt-1">
                          {errors.firstName}
                        </div>
                      ) : (
                        ''
                      )
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="p-0.5">
                    <label htmlFor="email">Last Name </label>
                    <FormikField
                      name="lastName"
                      type="text"
                      id="lastname"
                      placeholder="Enter Last Name"
                      className="form-input border-2 focus:border-primary"
                    />
                    {submitCount ? (
                      errors.lastName ? (
                        <div className="text-danger mt-1">
                          {errors.lastName}
                        </div>
                      ) : (
                        ''
                      )
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="p-0.5">
                    <label htmlFor="email">Email </label>
                    <FormikField
                      name="email"
                      type="email"
                      id="email"
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
                  <div className="flex items-center justify-between m-0">
                    <div className="flex items-center">
                      <Checkbox
                        name="termcondition"
                        label="I have read and accept the "
                        className="ml-2 font-bold text-dark"
                        value={termcondition}
                        onChange={value => setTermsCondition(value)}
                      />
                    </div>
                    <div className="text-primary hover:underline">
                      <Link href={routes.termsConditions}>
                        Terms & Conditions.
                      </Link>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="btn !mt-6 w-full border-0 bg-btnColor-myColor font-bold capitalize text-white flex justify-center items-center"
                    disabled={!termcondition}
                  >
                    Sign UP
                  </Button>
                  <div className="relative my-2 text-center">
                    <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-300"></span>
                    <span className="relative bg-white px-2 text-white-dark dark:bg-dark dark:text-white-light">
                      Already have an account?
                    </span>
                  </div>
                  <div className="text-center text-gray-600">
                    <Link
                      href={routes.login}
                      className="font-base text-primary hover:text-btnColor-dark "
                    >
                      Log into your account
                    </Link>
                  </div>
                </FormikForm>

                <div className="flex items-center justify-evenly space-x-10 p-4 text-sm">
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
      )}
    </Formik>
  );
};

export default SignUpPage;
