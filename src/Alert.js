import React, { useEffect } from "react";

const Alert = ({ message, type, removeAlert, list }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      removeAlert(); //settng to default value where show = false.
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  }, [list]);

  return <p className={`alert ${type}`}>{message}</p>;
};

export default Alert;
