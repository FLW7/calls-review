export function phoneFormatter(phone: string) {
    const cleaned = ("" + phone).replace(/\D/g, "");

    if (!/^\d+$/.test(cleaned)) {
        return phone;
    }

    const formatted = cleaned.replace(
        /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
        "+$1 ($2) $3-$4-$5"
    );
    return formatted;
}
