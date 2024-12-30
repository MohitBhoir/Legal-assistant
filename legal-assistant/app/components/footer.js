import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 bg-black bg-opacity-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hidden md:block">
          <h3 className="text-lg font-bold">About Us</h3>
          <p className="mt-2 text-sm">
            We provide the best solutions to help you achieve your goals. Our
            team is dedicated to ensuring your success.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p className="mt-2 text-sm">Email: support@example.com</p>
          <p className="text-sm">Phone: +1 234 567 890</p>
          <p className="text-sm">Address: 123 Main Street, Anytown, USA</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Follow Us</h3>
          <p className="mt-2 text-sm">
            <a href="#" className="hover:underline">
              Facebook
            </a>
          </p>
          <p className="text-sm">
            <a href="#" className="hover:underline">
              Twitter
            </a>
          </p>
          <p className="text-sm">
            <a href="#" className="hover:underline">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
      <div className="text-center mt-6 text-sm">
        © 2024 Your Company. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
