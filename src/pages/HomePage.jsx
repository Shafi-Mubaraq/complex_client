import React from 'react';
import { MapPin, Zap, ShieldCheck } from 'lucide-react';

const HomePage = () => {

    const theme = {
        bg: 'bg-white',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-600',
        brandAccent: 'text-indigo-600',
        headlineGradient: 'from-indigo-700 to-purple-800',
        cardBg: 'bg-white border border-gray-200 shadow-lg',
        ctaPrimary: 'bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/30 text-white',
        ctaNav: 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-700',
    };

    const scrollToHomes = () => {
        const section = document.getElementById("homes");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToShops = () => {
        const section = document.getElementById("shops");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className={`${theme.bg} ${theme.textPrimary} flex flex-col justify-center items-center px-4 py-24 sm:py-16`}
        >
            <div className="max-w-7xl mx-auto text-center">

                <p className={`text-sm sm:text-base font-semibold mb-5 tracking-widest uppercase ${theme.brandAccent}`}>
                    T.N.S Complex — Visionary Urban Development
                </p>

                <h1
                    className={`text-6xl sm:text-7xl lg:text-7xl font-black mb-10 
                    leading-normal tracking-tighter text-transparent bg-clip-text 
                    bg-gradient-to-r ${theme.headlineGradient}`}
                >
                    The Definitive Standard in
                    <br className="hidden md:inline" />
                    Integrated Living.
                </h1>

                <p className={`text-xl sm:text-2xl max-w-4xl mx-auto mb-16 font-normal ${theme.textSecondary}`}>
                    A prestigious, centrally-located complex engineered for uncompromised security, premium connectivity, and an elevated residential and commercial experience.
                </p>

                <div className="mb-8">
                    <button
                        onClick={scrollToHomes}
                        className={`${theme.ctaPrimary} font-bold px-12 py-4 rounded-xl text-lg tracking-wide transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500/80`}
                    >
                        Request a Private Viewing
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5 mb-28">
                    <button
                        onClick={scrollToHomes}
                        className={`${theme.ctaNav} font-medium px-8 py-3 rounded-lg text-base tracking-wide transition duration-300 transform hover:scale-[1.005] focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                    >
                        View Residential Units
                    </button>

                    <button
                        onClick={scrollToShops}
                        className={`${theme.ctaNav} font-medium px-8 py-3 rounded-lg text-base tracking-wide transition duration-300 transform hover:scale-[1.005] focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                    >
                        View Commercial Spaces
                    </button>
                </div>

                <h3 className={`text-4xl font-extrabold mb-16 ${theme.textPrimary} border-b-2 border-indigo-400/50 pb-2 inline-block`}>
                    Core Strategic Advantages
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className={`${theme.cardBg} p-8 rounded-2xl shadow-xl shadow-gray-200 transition duration-500 ease-in-out hover:shadow-indigo-200 hover:-translate-y-1`}>
                        <div className="p-3 inline-block rounded-full mb-6 text-white bg-indigo-500">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h4 className="text-2xl font-bold mb-3 text-gray-900">Central Prime Location</h4>
                        <p className={`text-base ${theme.textSecondary}`}>
                            Strategically positioned at the epicenter of commerce and luxury, guaranteeing superior connectivity and accessibility for residents and businesses.
                        </p>
                    </div>

                    <div className={`${theme.cardBg} p-8 rounded-2xl shadow-xl shadow-gray-200 transition duration-500 ease-in-out hover:shadow-indigo-200 hover:-translate-y-1`}>
                        <div className="p-3 inline-block rounded-full mb-6 text-white bg-yellow-500">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h4 className="text-2xl font-bold mb-3 text-gray-900">Advanced Infrastructure</h4>
                        <p className={`text-base ${theme.textSecondary}`}>
                            Featuring zero-downtime power redundancy systems and dedicated high-speed fiber backbone for seamless, high-performance operations 24/7.
                        </p>
                    </div>

                    <div className={`${theme.cardBg} p-8 rounded-2xl shadow-xl shadow-gray-200 transition duration-500 ease-in-out hover:shadow-indigo-200 hover:-translate-y-1`}>
                        <div className="p-3 inline-block rounded-full mb-6 text-white bg-green-600">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h4 className="text-2xl font-bold mb-3 text-gray-900">Multi-Layer Security</h4>
                        <p className={`text-base ${theme.textSecondary}`}>
                            Comprehensive security protocol including 24/7 manned surveillance, biometric access control, and smart perimeter defenses for total peace of mind.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default HomePage;