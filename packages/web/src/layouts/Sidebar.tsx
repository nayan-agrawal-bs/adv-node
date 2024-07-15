// Import necessary modules and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import 'react-perfect-scrollbar/dist/css/styles.css';
import moreImage from '../assets/images/more.svg';
import logo from '../assets/images/logo.svg';

import { Link, NavLinks, Image } from 'design-web';
import routes from 'shared/config/routes';
import { useUserContext } from 'shared/hooks/useUserContext';

// import "packages/web/src/assets/css/sidebar.css"

// Define navigation items
const navItems = [{ name: 'Home', route: routes.home, icon: 'Home' }];

const BottomNavItems = [
  { name: 'Help', route: routes.help, icon: 'Help' },
  { name: 'Setting', route: routes.setting, icon: 'Setting' },
  { name: 'Logout', route: routes.logout, icon: 'Logout' },
];

// Define Sidebar component
const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const [showOptions, setshowOptions] = useState(false);
  const [_activeItem, setActiveItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUserContext();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    navigate(routes.logout);
  };

  const _handleOnClick = (item: any) => {
    if (item.name == 'Logout') {
      handleLogout();
    }
    handleNavItemClick(item);
  };

  const handleNavItemClick = (item: any) => {
    setActiveItem(item.itemName);
    if (!item.isExternal) {
      setActiveItem(item.href);
      setIsSidebarOpen(false); // Close the sidebar on navigation
    } else {
      window.open(item.href, '_blank');
    }
  };

  return (
    <div className={`flex-col hidden lg:flex`}>
      <div className={`sidebar`}>
        <div className="h-full bg-white dark:bg-black">
          <div className=" lg:flex items-left justify-left py-5">
            <Link
              href="/"
              className="main-logo flex items-center justify-center"
            >
              <Image
                className="ml-[5px] w-[15%]"
                src={logo}
                alt="logo"
                height={24}
                width={24}
              />
            </Link>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <div className="flex h-full flex-col justify-between">
              <NavLinks key={'Main'} routes={navItems} iconSize={10} />
              <div
                className="flex w-full cursor-pointer items-center justify-between border-t-2 px-1 py-3 my-2"
                onClick={() => setshowOptions(!showOptions)}
              >
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={user?.profileImg}
                    width={40}
                    height={40}
                    alt="userprofile_logo"
                    className="rounded-full h-[40px] object-cover"
                  />
                  <span className="text-base font-semibold hidden lg:inline text-gray">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>

                <Image src={moreImage} width={3} height={3} alt="more"></Image>
                {showOptions && (
                  <div
                    className={`absolute bottom-20 ${
                      isSidebarOpen ? 'w-[80%]' : 'w-[95%]'
                    } rounded-lg border bg-white  py-4 px-5`}
                    style={{
                      filter: 'drop-shadow(0 0px 25px rgba(0, 0, 0, 0.15))',
                    }}
                  >
                    <NavLinks
                      key={'Bottom'}
                      routes={BottomNavItems}
                      iconSize={16}
                    />
                  </div>
                )}
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="overlay open" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Sidebar;
