import { Profile } from '../../types/model/Profile';

export const IncompleteProfile: Profile = {
  uuid: '4ed12c55-01c5-4474-aaf2-0a69c1fc9dc9',
  email: '',
  username: 'El Verificator',
  gems: 0,
  status: 'INCOMPLETE',
};

export const UnverifiedProfile: Profile = {
  uuid: '4ed12c55-01c5-4474-aaf2-0a69c1fc9dc9',
  email: 'elverificator@poudlardrp.fr',
  username: 'El Verificator',
  gems: 0,
  status: 'UNVERIFIED',
};

export const VerifiedProfile: Profile = {
  uuid: '4ed12c55-01c5-4474-aaf2-0a69c1fc9dc9',
  email: 'elverificator@poudlardrp.fr',
  username: 'El Verificator',
  gems: 0,
  status: 'VERIFIED',
};
