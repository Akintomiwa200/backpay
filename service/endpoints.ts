export default Object.freeze({
  GET_USERS: '/users',
  SWAGGER_DOCS: '/swagger',
  REGISTER: '/register',
  REGISTERATION: '/registration',
  SETQUESTION: '/registration/set-question',
  GET_ORDER_DETAILS: (id: string) => `/pay/${id}`,
  PAY: '/pay',
  CANCEL_TRANSACTION: '/cancel-transaction',
  AUTH: '/auth',
  WALLET: '/wallet',
  TRANSACTIONS: '/transactions',
});