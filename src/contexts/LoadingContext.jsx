import React, { createContext, useCallback, useState } from "react";
import LoadingWrapper from "../components/LoadingWrapper.jsx";

const initialState = {
  loading: false,
  showLoading: () => null,
  hideLoading: () => null,
};

const LoadingContext = createContext(initialState);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = useCallback(() => {
    setLoading(() => true);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(() => false);
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      <LoadingWrapper loading={loading} />
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
