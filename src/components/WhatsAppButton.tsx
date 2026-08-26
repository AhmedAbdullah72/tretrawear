import { MessageCircle } from "lucide-react";
import { trackMetaContact } from "@/lib/metaPixel";

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/201024888818"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackMetaContact("whatsapp")}
      aria-label="Chat with TRETRA Wear on WhatsApp"
      className="wa-fab fixed bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-primary-foreground shadow-lg hover:scale-105 transition-transform duration-150 safe-bottom"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} aria-hidden="true" />
    </a>
  );
};
