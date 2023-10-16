import React from "react";
import { Toaster } from "react-hot-toast";
import Nav from "../components/nav";
import { css } from "goober";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <section
    className={css`
      display: flex;
      flex-direction: column;
      gap: 16px 0px;
    `}
  >
    <Nav />
    <div
      // className={`${css`
      //   margin-top: 56px;
      // `}`}
    >
      <div className="">{children}</div>
    </div>
  </section>
);

export const getLayout = (page: React.ReactNode) => (
  <AppLayout>
    <Toaster position="top-center" />
    {page}
  </AppLayout>
);

export default AppLayout;
