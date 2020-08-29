export interface ISignTokenInput {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  nonprofitId: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ISignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nonprofitId: string;
}

export interface ICheckTokenInput {
  token: string;
}

export interface ITokenPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  nonprofitId: string;
}
