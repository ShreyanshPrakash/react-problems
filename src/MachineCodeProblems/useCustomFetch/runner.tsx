import {
  IRequestInterceptorReturn,
  TResponseInterceptorReturn,
} from "MachineCodeProblems/useCustomFetch/types";
import { useAdvancedfetch } from "./useCustomFetch";
import { useFetch } from "./useFetch";

const url: RequestInfo | URL = new URL(
  "https://jsonplaceholder.typicode.com/todos/1"
);

export const CustomFetch = () => {
  const {
    customFetch,
    registerRequestInterceptors,
    registerResponseInterceptors,
  } = useAdvancedfetch();

  const requestInterceptor = (
    url: RequestInfo | URL,
    options: RequestInit | undefined
  ): IRequestInterceptorReturn | undefined => {
    // console.log(url, options);
    return { url: "", options };
  };

  const responseInterceptor = (
    response: Response
  ): TResponseInterceptorReturn => {
    response
      .text()
      .then((res) => console.log(res))
      .catch((error) => console.log("JSON Error : ", error));

    return response;
  };

  registerRequestInterceptors([requestInterceptor, requestInterceptor]);
  registerResponseInterceptors([responseInterceptor]);

  customFetch({
    url,
  })
    .then((res) => console.log("Succes : ", res))
    .catch((error) => console.log("Errored : ", error));

  return <div className="wrapper">Custom Fetch</div>;
};
