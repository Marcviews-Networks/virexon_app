import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-white"
            >
              Virexon
            </Link>

            <p className="mt-4 text-gray-400 leading-7 max-w-sm">
              Smart, practical products designed to make everyday
              life simpler, better, and more effortless.
            </p>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </Link>

              <Link
                to="/products"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Products
              </Link>

              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>

            </div>
          </div>


          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Customer Support
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Help & Support
              </Link>

              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Order Assistance
              </Link>

              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Shipping & Delivery
              </Link>

              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Returns & Refunds
              </Link>

            </div>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact Us
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <p>📧 info@virexon.com</p>

              <p>📞 +91 XXXXX XXXXX</p>

              <p>📍 India</p>

            </div>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center mt-5 px-5 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </div>


      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">

            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Virexon. All rights reserved.
            </p>

            <div className="flex gap-5">

              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;