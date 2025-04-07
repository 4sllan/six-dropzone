export const backgroundImage = async (file: File | any, evt: { el: HTMLElement }) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
        evt.el.style.backgroundImage = `url(${reader.result})`;
    };
    reader.readAsDataURL(file);
};