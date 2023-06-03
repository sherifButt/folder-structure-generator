


const { signIn, signUp } = require('next-auth');

const router = express.Router();

router.post('/api/auth/signin', signIn());
router.post('/api/auth/signup', signUp());

module.exports = router;

