export const getViewHeight = (): number => {
  if (typeof window !== "undefined") {
    return window.innerHeight;
  }
  return 0;
};

export const getViewWidth = (): number => {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  }
  return 0;
};
