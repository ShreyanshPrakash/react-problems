import { RouteObject, useRoutes } from "react-router";
import {
  Counter,
  MachineCodeProblems,
  StopWatch,
  DigitalClock,
  Tabs,
  Accordion,
  NestedCheckboxes,
  ModalPage,
  Pagination,
  OTPLogin,
  SwitchCaseRunner,
  ProgressBarRunner,
  ThrottledProgressBar,
  TrafficLights,
  SimpleTrafficLights,
  PasswordGenerator,
  CountdownTimer,
  DebounceRunner,
  ThrottleRunner,
  SnackbarRunner,
  ImageCorousel,
  LayoutTry,
  ImageCorouselAnimation,
  NestedComments,
  ParentComponent,
  BasicCanvas,
  TicTacToe,
  CustomFetch,
  CustomTimeout,
  DragDrop,
  InfiniteScroll,
  VirtualizedList,
  StarRating,
  TicTacToeAdvanced,
  CssGrids,
  CssPositions,
  GoogleCalendar,
  ReactTheme,
  RevSwitchCase,
  FileExplorerRunner,
} from "@/MachineCodeProblems";
import {
  Revision,
  TabRevision,
  AccordionRevision,
  NestedCheckboxTry,
  ImageSlider,
  ProgressBar2,
} from "@/Revision";
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
      {
        path: "nested-checkboxes",
        element: <NestedCheckboxes />,
      },
      {
        path: "modal",
        element: <ModalPage />,
      },
      {
        path: "pagination",
        element: <Pagination />,
      },
      {
        path: "otp-login",
        element: <OTPLogin />,
      },
      {
        path: "switch-case",
        element: <SwitchCaseRunner />,
      },
      {
        path: "progress-bar",
        element: <ProgressBarRunner />,
      },
      {
        path: "throttled-progress-bar",
        element: <ThrottledProgressBar />,
      },
      {
        path: "traffic-lights",
        element: <TrafficLights />,
      },
      {
        path: "simple-traffic-lights",
        element: <SimpleTrafficLights />,
      },
      {
        path: "password-generator",
        element: <PasswordGenerator />,
      },
      {
        path: "countdown-timer",
        element: <CountdownTimer />,
      },
      {
        path: "debounce",
        element: <DebounceRunner />,
      },
      {
        path: "throttle",
        element: <ThrottleRunner />,
      },
      {
        path: "snackbar",
        element: <SnackbarRunner />,
      },
      {
        path: "image-corousel",
        element: <ImageCorousel />,
      },
      {
        path: "layouttry",
        element: <LayoutTry />,
      },
      {
        path: "image-corousel-animation",
        element: <ImageCorouselAnimation />,
      },
      {
        path: "nested-comments",
        element: <NestedComments />,
      },
      {
        path: "event-emitter",
        element: <ParentComponent />,
      },
      {
        path: "basic-canvas",
        element: <BasicCanvas />,
      },
      {
        path: "tic-tac-toe",
        element: <TicTacToe />,
      },
      {
        path: "custom-fetch",
        element: <CustomFetch />,
      },
      {
        path: "custom-timeout",
        element: <CustomTimeout />,
      },
      {
        path: "drag-drop",
        element: <DragDrop />,
      },
      {
        path: "infinite-scroll",
        element: <InfiniteScroll />,
      },
      {
        path: "virtualized-list",
        element: <VirtualizedList />,
      },
      {
        path: "star-rating",
        element: <StarRating />,
      },
      {
        path: "tic-tac-toe-advanced",
        element: <TicTacToeAdvanced />,
      },
      {
        path: "css-grids",
        element: <CssGrids />,
      },
      {
        path: "css-positions",
        element: <CssPositions />,
      },
      {
        path: "google-calendar",
        element: <GoogleCalendar />,
      },
      {
        path: "react-theme",
        element: <ReactTheme />,
      },
      {
        path: "file-explorer",
        element: <FileExplorerRunner />,
      },
    ],
  },
  {
    path: "/revision",
    element: <Revision />,
    children: [
      {
        path: "tab",
        element: <TabRevision />,
      },
      {
        path: "accordion",
        element: <AccordionRevision />,
      },
      {
        path: "checkboxes",
        element: <NestedCheckboxTry />,
      },
      {
        path: "image-slider",
        element: <ImageSlider />,
      },
      {
        path: "progress-bar",
        element: <ProgressBar2 />,
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
