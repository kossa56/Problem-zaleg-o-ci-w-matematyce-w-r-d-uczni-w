import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Competition } from "@/data/competitions";
import { toast } from "@/hooks/use-toast";

export default function Pytania() {
  const comp = useOutletContext<Competition>();
  const [question, setQuestion] = useState("");

  const handleSend = () => {
    if (!question.trim()) return;
    toast({ title: "Pytanie wysłane! 📩", description: "Organizator odpowie wkrótce." });
    setQuestion("");
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-foreground">Pytania ❓</h2>
        <p className="text-muted-foreground text-xs md:text-sm">Pytaj śmiało, organizator odpowie!</p>
      </div>

      {/* Input */}
      <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-4 md:p-5 space-y-2 md:space-y-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Napisz pytanie... 💬"
          className="w-full bg-muted rounded-xl md:rounded-2xl px-3 md:px-4 py-2.5 md:py-3 text-sm text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSend}
          className="w-full sm:w-auto rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-secondary px-5 md:px-6 py-2.5 text-sm font-bold text-primary-foreground btn-bounce"
        >
          Wyślij pytanie →
        </button>
      </div>

      {/* Q&A feed */}
      {comp.qa.length === 0 ? (
        <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-6 md:p-8 text-center">
          <p className="text-3xl md:text-4xl mb-3">❓</p>
          <p className="text-sm text-muted-foreground">Brak pytań — bądź pierwszy!</p>
        </div>
      ) : (
        comp.qa.map((item) => (
          <div key={item.id} className="rounded-2xl md:rounded-3xl border border-border bg-card p-4 md:p-5 space-y-3">
            <div className="flex items-start gap-2.5 md:gap-3">
              <div className={`${item.color} w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold text-white shrink-0`}>
                {item.initial}
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-bold text-foreground">
                  {item.author} <span className="text-muted-foreground font-normal">· {item.timeAgo}</span>
                </p>
                <p className="text-sm text-foreground mt-1">{item.question}</p>
              </div>
            </div>

            {item.answer && (
              <div className="ml-3 md:ml-4 border-l-4 border-primary pl-3 md:pl-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <div className="bg-primary w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold text-primary-foreground">K</div>
                  <span className="text-xs md:text-sm font-bold text-foreground">{item.answer.author}</span>
                  <span className="text-[10px] md:text-xs rounded-full bg-primary/20 px-2 py-0.5 text-primary font-bold">Organizator</span>
                </div>
                <p className="text-xs md:text-sm text-foreground">{item.answer.text}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
