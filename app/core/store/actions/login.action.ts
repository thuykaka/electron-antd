interface LoginState {
  loginLoading: StoreStates['loginLoading']
  user: StoreStates['user']
  loginError: StoreStates['loginError']
}

export const initialState: LoginState = {
  loginLoading: false,
  user: {},
  loginError: null,
}

export function RESET_LOGIN_DATA(): LoginState {
  return initialState
}

export function CHANGE_LOGIN_LOADING(data: StoreDatas['CHANGE_LOGIN_LOADING']): LoginState {
  return {
    user: {},
    loginLoading: true,
    loginError: null,
  }
}

export function LOGIN_SUCCESS(data: StoreDatas['LOGIN_SUCCESS']): LoginState {
  return {
    user: data,
    loginLoading: false,
    loginError: null,
  }
}

export function LOGIN_FAILED(data: StoreDatas['LOGIN_FAILED']): LoginState {
  return {
    user: {},
    loginLoading: false,
    loginError: data,
  }
}

declare global {
  interface StoreStates {
    loginLoading: boolean
    user: unknown | null
    loginError: null
  }

  interface StoreDatas {
    CHANGE_LOGIN_LOADING: StoreStates['loginLoading']
    LOGIN_SUCCESS: StoreStates['user']
    LOGIN_FAILED: StoreStates['loginError']
  }
}
