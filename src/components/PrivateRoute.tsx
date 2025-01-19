import { Navigate, PathRouteProps, useLocation } from 'react-router-dom';
import { RouteGuard } from '../constants/routes';
import { useSelector } from 'react-redux';
import { selectAuthRole } from '../redux/selectors/AuthSelector';
interface PrivateRouteProps extends PathRouteProps {
  element: React.ReactNode;
  guards: RouteGuard[];
  allowedRoles?: string[]; // Optionally add allowed roles
}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ element, guards, allowedRoles }) => {
  const location = useLocation();
  const authRole = useSelector(selectAuthRole); // Assuming role is part of the auth slice

  /*
   * Decide what to render into the route
   */
  const getRenderer = (guards: RouteGuard[], element: React.ReactNode) => {
    // Check each guard to ensure access is allowed
    for (const guard of guards) {
      if (!guard.requestDone) {
        // if guard request isn't done, render nothing and wait for requestDone to change
        return null;
      }
      if (guard.failCondition) {
        // if guard request is done, then check if failCondition matches
        if (guard.onFail) {
          return <Navigate to={guard.onFail} state={{ from: location }} />;
        }
        return null;
      }
    }
    // Check role-based access
    if (allowedRoles && !allowedRoles.includes(authRole!)) {
      return <Navigate to="/unauthorized" state={{ from: location }} />;
    }
    // If all guards pass, render the element
    return element;
  };

  return getRenderer(guards, element);
};

export default PrivateRoute;
