import React, { useEffect, useState } from "react";
import logo from "./assets/logotransp.png";

export default function SplashScreen() {
    const [fadeOut, setFadeOut] = useState(false);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowText(true), 1000);
        const timer2 = setTimeout(() => setFadeOut(true), 3200);
        const timer3 = setTimeout(() => {
            const splash = document.getElementById("splash");
            if (splash) splash.style.display = "none";
        }, 3900);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const paws = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${i * 0.6}s`,
        color: i % 2 === 0 ? "text-purple-400/40" : "text-indigo-400/40",
    }));

    return (
        <div
            id="splash"
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center 
      bg-gradient-to-b from-[#0b0015] via-[#12002a] to-[#06000f]
      transition-opacity duration-1000 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >

            <div className="absolute w-[500px] h-[500px] bg-purple-700/30 blur-[150px] rounded-full animate-pulse"></div>

            <div className="absolute w-[220px] h-[220px] rounded-full border-2 border-purple-500/30 animate-spin-slow blur-[1px]"></div>

            <div className="relative flex flex-col items-center z-10 animate-fadeIn">
                <img
                    src={logo}
                    alt="Pet Aqui Logo"
                    className="w-36 h-36 object-contain rounded-2xl drop-shadow-[0_0_30px_rgba(139,92,246,0.6)] animate-bounce-slow"
                />

                {showText && (
                    <p className="text-gray-300 mt-8 text-lg italic tracking-wide animate-fadeInSlow">
                        Carregando o mundo de ajuda pet...
                    </p>
                )}
            </div>


            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {paws.map((paw) => (
                    <span
                        key={paw.id}
                        className={`${paw.color} text-2xl absolute animate-pawTrail`}
                        style={{
                            left: paw.left,
                            animationDelay: paw.delay,
                        }}
                    >
                        🐾
                    </span>
                ))}
            </div>
        </div>
    );
}
