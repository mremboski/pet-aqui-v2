import React, { useEffect, useState, useMemo } from "react";
import logo from "./assets/logotransp.png";

export default function SplashScreen() {
    const [fadeOut, setFadeOut] = useState(false);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setShowText(true), 1000);
        const t2 = setTimeout(() => setFadeOut(true), 3200);
        const t3 = setTimeout(() => {
            const splash = document.getElementById("splash");
            if (splash) splash.classList.add("splash-hidden");
        }, 3900);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    const paws = useMemo(() =>
        Array.from({ length: 18 }).map((_, i) => {
            const leftPercent = Math.random() * 100;
            return {
                id: i,
                leftPercent,
                delay: i * 0.45,
                color: i % 2 === 0 ? "text-purple-400/40" : "text-indigo-400/40",
            };
        }),
        []
    );

    useEffect(() => {
        const styleId = "splash-paw-styles";
        let styleElement = document.getElementById(styleId) as HTMLStyleElement;

        if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }

        const cssRules = paws.map(
            (paw) =>
                `.paw-trail-${paw.id} { left: ${paw.leftPercent}%; animation-delay: ${paw.delay}s; }`
        ).join("\n");

        styleElement.textContent = cssRules;

        return () => {
            const element = document.getElementById(styleId);
            if (element) {
                element.remove();
            }
        };
    }, [paws]);

    return (
        <div
            id="splash"
            className={`fixed inset-0 z-[9999] flex items-center justify-center
      bg-gradient-to-b from-[#0b0015] via-[#12002a] to-[#06000f]
      transition-opacity duration-1000 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
            <div className="absolute w-[600px] h-[600px] bg-purple-700/30 blur-[160px] rounded-full animate-pulse" />
            <div className="absolute w-[300px] h-[300px] rounded-full border-2 border-purple-500/40 animate-spin-slow blur-[1px]" />
            <div className="relative z-10 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                        src={logo}
                        alt="Pet Aqui"
                        className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(139,92,246,0.75)] animate-bounce-slow"
                    />
                </div>


                <div className="absolute top-[120%] left-1/2 -translate-x-1/2 text-center">
                    {showText && (
                        <p className="text-gray-300 text-lg italic tracking-wide animate-fadeInSlow">
                            Carregando o mundo de ajuda pet...
                        </p>
                    )}
                </div>
            </div>


            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {paws.map((paw) => (
                    <span
                        key={paw.id}
                        className={`${paw.color} text-2xl absolute paw-trail-element paw-trail-${paw.id}`}
                        aria-hidden="true"
                    >
                        🐾
                    </span>
                ))}
            </div>
        </div>
    );
}
