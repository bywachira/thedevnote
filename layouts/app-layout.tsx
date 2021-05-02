import React from "react";
import { Toaster } from "react-hot-toast";
import Nav from "../components/nav";
import { css } from "goober";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <section
    className={css`
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100px 1fr 400px;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    `}
  >
    <Nav />
    <div
      className={`${css`
        margin-top: 56px;
      `} mxw container`}
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
