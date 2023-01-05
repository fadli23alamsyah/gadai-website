export const ucWord = (text) => {
    if(text == null || text.length <= 0) return ''
    let words = text.split(" ");
    let newWord = words.map(word => word[0].toUpperCase() + word.substring(1));
    return newWord.join(" ")
}

export const formatRupiah = (digit) => {
    let min = digit.toString().match(/^-/g)
    let number = digit.toString().replace(/[^0-9]/g,'')
    let rest = number.length % 3
    let front = number.substring(0, rest)
    let thousand = number.substring(rest).match(/\d{3}/g)

    front += thousand ? (rest? '.' : '') + thousand.join(".") : ''

    return (min ? min[0] : '') + front 
}