import React, { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import { Button, Link, Image, showToast, PageLoader } from 'design-web';
import routes from 'shared/config/routes';
import { Form as FormikForm, Formik, Field as FormikField } from 'formik';
import * as Yup from 'yup';

const VerifyOTP: React.FC = () => {
  const [countdown, _setCountdown] = useState(0);
  const [resent, _setResent] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      console.log(values);
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 400) {
          showToast('error', 'Invalid OTP');
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

  // const handleResend = async (e: any) => {
  //   e.preventDefault();
  // };

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
      .required('OTP is required'),
    rememberMe: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={{
        otp: '',
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
                    Enter OTP for Verify Account
                  </h1>
                </div>

                <FormikForm className="w-full sm:w-90vw min-w-[25vw] space-y-3 py-4 px-8 dark:text-white">
                  <div className="mb-7">
                    {resent ? (
                      <span>
                        We have resended a verification on (Users mail here),
                        Please verify the code{' '}
                      </span>
                    ) : (
                      <span>
                        We have sent a verification on (Users mail here), please
                        verify the code{' '}
                      </span>
                    )}
                  </div>
                  <div className="p-0.5">
                    <label htmlFor="otp ">OTP*</label>
                    <FormikField
                      name="otp"
                      type="text"
                      id="otp"
                      placeholder="Enter OTP"
                      className="form-input border-2 focus:border-primary"
                    />
                    {submitCount ? (
                      errors.otp ? (
                        <div className="text-danger mt-1">{errors.otp}</div>
                      ) : (
                        ''
                      )
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="mt-2">
                    <span>Didn’t receive any code? </span>
                    {countdown > 0 ? (
                      <span>Resend code in {countdown}s</span>
                    ) : (
                      <Button
                        type="button"
                        // onClick={() => handleResend}
                        className="text-primary underline"
                      >
                        Resend now
                      </Button>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="btn !mt-6 w-full border-0 bg-primary uppercase text-white hover:bg-btnColor-myColor"
                    onClick={() => {}}
                  >
                    Verify OTP
                  </Button>
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

export default VerifyOTP;
