// parse date string of format "DD/MM/YYYY" to "DDth Month YYYY"
export const parseDate = (date: string) => {
	// account for st vs th, by using Date object
	// ready the date string for Date object by converting to YYYY-MM-DD
	const dateArr = date.split('/');
	const dateObj = new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);
	const ans = dateObj.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
	return ans;
};
