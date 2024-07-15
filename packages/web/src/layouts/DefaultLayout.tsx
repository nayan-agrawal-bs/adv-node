import React, { Suspense, useEffect, useState } from 'react';
import BaseLayout from './BaseLayout';
import { useTheme } from 'shared/hooks/useTheme';
// import Footer from './Footer';
import { useAuthContext } from 'shared/hooks/useAuthContext';
import Sidebar from './Sidebar';

import { Button, Icon, PageLoader } from 'design-web';
import MobileNav from './MobileNav';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();
  const { isLoading } = useAuthContext();
  const [showTopButton, setShowTopButton] = useState(false);

  const onScrollHandler = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);

    return () => {
      window.removeEventListener('onscroll', onScrollHandler);
    };
  });

  return (
    <BaseLayout>
      {/* BEGIN MAIN CONTAINER */}
      <div className="relative">
        {/* screen loader */}
        {isLoading && (
          <div className="screen_loader fixed inset-0 bg-[#fafafa] dark:bg-[#060818] z-[60] grid place-content-center animate__animated">
            <PageLoader />
          </div>
        )}
        <div className="fixed bottom-6 ltr:right-6 rtl:left-6 right-0 z-50">
          {showTopButton && (
            <Button
              type="button"
              className="btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary"
              onClick={goToTop}
            >
              <Icon name="ArrowUp" height={24} width={24} className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* BEGIN APP SETTING LAUNCHER */}
        {/* <Setting /> */}
        {/* END APP SETTING LAUNCHER */}

        <div
          className={`${theme.navbar} flex justify-between main-container text-black dark:text-white-dark min-h-screen`}
        >
          {/* BEGIN SIDEBAR */}
          <div className="fixed md:w-[18%]">
            <Sidebar />
          </div>
          {/* END SIDEBAR */}

          <div className="main-content flex flex-col min-h-screen w-full lg:w-[82%] absolute right-0 top-0">
            {/* BEGIN TOP NAVBAR */}

            {/* <Header /> */}
            {/* END TOP NAVBAR */}
            <div className="block lg:hidden">
              <MobileNav />
            </div>
            {/* BEGIN CONTENT AREA */}
            <Suspense>
              <div className={`${theme.animation} p-1 animate__animated`}>
                {children}
              </div>
            </Suspense>
            {/* END CONTENT AREA */}
          </div>
        </div>
        {/* BEGIN FOOTER */}
        {/* <Footer /> */}
        {/* END FOOTER */}
      </div>
    </BaseLayout>
  );
};

export default DefaultLayout;
