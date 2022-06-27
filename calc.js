'use strict';

const calc = {
    createNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

export default calc;