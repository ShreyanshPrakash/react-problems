
export interface IInitialContext{
    showTitle: boolean;
}

export interface IFeatureProps{
    flag: keyof IInitialContext;
}

export interface IMyFeatureContextProviderProps{
    value?: IInitialContext;
}