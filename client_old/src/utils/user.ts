import jwt_decode from "jwt-decode";

export const getUserUuid = (token:string):string => {
  return jwt_decode<any>(token).uuid;
}