type Model = Record<string, any>;
type ExcludeKeys<ModelType> = keyof ModelType;

const exclude = <ModelType extends Model>(
	model: ModelType,
	keys: ExcludeKeys<ModelType>[],
): Omit<ModelType, ExcludeKeys<ModelType>> => {
	return Object.fromEntries(
		Object.entries(model).filter(
			([key]) => !keys.includes(key as ExcludeKeys<ModelType>),
		),
	) as Omit<ModelType, ExcludeKeys<ModelType>>;
};

const excludeFromList = <ModelType extends Model>(
	list: ModelType[],
	keys: ExcludeKeys<ModelType>[],
): Omit<ModelType, ExcludeKeys<ModelType>>[] => {
	return list.map((obj) => exclude(obj, keys));
};

export const useExclude = {
	fromObject: exclude,
	fromList: exclude,
};
