import { useNavigate } from "react-router-dom";

export const getAbsolutePath = (path: string, params: any = {}) => {
  let tmpPath = path;
  if (!tmpPath) {
    return tmpPath;
  }

  for (const [param, value] of Object.entries(params)) {
    tmpPath = tmpPath.replace(`:${param}`, String(value));
  }

  return tmpPath;
};
const UseNavigate = () => {
  const navigate = useNavigate();

  return (path: string, params: any = {}) => {
    navigate(getAbsolutePath(path, params));
  };
};

export default UseNavigate;
