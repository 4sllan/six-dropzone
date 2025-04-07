export const backgroundImage = async (file: File | any, evt: { el: HTMLElement }) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
        evt.el.style.backgroundImage = `url(${reader.result})`;
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

export const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)?.[1] || '',
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, {type: mime});
};