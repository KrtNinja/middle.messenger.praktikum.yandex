import { routes } from './routes';
import LWRouter from '../services/lw-router/LWRouter';

const router = new LWRouter('#root');

router.setUnprotectedPaths(['/sign-in', '/sign-up', '/500']);
routes.forEach(({path, block}) => router.use(path, block));
router.start();

export default router;
