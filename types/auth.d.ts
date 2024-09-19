// auth.d.ts
export interface AuthToken {
    token: string;
  }
  
  export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface UserResponse {
    user: {
      email: string;
      token: string;
    };
  }
  