'use strict'


const _new = function (fn) {
    let obj = {};

    if (fn.prototype !== null) {
        //obj.__proto__ = fn.prototype;
        Object.setPrototypeOf(obj, fn.prototype);
    }

    const arrArgumentos = Array.prototype.slice.call(arguments, 1);

    const ret = fn.apply(obj, arrArgumentos);

    if ((typeof ret === "object" || typeof ret === "function") && (ret !== null)) {
        return ret;
    }


    return obj;
}



const criarHomem = function (nome, idade, arr) {
    let obj = {};
    Object.assign(obj, {
        nome,
        idade,
        qualquer: arr
    });
    return obj;
}

const Homem = function (nome, idade, arr) {

    this.nome = nome;
    this.idade = idade;
    this.qualquer = arr;
    //this.__proto__ = homem;

}

const homem = {
    sexo: "M"
}

Homem.prototype = homem;

let teste = _new(Homem, "a", "b", "c");

/*class Homem {
    constructor(nome, idade, arr) {
        this.nome = nome;
        this.idade = idade;
        this.qualquer = arr;
        this.__proto__ = homem;
    }
}*/

let joao = {};
joao.__proto__ = Homem.prototype; //New faz isso automático
Homem.call(joao, "João", 30, [5]);

//Homem.apply(joao, ["João", 30, [5]]);

let pedro = criarHomem("Pedro", 30, [1, 5, 9]);


Object.setPrototypeOf(pedro, homem);

Homem.prototype.sexo = "feminino";

console.log(joao.sexo);
//console.log(pedro.__proto__);

for (const property in pedro) {
    if (!pedro.hasOwnProperty(property)) {
        continue;
    }
}

