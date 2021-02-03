export function removeStringAccent(word: string) {

    const result = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return result;
    
}