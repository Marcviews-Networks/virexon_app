import { useNavigate } from "react-router-dom";
const VideoShowcase = () => {

    const navigate = useNavigate()
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
        <section className="bg-black text-white py-16">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-10">
                    <p className="text-orange-400 text-sm font-semibold tracking-widest">
                        SEE IT IN ACTION
                    </p>

                    <h2 className="text-4xl sm:text-5xl font-bold mt-2">
                        Products Made for{" "}
                        <span className="text-orange-400">Everyday Life</span>
                    </h2>

                    <p className="text-gray-400 mt-4">
                        Discover our products in action.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-3xl bg-gray-900 aspect-[9/16] shadow-2xl"
                        >
                            {/* Video */}
                            <video
                                src={video.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Dark gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            {/* Product information */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <p className="text-white text-lg font-semibold mb-3">
                                    {video.name}
                                </p>

                                <button
                                    onClick={() => navigate("/products")}
                                    className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold transition-all duration-300 hover:bg-orange-500 hover:text-white hover:scale-105"
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default VideoShowcase;