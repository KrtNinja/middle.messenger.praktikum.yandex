import { routes } from './routes';
import LWRouter from '../services/lw-router/LWRouter';
import authController from '../core/controllers/auth/Auth.controller';

const router = new LWRouter('#root');

async function checkUser() {
  const user = await authController.getUserInfo();

  if (!user) {
    router.go('/login');
  }
}

router.setUnprotectedPaths(['/login', '/sign-up', '/500']);
router.onProtectRoute(checkUser);
routes.forEach(({ path, block }) => router.use(path, block));
router.start();

export default router;
