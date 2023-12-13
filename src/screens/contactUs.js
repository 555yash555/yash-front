// ContactUs.js
import React from "react";
import "./contactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us-wrapper">
      <h1 className="h1heading">Write To Us</h1>
      <div className="contact-us-container">
        <div className="company-info">
          <h2>Company Name</h2>
          <p><span className="title">Email:</span> company@example.com</p>
          <p><span className="title">Phone:</span> +1 123-456-7890</p>
          <p><span className="title">Address:</span> 123 Main Street, Cityville, Country</p>
          <p><span className="title">About:</span>A company profile introduces a business's mission, goals, vision, and history. In most cases, a profile includes an 'About Us' section that narrates how the company was founded, its why’s, and a section that introduces leadership team members.</p>
        </div>
        <div className="placement-center">
          <h3>Placement Center</h3>
          <p><span className="title">Email:</span> placement@example.com</p>
          <p><span className="title">Phone:</span> +1 987-654-3210</p>
          <p><span className="title">Address:</span> 456 Center Street, Townsville, Country</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
