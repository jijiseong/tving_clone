import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider } from "react-router-dom";
import router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { darktheme } from "./theme";
import { RecoilRoot } from "recoil";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <ThemeProvider theme={darktheme}>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
        <Outlet />
      </QueryClientProvider>
    </ThemeProvider>
  </RecoilRoot>
);
