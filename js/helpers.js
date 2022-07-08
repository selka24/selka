import {months} from "@/js/constants";

export const getMonthNumber = (month) => {
    return months.findIndex(m => m === month)
}

export const calculateAge = (birthday) => {
    console.log(birthday, 'birthday')
    let today = new Date();
    let age = today.getFullYear() - birthday.year;
    let m = today.getMonth() - getMonthNumber(birthday.month);
    if (m < 0 || (m === 0 && today.getDate() < birthday.day))
    {
        age--;
    }
    return age;
}
