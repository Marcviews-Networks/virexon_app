import { useNavigate } from "react-router-dom";

const VideoShowcase = () => {
    const navigate = useNavigate();

    const videos = [
        {
            src: "/videos/product1.mp4",
            name: "Premium Lighting",
        },
        {
            src: "/videos/product2.mp4",
            name: "Smart Lighter",
        },
        {
            src: "/videos/product3.mp4",
            name: "Everyday Essential",
        },
        {
            src: "/videos/product4.mp4",
            name: "LED Candles",
        },
        {
            src: "/videos/product5.mp4",
            name: "Decorative Lights",
        },
    ];

    return (
        <section className="bg-black text-white py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Heading */}
                <div className="text-center mb-10 sm:mb-12">
                    <p className="text-orange-400 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
                        See It In Action
                    </p>

                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        Products Made for{" "}
                        <span className="text-orange-400">
                            Everyday Life
                        </span>
                    </h2>

                    <p className="text-gray-400 mt-4 text-sm sm:text-base">
                        Discover our products in action.
                    </p>
                </div>

                {/* Reels */}
                <div
                    className="
                        flex gap-4 sm:gap-5 lg:gap-6
                        overflow-x-auto
                        snap-x snap-mandatory
                        scroll-smooth
                        pb-4
                        scrollbar-hide
                    "
                >
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className="
                                group
                                relative
                                flex-shrink-0
                                w-[82vw]
                                sm:w-[280px]
                                lg:w-[240px]
                                aspect-[9/16]
                                overflow-hidden
                                rounded-3xl
                                bg-gray-900
                                snap-center
                                shadow-2xl
                            "
                        >
                            {/* Video */}
                            <video
                                src={video.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="
                                    absolute inset-0
                                    w-full h-full
                                    object-cover
                                    transition-transform
                                    duration-700
                                    group-hover:scale-105
                                "
                            />

                            {/* Gradient */}
                            <div
                                className="
                                    absolute inset-0
                                    bg-gradient-to-t
                                    from-black/90
                                    via-black/20
                                    to-transparent
                                "
                            />

                            {/* Reel Number */}
                            <div className="absolute top-4 left-4">
                                <span className="text-xs font-medium text-white/70">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">

                                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                                    {video.name}
                                </h3>

                                <button
                                    onClick={() => navigate("/products")}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-white
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        text-black
                                        transition-all
                                        duration-300
                                        hover:bg-orange-500
                                        hover:text-white
                                        hover:scale-105
                                    "
                                >
                                    Shop Now
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile swipe hint */}
                <div className="flex justify-center mt-5 sm:hidden">
                    <p className="text-xs text-gray-500">
                        ← Swipe to explore →
                    </p>
                </div>

            </div>
        </section>
    );
};

export default VideoShowcase;