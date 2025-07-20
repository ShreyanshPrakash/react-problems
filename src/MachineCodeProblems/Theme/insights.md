

# Insights :

1. Context API is simple, u create a comtext, pass initial data and provider wraps the whole tree
2. Better we create our own provider wrapper and our own context hook
3. Create a Provider Component and accept theme as props.
4. Put that in the local state and wrap the children in the context.provider
5. Create a custom ThemeComtext hook that will read from the themeContext
6. Doing this will make it easier to use the context data as we now dont have to pass the createdContext everywhere