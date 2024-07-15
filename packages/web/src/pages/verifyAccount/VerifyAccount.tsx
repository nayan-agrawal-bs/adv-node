import React from 'react';
import logo from '../../assets/images/logo.svg';
import { Button, Link, Image, showToast, PageLoader } from 'design-web';
import routes from 'shared/config/routes';
import { Form as FormikForm, Formik, Field as FormikField } from 'formik';
import * as Yup from 'yup';

const VerifyAccount: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      console.log(values);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          showToast('error', 'Invalid email');
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
  {
    loading && <PageLoader />;
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    rememberMe: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        rememberMe: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, submitCount }) => (
        <div className="flex items-center justify-center h-screen  overflow-hidden bg-gray-100">
          <div className="relative bg-white rounded-2xl pt-5 mx-auto w-full max-w-md">
            <div className="flex flex-col justify-center px-6 sm:py-2">
              <div className="mx-auto w-full flex flex-col items-center justify-center">
                <a href="#">
                  <Image src={logo} width={110} height={110} alt="logo" />
                </a>
                <div className="mt-5 text-center">
                  <h1 className="font-lato text-lg font-bold text-black">
                    Verify Your Account
                  </h1>
                  <p className="mt-5 font-poppins     text-center !leading-snug text-dark">
                    Enter your email and verify your account
                  </p>
                </div>

                <FormikForm className="w-full  space-y-3 py-4 px-2">
                  <div className="p-0.5">
                    <label htmlFor="email">Email* </label>
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
                  <Button
                    type="submit"
                    className="btn mt-6 w-full bg-primary text-white "
                    onClick={() => {}}
                  >
                    Verify
                  </Button>
                  <div className="relative my-7 text-center md:mb-9"></div>

                  <div className="relative my-7 text-center">
                    <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-300"></span>
                    <span className="relative bg-white px-2 font-semibold uppercase text-gray-600">
                      or
                    </span>
                  </div>
                  <div className="text-center text-gray-600">
                    Don&apos;t have a account?{' '}
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
      )}
    </Formik>
  );
};

export default VerifyAccount;
