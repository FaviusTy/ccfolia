import { connect } from "react-redux";

const MinRoute = ({}) => {};

const reducer = (state, { type, key, params }) => {
  switch (type) {
    case "VIEW_TO": {
      return {
        key,
        params
      };
    }
    default: {
      return state;
    }
  }
};
