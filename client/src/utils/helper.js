import moment from "moment";

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

export const expenseBarChartData = (data = []) => {
    const charData = data.map( (item) => ({
        category: item?.category,
        amount: item?.amount,
    }));

    return charData;
};
    
export const incomeBarChart = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const charData = sortedData.map( (item) => ({
        month: moment(item.createdAt).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }));

    return charData;
}

export const expenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const charData = sortedData.map( (item) => ({
        month: moment(item.createdAt).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }));

    return charData;
}
