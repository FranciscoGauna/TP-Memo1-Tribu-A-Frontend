export function getTimeRemaining(dateString: string) {
    const targetDate = new Date(dateString);
    const currentDate = new Date();

    const timeDiff = targetDate.getTime() - currentDate.getTime();

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    const formattedDays = Math.abs(days).toString();
    const formattedHours = Math.abs(hours).toString().padStart(2, '0');
    const formattedMinutes = Math.abs(minutes).toString().padStart(2, '0');
    const formattedSeconds = Math.abs(seconds).toString().padStart(2, '0');
    const formattedTime = `${formattedDays} days, ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    const textColor = timeDiff < 0 ? 'red' : 'inherit';

    return {
        formattedTime,
        textColor,
    };
}