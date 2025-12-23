import React from "react";
import {
  Building2,
  ShieldCheck,
  MapPin,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* ================= HERO ================= */}
      <section className="relative h-[80vh] flex items-center">
        <img
          src="/images/tns-hero.jpg"
          alt="TNS Complex"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/75"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-blue-600 font-semibold tracking-wide uppercase">
            About Us
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-4 mb-6">
            Building Spaces That  
            <span className="text-blue-600"> Elevate Life & Business</span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 leading-relaxed">
            TNS Complex is a premium commercial and residential destination,
            designed with precision, trust, and long-term value at its core.
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            TNS Complex was envisioned as more than just a building — it is a
            carefully curated environment where architecture meets purpose.
            Every square foot is planned to deliver comfort, efficiency, and
            lasting value.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With a strong foundation of integrity and excellence, TNS Complex
            continues to stand as a trusted landmark for businesses,
            professionals, and families.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <MiniStat number="150+" label="Premium Units" />
          <MiniStat number="24/7" label="Security" />
          <MiniStat number="10+" label="Years Experience" />
          <MiniStat number="100%" label="Client Trust" />
        </div>
      </section>

      {/* ================= VALUE CARDS ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            What Defines TNS Complex
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <ValueCard
              icon={<Building2 />}
              title="Modern Architecture"
              text="Contemporary design with efficient layouts and premium materials."
            />
            <ValueCard
              icon={<ShieldCheck />}
              title="Safety First"
              text="Round-the-clock security, surveillance, and controlled access."
            />
            <ValueCard
              icon={<MapPin />}
              title="Strategic Location"
              text="Excellent connectivity to key commercial and residential zones."
            />
            <ValueCard
              icon={<TrendingUp />}
              title="High Investment Value"
              text="Designed to deliver long-term appreciation and stability."
            />
            <ValueCard
              icon={<Users />}
              title="Community Driven"
              text="A balanced environment for business growth and quality living."
            />
            <ValueCard
              icon={<Award />}
              title="Trusted Quality"
              text="Built with transparency, compliance, and customer satisfaction."
            />
          </div>
        </div>
      </section>

      {/* ================= VISION STRIP ================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Our Vision
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          To develop iconic spaces that inspire confidence, promote sustainable
          growth, and deliver enduring value to every customer.
        </p>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 py-20 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          Discover the Difference of TNS Complex
        </h2>
        <p className="max-w-2xl mx-auto text-blue-100 mb-10">
          Experience thoughtfully designed spaces built for ambition, comfort,
          and long-term success.
        </p>
        <button className="px-12 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition">
          Get in Touch
        </button>
      </section>

    </div>
  );
};

/* ================= COMPONENTS ================= */

const MiniStat = ({ number, label }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
    <h3 className="text-4xl font-extrabold text-blue-600">{number}</h3>
    <p className="mt-2 text-gray-600">{label}</p>
  </div>
);

const ValueCard = ({ icon, title, text }) => (
  <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{text}</p>
  </div>
);

export default AboutPage;
