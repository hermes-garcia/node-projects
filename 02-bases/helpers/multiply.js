const fs = require('fs');
const colors = require('colors');

const createMultiplierFile = async(base = 5, list = false, limit = 10) => {
    try {
        let result = '';
        for (let i = 1; i <= limit; i++) {
            result += `${base} x ${i} = ${base*i}\n`;
        }

        if (list) {
            console.log(colors.gray('----------------'));
            console.log(colors.rainbow(`- Multiplier ${base} -`));
            console.log(colors.gray('----------------'));
            console.log(result);
        }

        fs.writeFileSync(`./files/multiplier-${base}.txt`, result);
        return `multiplier-${base}.txt`
    } catch (e) {
        throw e;
    }

}

module.exports = {
    createMultiplierFile
}