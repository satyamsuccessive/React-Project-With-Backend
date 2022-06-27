import React from "react";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter(Boolean);
  console.log("pathlength" +pathnames.length)
  

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
   
    {pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      console.log(routeTo)
      const isLast = index === pathnames.length - 1;
      return isLast ? (
        <Typography key={name}>{name}</Typography>
      ) : (
        <Link key={name} onClick={() => navigate(routeTo)}>
          {name}
        </Link>
      );
    })}
  </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;