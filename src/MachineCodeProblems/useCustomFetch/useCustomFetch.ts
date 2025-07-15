import {
  ICustomFetchParams,
  IRequestInterceptorReturn,
  TInterceptorList,
  TResponseInterceptorReturn,
} from "MachineCodeProblems/useCustomFetch/types";
import { useRef } from "react";

export const useAdvancedfetch = () => {
  const { fetch: nativeFetch } = window;

  const registeredRequestInterceptors = useRef<TInterceptorList>([]);
  const registeredResponseInterceptors = useRef<TInterceptorList>([]);

  const registerRequestInterceptors = (
    interceptorsList: Array<Function>
  ): void => {
    registeredRequestInterceptors.current.push(...interceptorsList);
  };

  const registerResponseInterceptors = (
    interceptorsList: Array<Function>
  ): void => {
    registeredResponseInterceptors.current.push(...interceptorsList);
  };

  const customFetch = async ({
    url,
    options,
    requestInterceptors = [],
    responseInterceptors = [],
  }: ICustomFetchParams): Promise<Response> => {
    /*
        Request Interceptor Block
    */
    let updatedUrl = url;
    let updatedOptions = options;
    [...requestInterceptors, ...registeredRequestInterceptors.current]?.forEach(
      (interceptor) => {
        const result: IRequestInterceptorReturn = interceptor(url, options);
        if (result) {
          updatedUrl = result.url;
          updatedOptions = result.options;
        }
      }
    );
    /*
     */

    /*
        Fetch API Block
    */
    const response = await nativeFetch(updatedUrl, updatedOptions);
    if (hasApiErrored(response)) {
      return Promise.reject(response);
    }

    /*
     */

    /*
        Response Interceptor Block
    */
    [
      ...responseInterceptors,
      ...registeredResponseInterceptors.current,
    ]?.forEach((interceptor) => interceptor(response.clone()));

    let responseCloned = response.clone();
    responseInterceptors?.forEach((interceptor) => {
      const newResponse: TResponseInterceptorReturn =
        interceptor(responseCloned);
      responseCloned = newResponse || responseCloned;
    });
    /*
     */

    // return response;
    return responseCloned;
  };

  /*
    Utility Methods
  */

  const hasApiErrored = (response: Response) => {
    const ERROR_CODES = [404, 401, 400, 402, 500, 503];
    if (ERROR_CODES.includes(response.status)) {
      return true;
    }
    return false;
  };

  return {
    customFetch,
    registerRequestInterceptors,
    registerResponseInterceptors,
  };
};
