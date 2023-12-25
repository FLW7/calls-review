import { format, isToday, isYesterday, isThisYear, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

const formatDate = (date: Date): string => {
    if (isThisYear(date)) {
        return format(date, "d MMMM", { locale: ru });
    } else {
        return format(date, "d MMMM yyyy", { locale: ru });
    }
};

const dateFormatter = (dateString: string): string => {
    const date = parseISO(dateString);

    if (isToday(date)) {
        return "сегодня";
    } else if (isYesterday(date)) {
        return "вчера";
    } else if (isYesterday(date)) {
        return "позавчера";
    } else {
        return formatDate(date);
    }
};

export default dateFormatter;
