// import { IInterceptorObject } from "MachineCodeProblems/useCustomFetch/types";

// export const useFetch = () => {
//   const { fetch: nativeFetch } = window;

//   const customFetch = async (
//     url: RequestInfo | URL,
//     options?: RequestInit,
//     interceptors?: IInterceptorObject
//   ) => {


//     interceptors?.requestInterceptors?.forEach(
//         interceptor => interceptor(url, options)
//     )

//     const response = await nativeFetch(url, options);


//     interceptors?.responseInterceptors?.forEach(
//         interceptor => interceptor(response)
//     )

//     return response;
//   };

//   return customFetch;
// };




import {
  ICustomFetchParams,
  IRequestInterceptorReturn,
  TResponseInterceptorReturn,
} from "MachineCodeProblems/useCustomFetch/types";

export const customFetch = () => {
  const { fetch: nativeFetch } = window;

  const customFetch = async ({
    url,
    options,
    requestInterceptors,
    responseInterceptors,
  }: ICustomFetchParams): Promise<Response> => {
    let updatedUrl = url;
    let updatedOptions = options;
    requestInterceptors?.forEach((interceptor) => {
      const result: IRequestInterceptorReturn = interceptor(url, options);
      if (result) {
        updatedUrl = result.url;
        updatedOptions = result.options;
      }
    });

    const response = await nativeFetch(updatedUrl, updatedOptions);

    responseInterceptors?.forEach((interceptor) =>
      interceptor(response.clone())
    );

    let responseCloned = response.clone();
    responseInterceptors?.forEach((interceptor) => {
      const newResponse: TResponseInterceptorReturn =
        interceptor(responseCloned);
      responseCloned = newResponse || responseCloned;
    });

    // return response;
    return responseCloned;
  };

  return customFetch;
};
