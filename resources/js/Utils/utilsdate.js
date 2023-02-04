export const dateNowFormat = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1 > 9 ? date.getMonth()+1 : '0'+(date.getMonth()+1)
    const day = date.getDate()+1 > 9 ? date.getDate()+1 : '0'+date.getDate()

    // Format YYYY-mm-dd
    return [year, month, day].join('-')
}

export const countTotalDate = (secondDate, firstDate) => {
    return Math.round((Date.parse(secondDate) - Date.parse(firstDate))/ (1000 * 3600 * 24)) + 1
}