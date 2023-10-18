import { useNavigate } from "react-router-dom";
import { PATHS } from "../router/config/paths";
import config from "../config";

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
  const _navivate = (path: string, params: any = {}) => {
    navigate(getAbsolutePath(path, params));
  };

  return Object.assign(_navivate, {
    collectionNavigate: (id: any, slug: any) => {
      _navivate(PATHS.COLLECTION, { collectionId: config.isCollectionPathSlug() ? slug ?? id : id });
    },
  });
};

export default UseNavigate;
