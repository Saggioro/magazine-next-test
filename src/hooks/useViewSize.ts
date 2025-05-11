import { getViewHeight, getViewWidth } from "@/utils/viewUtils";
import { useEffect, useState } from "react";

export function useViewportSize() {
  const [view, setView] = useState<{ height: number; width: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateViewSize = () => {
      setView({
        width: getViewWidth(),
        height: getViewHeight(),
      });
    };

    updateViewSize();
    window.addEventListener("resize", updateViewSize);
    return () => window.removeEventListener("resize", updateViewSize);
  }, []);

  return view;
}
