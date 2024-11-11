export interface PerformanceInterface {
	redis: boolean;
	cache: {
		active: boolean;
		lifeTime: number;
	};
}
