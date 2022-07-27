class RegisterFormData {
  body: {
    email: string,
    password: string,
    tos_pp: boolean
  }
  errors: Object;
  remember: boolean;
  fetchUser: boolean;
  autoLogin: boolean;
  staySignedIn: boolean;

  public constructor(
    email: string,
    password: string,
    tos_pp = false,
    errors = {},
    remember = false,
    fetchUser = true,
    autoLogin = true,
    staySignedIn = false
  ) {
    this.body = {
      email: email,
      password: password,
      tos_pp: tos_pp
    };
    this.errors = errors;
    this.remember = remember;
    this.fetchUser = fetchUser;
    this.autoLogin = autoLogin;
    this.staySignedIn = staySignedIn;
  }
}

export default RegisterFormData;
