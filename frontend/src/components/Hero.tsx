import diwaliVideo from "@/assets/videos/Crystal-Bubble-Ball.mp4";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate()
    return (
        <section className="relative h-[calc(100vh-64px)] min-h-[600px] w-full overflow-hidden sm:h-[calc(100vh-72px)] lg:h-[calc(100vh-80px)]">

            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source src={diwaliVideo} type="video/mp4" />
            </video>

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

            {/* Hero Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">

                {/* Diwali Badge */}
                <div className="mb-4 rounded-full border border-orange-300/40 bg-orange-500/20 px-4 py-2 text-xs font-semibold tracking-widest text-orange-200 backdrop-blur-md sm:mb-6 sm:px-5 sm:text-sm">
                    🪔 DIWALI SPECIAL
                </div>

                {/* Heading */}
                <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Light Up Your Diwali
                    <span className="block text-orange-400">
                        with Virexon
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-4 max-w-sm px-2 text-sm leading-relaxed text-gray-200 sm:mt-5 sm:max-w-xl sm:text-base md:max-w-2xl md:text-lg lg:mt-6 lg:text-xl">
                    Discover exciting products and make this festive season even more
                    special.
                </p>

                {/* Buttons */}
                <div className="mt-6 flex w-full max-w-sm flex-col gap-3 px-4 sm:mt-8 sm:w-auto sm:max-w-none sm:flex-row sm:px-0 sm:gap-4">

                    <button
                        onClick={() => navigate("/products?category=Diwali")}
                        className="w-full rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold 
                       text-white transition duration-300 hover:bg-orange-600 sm:w-auto 
                       sm:px-8 sm:text-base"
                    >
                        Shop Now
                    </button>

                    <button
                        onClick={() => navigate("/products")}
                        className="w-full rounded-xl border border-white/40 bg-white/10 px-6 py-3 
                        text-sm font-semibold text-white backdrop-blur-md transition duration-300 
                        hover:bg-white/20 sm:w-auto sm:px-8 sm:text-base"
                    >
                        Explore Products
                    </button>
                </div>

                {/* Scroll Indicator */}
                <div
                    onClick={() =>
                        document.getElementById("explore-section")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                    className="absolute bottom-5 flex cursor-pointer flex-col items-center gap-1 text-xs text-gray-300 sm:bottom-8 sm:gap-2 sm:text-sm"
                >
                    <span>Scroll to explore</span>
                    <span className="animate-bounce text-lg sm:text-xl">↓</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;