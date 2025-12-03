import React from "react";

// Icons
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

import CustomInput from "../components/forms/CustomInput";// adjust path if needed

const ContactPage = () => {
  return (
    <section id="contact" className="bg-white py-20 px-4 min-h-[90vh]">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-14 text-center">
          Get In Touch <span className="text-indigo-600">📞</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* CONTACT FORM */}
          <div className="lg:w-1/2 bg-gray-50 p-6 sm:p-10 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Send Us a Message
            </h3>

            <form className="space-y-6">
              <CustomInput
                type="text"
                placeholder="Your Full Name"
                icon={FaUser}
                required
              />

              <CustomInput
                type="email"
                placeholder="Your Email Address"
                icon={FaEnvelope}
                required
              />

              <CustomInput
                type="tel"
                placeholder="Your Phone Number"
                icon={FaPhone}
              />

              <div className="relative">
                <textarea
                  placeholder="Your Message / Inquiry"
                  rows="5"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit Inquiry
              </button>
            </form>
          </div>

          {/* CONTACT INFO + SOCIALS */}
          <div className="lg:w-1/2 space-y-8">

            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Our Information
            </h3>

            <div className="space-y-4 text-lg text-gray-700">

              <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100">
                <FaMapMarkerAlt className="text-indigo-600 text-2xl flex-shrink-0 mt-1" />
                <p className="font-medium">
                  TNS Complex, 123 Main Street, Cityville, State 10001, Country
                </p>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100">
                <FaPhone className="text-indigo-600 text-xl flex-shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="hover:text-indigo-800 transition font-medium"
                >
                  +1 (555) 123-4567
                </a>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100">
                <FaEnvelope className="text-indigo-600 text-xl flex-shrink-0" />
                <a
                  href="mailto:info@tnscomplex.com"
                  className="hover:text-indigo-800 transition font-medium"
                >
                  info@tnscomplex.com
                </a>
              </div>

            </div>

            <h3 className="text-2xl font-bold pt-4 text-gray-800">
              Connect With Us
            </h3>

            <div className="flex space-x-6">
              <a
                href="#"
                aria-label="Facebook"
                className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
              >
                <FaFacebook size={32} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
              >
                <FaTwitter size={32} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="text-indigo-600 hover:text-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
              >
                <FaInstagram size={32} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactPage;
