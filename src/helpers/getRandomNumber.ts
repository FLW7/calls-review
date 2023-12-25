export function getRandomNumber(min: number, max: number) {
    let randomFraction = Math.random();

    // Масштабирование и сдвиг для получения числа в заданном диапазоне
    let randomNumber = Math.floor(randomFraction * (max - min + 1)) + min;

    return randomNumber;
}
