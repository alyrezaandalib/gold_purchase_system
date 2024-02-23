export const truncateTextStart = (maxLength: number, text: string) => {
    let truncated
    if (text.length > maxLength) {
        truncated = text.substr(0, maxLength) + "...";
    } else truncated = text
    return truncated;
};
