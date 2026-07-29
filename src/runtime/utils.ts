export const backgroundImage = (file: File, element: HTMLElement): void => {
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => {
    element.style.backgroundImage = `url(${reader.result})`;
  };
  reader.readAsDataURL(file);
};

export const imageUrlToBase64 = async (url: string): Promise<string> => {
  try {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

export const dataURLtoFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
  const bstr = atob(arr[arr.length - 1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new File([u8arr], filename, { type: mime });
};

export const isFileAccepted = (file: File, accept: string | string[]): boolean => {
  if (!accept) return true;

  const acceptedTypes = Array.isArray(accept)
    ? accept
    : accept.split(',').map((type) => type.trim());

  return acceptedTypes.some((type) => {
    if (type.startsWith('.')) {
      return file.name.endsWith(type);
    }
    return file.type.startsWith(type.replace('/*', ''));
  });
};
