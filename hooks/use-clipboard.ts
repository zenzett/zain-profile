import { useState } from "react";

const useClipboard = (text: string, timeout = 2000) => {
  const [clipboard, setClipboard] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setClipboard(true);
      setTimeout(() => setClipboard(false), timeout);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return [clipboard, handleCopy] as const;
};

export default useClipboard;
