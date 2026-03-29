import { Keyboard, Heart } from 'lucide-react';
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full mt-24 py-12 border-t border-[#44475a] bg-gradient-to-b from-[#282a36] to-[#bd93f9]/10 text-[#6272a4] flex flex-col items-center justify-center transition-colors duration-300">
            <div className="max-w-4xl w-full px-6 flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Brand & Description */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <div className="flex items-center gap-2 text-[#f8f8f2] font-semibold text-xl">
                        <Keyboard className="w-6 h-6 text-[#bd93f9]" />
                        <span>TypeDash</span>
                    </div>
                    <p className="text-sm text-[#6272a4] text-center md:text-left max-w-sm leading-relaxed">
                        Um projeto open-source para testar e melhorar sua velocidade de digitação. Acompanhe suas métricas em tempo real.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col items-center md:items-end gap-3 text-sm">
                    <a
                        href="https://github.com/emanuelVINI/typing-metrics"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-[#f8f8f2] hover:text-[#bd93f9] transition-colors bg-[#bd93f9]/10 px-4 py-2 rounded-lg border border-[#bd93f9]/20 hover:border-[#bd93f9]/50"
                    >
                        <FaGithub className="w-4 h-4" />
                        <span className="font-medium">emanuelVINI/typing-metrics</span>
                    </a>

                    <div className="flex items-center gap-1.5 mt-2">
                        <span>Desenvolvido com</span>
                        <Heart className="w-4 h-4 text-[#ff79c6] fill-[#ff79c6] animate-pulse" />
                        <span>por</span>
                        <a
                            href="https://github.com/emanuelVINI"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#f8f8f2] hover:text-[#8be9fd] transition-colors font-medium ml-1 underline decoration-[#8be9fd]/30 hover:decoration-[#8be9fd] underline-offset-4"
                        >
                            emanuelVINI
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-6 w-full max-w-4xl px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6272a4] border-t border-[#44475a]/50">
                <p>&copy; {new Date().getFullYear()} TypeDash. Todos os direitos reservados.</p>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <span className="opacity-50">v0.1.0</span>
                </div>
            </div>
        </footer>
    );
}