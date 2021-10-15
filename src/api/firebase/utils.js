// Agrupamento de métodos para facilitar interagir com as estruturas do Firebase
export class Helpers {
    // Pega os valores de uma collection (array) de um documento
    static async getCollection(ref, path = "/") {
        return (await ref.collection(path).get()).docs;
    }
    // segue um referencia para outro documento
    static async followReference(ref) {
        return (await ref.get()).data();
    }

    /**
     * Applies `await fun` to elements in the array
     * @param {Array} array
     * @param {Function} fun
     */
    static async asyncForEach(array, fun) {
        for (let i = 0; i < array.length; i++) {
            await fun(array[i], i);
        }
    }

    static detectBrowser() {
        const agent = navigator.userAgent;
        if (agent.includes("Chrome")) {
            return "chrome";
        } else if (agent.includes("Firefox")) {
            return "firefox";
        } else {
            return "other";
        }
    }
}
