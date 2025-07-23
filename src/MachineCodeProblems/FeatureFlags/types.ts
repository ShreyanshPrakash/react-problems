
export interface IInitialContext{
    showTitle: boolean;
}

export interface IFeatureProps{
    field: keyof IInitialContext;
}

export interface IMyFeatureContextProviderProps{
    value?: IInitialContext;
}