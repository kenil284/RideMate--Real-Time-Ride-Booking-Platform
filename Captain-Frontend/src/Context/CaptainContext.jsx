// src/context/CaptainContext.jsx

import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCaptainProfileService } from "../Features/captain-ride/services/captainDashboard.service";

export const captainContext = createContext();

const CaptainContextProvider = ({ children }) => {
  const [captainData, setCaptainData] = useState(null);
  const [captainLogin, setCaptainLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const openalert = (status, msg) => {
    if (status === "Success") {
      toast.success(msg);
    }

    if (status === "Error") {
      toast.error(msg);
    }
  };

  const fetchCaptainProfile = async () => {
    try {
      setLoading(true);

      const captain = await getCaptainProfileService();

      setCaptainData(captain);
      setCaptainLogin(true);
    } catch (error) {
      setCaptainData(null);
      setCaptainLogin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptainProfile();
  }, []);

  return (
    <captainContext.Provider
      value={{
        captainData,
        setCaptainData,
        captainLogin,
        setCaptainLogin,
        loading,
        setLoading,
        openalert,
        fetchCaptainProfile,
      }}
    >
      {children}
    </captainContext.Provider>
  );
};

export default CaptainContextProvider;