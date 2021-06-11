class Utils {
    /**
     * Retorna uma cor para cada entrada, deterministica
     * @param {String} input
     */
    static of(input) {
        const id = _hash(input);
        console.log(id);
    }
    /**
     * Hash simples para mapear as cores
     * https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
     * @param {String} input
     * @returns
     */
    static _hash(input) {
        var hash = 0;
        if (input.length == 0) return hash;
        for (i = 0; i < input.length; i++) {
            char = input.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}
