import React from "react";
import { Link, withRouter } from "react-router-dom";

const RelativeLink = ({ to, ...props }) => {
  return <Link to={`${props.match.url}${to}`} {...props} />;
};

export default withRouter(RelativeLink);
