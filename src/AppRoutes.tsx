import { Route, Routes } from "react-router";
import { Counter, Home } from "@/components";
import { FC, ReactElement } from "react";

interface IRoutePrams {
  routePath: string;
  Component: React.ElementType;
}

const APP_ROUTES_CONFIG: Array<IRoutePrams> = [
  {
    routePath: "/",
    Component: Home,
  },
  {
    routePath: "/Counter",
    Component: Counter,
  },
];

export const AppRoutes: FC = (): ReactElement => {
  return (
    <Routes>
      {APP_ROUTES_CONFIG.map((route: IRoutePrams) => {
        const { routePath, Component } = route;

        return (
          <Route key={routePath} path={routePath} element={<Component />} />
        );
      })}
    </Routes>
  );
};
