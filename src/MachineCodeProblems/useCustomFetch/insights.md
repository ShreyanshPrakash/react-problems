

# Insights :

1. Its simple only. We are just creating a wraper over the native fetch method
2. Take the nativeFetch from the window object
3. Befpre u call the native fatch, run all the request interceptors
4. Once u have the response, then create a copy of response and run responseInterceptors
5. For fetch, u need to add error handleing also else it wont give rror for 400, 404 503, 500 etc
6. So cehck the status code for the response and based on that if error, then return the Promise.reject(error)

7. U can also add a feature where when the interceptors are being regosterd, the user can send a key so that later on if user wants, it can dynamically remove the interceptors also