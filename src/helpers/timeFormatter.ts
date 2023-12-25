import { parseISO } from "date-fns";
import { format } from "date-fns";

export const getFormattedTime = (dateString: string): string => {
    const date = parseISO(dateString);
    return format(date, "HH:mm");
};
