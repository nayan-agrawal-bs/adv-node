import React, { useEffect } from 'react';
import { useAuthContext } from 'shared/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import routes from 'shared/config/routes';
const LogoutPage: React.FC = () => {
  const navigator = useNavigate();
  const { emitLogout } = useAuthContext();

  useEffect(() => {
    emitLogout();

    navigator(routes.login);
  }, [navigator, emitLogout]);

  return (
    <div>
      <h1>Logout Page</h1>
      {/* Add your logout page content here */}
    </div>
  );
};

export default LogoutPage;
