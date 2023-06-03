


const NextAuth = require('next-auth');
const NextAuthConfig = require('../config/next-auth.config');

const authRoutes = express.Router();

authRoutes.use(
  NextAuthConfig.options.routes.signIn,
  NextAuthConfig.functions.signIn,
);

authRoutes.use(
  NextAuthConfig.options.routes.signOut,
  NextAuthConfig.functions.signOut,
);

authRoutes.use(
  NextAuthConfig.options.routes.callback,
  NextAuthConfig.functions.callback,
);

authRoutes.use(
  NextAuthConfig.options.routes.verifyRequest,
  NextAuthConfig.functions.verifyRequest,
);

authRoutes.use('/api/auth', NextAuthConfig.functions.expressApp);

module.exports = authRoutes;

