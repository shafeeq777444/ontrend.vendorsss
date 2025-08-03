 // Helper function to safely format currency
 export const formatOMR = (amount) => {
    const numAmount = Number(amount) || 0;
    return numAmount.toFixed(3);
};
