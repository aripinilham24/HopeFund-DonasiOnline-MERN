import { Link } from "react-router-dom";
import { HandHeart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HandHeart className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">HopeFund</span>
            </div>
            <p className="text-sm leading-relaxed">
              Platform donasi online terpercaya untuk membantu sesama.
              Kami menghubungkan para donatur dengan campaign sosial yang
              membutuhkan dukungan.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tautan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/create-donation" className="hover:text-blue-400 transition-colors">Buat Campaign</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-blue-400 transition-colors">Cara Kerja</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <span>support@hopefund.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Ikuti Kami</h3>
            <p className="text-sm leading-relaxed mb-3">
              Dapatkan informasi terbaru tentang campaign dan kegiatan sosial
              melalui media sosial kami.
            </p>
            <div className="flex gap-3">
              {[
                { name: "IG", label: "Instagram" },
                { name: "FB", label: "Facebook" },
                { name: "X", label: "Twitter" },
              ].map((soc) => (
                <span
                  key={soc.name}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 text-xs font-bold text-blue-400 hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                  title={soc.label}
                >
                  {soc.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
          HopeFund &copy; {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
