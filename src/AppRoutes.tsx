import { RouteObject, useRoutes } from "react-router";
import {
  Counter,
  MachineCodeProblems,
  StopWatch,
  DigitalClock,
  Tabs,
  Accordion,
} from "@/MachineCodeProblems";
import { FC, ReactElement } from "react";
import { NotFoundErrorPage, Home } from "@/components";

const DEFAULT_ROUTES: Array<RouteObject> = [
  {
    path: "*",
    element: <NotFoundErrorPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
];

const MACHINE_CODE_PROBLEM_ROUTES: Array<RouteObject> = [
  {
    path: "/machine-code-problems",
    element: <MachineCodeProblems />,
    children: [
      {
        path: "counter",
        element: <Counter />,
      },
      {
        path: "stop-watch",
        element: <StopWatch />,
      },
      {
        path: "digital-clock",
        element: <DigitalClock />,
      },
      {
        path: "tabs",
        element: <Tabs />,
      },
      {
        path: "accordion",
        element: <Accordion />,
      },
    ],
  },
];

const APP_ROUTES_CONFIG: Array<RouteObject> = [
  ...DEFAULT_ROUTES,
  ...MACHINE_CODE_PROBLEM_ROUTES,
];

export const AppRoutes: FC<{}> = (): ReactElement => {
  return useRoutes(APP_ROUTES_CONFIG) || <NotFoundErrorPage />;
};
