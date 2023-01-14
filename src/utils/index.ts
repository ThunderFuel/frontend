export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) {
    newWindow.opener = null;
  }
};

export const chunk = (arr: any = [], chunkSize = 4) => {
  const tmpArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    tmpArray.push(chunk);
  }

  return tmpArray;
};
