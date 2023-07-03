import { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  restrictedLinks: string[];
};

const RestrictedComponent: FunctionComponent<Props> = ({ children, restrictedLinks }) => {
  const location = useLocation();

  if (restrictedLinks.includes(location.pathname)) return null;

  return <>{children}</>;
};

export { RestrictedComponent };
