import React, { useState } from "react";

const Translator = () => {
  const [input, setInput] = useState("");
  const [translated, setTranslated] = useState("");

  const translateToArabic = async (text) => {
    try {
      const res = await fetch("https://translate.argosopentech.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: "en",
          target: "ar",
          format: "text"
        }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setTranslated(data.translatedText);
    } catch (error) {
      console.error("Translation error:", error.message);
      setTranslated("⚠️ Translation failed");
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setInput(text);
    translateToArabic(text);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type English"
        style={{ width: "300px", padding: "10px" }}
      />
      <p>Arabic: {translated}</p>
    </div>
  );
};

export default Translator;
