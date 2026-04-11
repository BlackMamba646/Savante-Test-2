/**
 * Decodes HTML entities in a string
 * @param text - Text containing HTML entities
 * @returns Decoded text
 */
export const decodeHtmlEntities = (text: string): string => {
    if (typeof window === 'undefined') {
        // Server-side: use simple replacements for common entities
        return text
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#x27;/g, "'")
            .replace(/&#x2F;/g, '/');
    }

    // Client-side: use DOM parser for accurate decoding
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
};
