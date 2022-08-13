import dayjs from 'dayjs'

const formatTime = (time) => {
	const date = dayjs(time);
	
	const day = date.isSame(Date.now(), 'day')
	if (day) {
		return date.format("HH:mm");
	}

	const week = date.isSame(Date.now(), 'week')
	if (week) {
		return date.format("ddd HH:mm");
	}

	return date.format("HH:mm, MMM DD, YYYY")
}

export default formatTime