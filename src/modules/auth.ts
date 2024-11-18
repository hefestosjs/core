import RedisStore from "connect-redis";
import session from "express-session";
import { APP, getPath, redisClient } from "src";

const { auth, performance } = getPath.config;

export default function Authentication() {
	if (auth.option === "session") {
		useSession();
	}
}

function useSession() {
	if (performance.redis) {
		const redisStore = new RedisStore({
			client: redisClient,
			prefix: auth.strategy.session.prefix,
		});

		return APP.use(session({ ...auth.strategy.session, store: redisStore }));
	}

	return APP.use(session(auth.strategy.session));
}
