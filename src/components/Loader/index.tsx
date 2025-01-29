import React, { useEffect, useState } from "react";

import LoadingBar from "react-top-loading-bar";

import { useAppContext } from "@context/AppContext";

export default function Loader() {
  const { loadingBarProgress, setLoadingBarProgress } = useAppContext();
  return (
    <LoadingBar
      color="#07F49E"
      progress={loadingBarProgress}
      height={5}
      onLoaderFinished={() => setLoadingBarProgress(0)}
    />
  );
}
