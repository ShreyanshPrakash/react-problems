import { RouteObject, useRoutes } from "react-router";
import { Counter, MachineCodeProblems } from "@/MachineCodeProblems";
import { FC, ReactElement } from "react";
import { NotFoundErrorPage, Home } from "@/components";

const APP_ROUTES_CONFIG: Array<RouteObject> = [
  {
    path: "*",
    element: <NotFoundErrorPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/machine-code-problems",
    element: <MachineCodeProblems />,
    children: [
      // {
      //   path: "",
      //   index: true,
      //   element: <MachineCodeProblems />,
      // },
      {
        path: "counter2",
        element: <Counter />,
      },
    ],
  },
];

export const AppRoutes: FC<{}> = (): ReactElement => {
  return useRoutes(APP_ROUTES_CONFIG) || <NotFoundErrorPage />;
};
