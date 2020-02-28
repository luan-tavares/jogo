'use strict'

Object.prototype.atirar = function () {
    return "Pei pei pei";

}

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

const homem = {
    sexo: "M"
}

const criarHomem = function (nome, idade, arr) {
    let obj = Object.create(homem);
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



Homem.prototype = homem;

let teste = _new(Homem, "a", "b", "c");

//console.log(Object.getPrototypeOf(teste).__proto__);

/*class Homem {
    constructor(nome, idade, arr) {
        this.nome = nome;
        this.idade = idade;
        this.qualquer = arr;
        this.__proto__ = homem;
    }
}*/

/***** JOAO*/

let joao = {};

Homem.call(joao, "João", 30, [5]);

//Homem.apply(joao, ["João", 30, [5]]);

Object.setPrototypeOf(joao, homem);

/*** */



let pedro = criarHomem("Pedro", 30, [1, 5, 9]);


Homem.prototype.a = "foo";

Object.assign(Homem.prototype, { sexo: "bar" });
Object.assign(Homem.prototype, { teste: "bar" });

//console.log(pedro.nome + ": " + pedro.sexo);
//console.log(joao.nome + ": " + joao.sexo);
//console.log(pedro.__proto__);

for (const property in pedro) {
    if (!pedro.hasOwnProperty(property)) {
        continue;
    }
}


console.log(pedro.__proto__);
