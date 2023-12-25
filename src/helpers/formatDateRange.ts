import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

export default function formatDateRange(
    startDate: string,
    endDate: string
): string {
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    const startFormat =
        start.getFullYear() === end.getFullYear()
            ? format(start, "d MMM", { locale: ru })
            : format(start, "d MMM yy", { locale: ru });

    const endFormat =
        start.getFullYear() === end.getFullYear()
            ? format(end, "d MMM", { locale: ru })
            : format(end, "d MMM yy", { locale: ru });

    return `${startFormat} - ${endFormat}`;
}
