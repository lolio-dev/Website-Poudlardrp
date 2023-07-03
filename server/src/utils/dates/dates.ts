export const getLastMonthStart = () => {
    const current = new Date();
    current.setMonth(current.getMonth() - 1);
    current.setDate(1);

    return current.toISOString().slice(0, 10);
}

export const getLastMonthEnd = () => {
    const current = new Date();
    current.setDate(1);
    current.setDate(current.getDate() - 1);
    
    return current.toISOString().slice(0, 10);
}