export const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}


export const getInitials = (name) => {
    if(!name) return "";

    const words = name.split("");
    let initials = "";

    for(let i = 0; i < Math.min(words.length, 2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandsSeprator = (num) => {
    if( num == null || isNaN(num)) return "";

    const [integerPart, fractionPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionPart 
    ? `${formattedInteger}.${fractionPart}`
    :formattedInteger;
};
    
