export function formatTime(totalSeconds: number) {
    let minutesResult = Math.floor(totalSeconds / 60);
    let secondsResult = totalSeconds % 60;
    let formattedTime = `${minutesResult}:${
        secondsResult < 10 ? "0" : ""
    }${secondsResult}`;
    return formattedTime;
}
