import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-gray-700 py-10 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-10">
          {/* FitTrack Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 inline-block pb-1">
              FitTrack
            </h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Press", "Blog"].map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-sm hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 inline-block pb-1">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                "Help Center",
                "Community",
                "Tutorials",
                "API Documentation",
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-sm hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 inline-block pb-1">
              Legal
            </h3>
            <ul className="space-y-2">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "GDPR",
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-sm hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 inline-flex pb-1">
              Connect With Us
            </h3>
            <div className="flex gap-4 text-gray-500 text-lg">
              <Link href="#" className="hover:text-blue-500 transition-colors">
                f
              </Link>
              <Link href="#" className="hover:text-blue-500 transition-colors">
                t
              </Link>
              <Link href="#" className="hover:text-blue-500 transition-colors">
                ig
              </Link>
              <Link href="#" className="hover:text-blue-500 transition-colors">
                yt
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-300 text-center text-sm text-gray-500">
          &copy; 2025 FitTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
