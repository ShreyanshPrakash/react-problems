


export interface IuseCustomFetchProps{
    url: RequestInfo | URL;
    options?: RequestInit | undefined;
    requestInterceptors?: TInterceptorList;
    responseInterceptors?: TInterceptorList;
}

export interface ICustomFetchParams{
    url: RequestInfo | URL;
    options?: RequestInit | undefined;
    requestInterceptors?: TInterceptorList;
    responseInterceptors?: TInterceptorList;
}

export interface IInterceptorObject {
    requestInterceptors?: TInterceptorList;
    responseInterceptors?: TInterceptorList;
}


export interface IRequestInterceptorReturn{
    url: RequestInfo | URL;
    options?: RequestInit | undefined;
}

export type TResponseInterceptorReturn = Response | undefined;
export type TInterceptor = Function
export type TInterceptorList = Array<TInterceptor>;