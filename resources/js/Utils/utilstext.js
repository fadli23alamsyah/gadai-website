export const ucWord = (text) => {
    let words = text.split(" ");
    let newWord = words.map(word => word[0].toUpperCase() + word.substring(1));
    return newWord.join(" ")
}