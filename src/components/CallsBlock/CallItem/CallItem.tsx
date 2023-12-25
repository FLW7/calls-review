import { FC, memo } from "react";
import { ICall } from "../../../models/ICall";
import cl from "./callItem.module.scss";
import { getFormattedTime } from "../../../helpers/timeFormatter";
import noAvatar from "../../../assets/icons/noAvatar.jpg";
import { phoneFormatter } from "../../../helpers/phoneFormatter";
import { formatTime } from "../../../helpers/timeFormatterFromSeconds";
import { getRandomNumber } from "../../../helpers/getRandomNumber";
import AudioPlayer from "../../assets/AudioPlayer/AudioPlayer";

interface CallItemProps {
    call: ICall;
}

type RatingClass = "excellent" | "good" | "bad";

type Rating = {
    class: RatingClass;
    text: string;
};

const CallItem: FC<CallItemProps> = memo(({ call }) => {
    function renderName(name: string, surname: string, number: string) {
        return (
            <div className={cl.callItem__nameWrapper}>
                {(name || surname) && (
                    <p className={cl.callItem__name}>
                        {name && name + " " + surname}
                    </p>
                )}
                <p className={cl.callItem__phone}>
                    {phoneFormatter(call.to_number)}
                </p>
            </div>
        );
    }

    const randomRating = (): Rating => {
        const num = getRandomNumber(1, 3);

        switch (num) {
            case 1:
                return { class: "excellent", text: "Отлично" };
            case 2:
                return { class: "good", text: "Хорошо" };
            case 3:
                return { class: "bad", text: "Плохо" };

            default:
                return { class: "excellent", text: "Отлично" };
        }
    };

    const rating = randomRating();

    return (
        <tr className={cl.callItem}>
            <td className={cl.callItem__type}>
                <span
                    className={`
                    ${cl.in_out} 
                    ${call.in_out === 1 ? cl.in : cl.out} 
                    ${
                        call.in_out === 1 && call.status !== "Дозвонился"
                            ? cl.in__rejected
                            : ""
                    } ${
                        call.in_out === 0 && call.status !== "Дозвонился"
                            ? cl.out__rejected
                            : ""
                    }`}
                />
            </td>
            <td className={cl.callItem__time}>{getFormattedTime(call.date)}</td>
            <td>
                {call.person_avatar ? (
                    <img
                        className={cl.callItem__avatar}
                        src={call.person_avatar}
                        alt="avatar"
                    />
                ) : (
                    <img
                        className={cl.callItem__avatar}
                        src={noAvatar}
                        alt="no-avatar"
                    />
                )}
            </td>
            <td>
                {renderName(
                    call.person_name,
                    call.person_surname,
                    call.to_number
                )}
            </td>
            <td className={cl.callItem__source}>{call.source}</td>
            {call.errors.length ? (
                <td className={cl.callItem__error}>{call.errors.join(" ,")}</td>
            ) : (
                <td>
                    <p
                        className={`${cl.callItem__rating} ${
                            cl[`${rating.class}`]
                        }`}
                    >
                        {rating.text}
                    </p>
                </td>
            )}
            {call.record ? (
                <td>
                    <AudioPlayer
                        trackId={call.id}
                        record={call.record}
                        partnership_id={parseInt(call.partnership_id)}
                    />
                </td>
            ) : (
                <td className={cl.callItem__duration}>
                    {call.time > 0 ? formatTime(call.time) : ""}
                </td>
            )}
        </tr>
    );
});

export default CallItem;
