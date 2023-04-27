import React from "react";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };

  const thisYear = new Date().getFullYear();

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki -
        {thisYear}
      </em>
    </div>
  );
};

export default Footer;
