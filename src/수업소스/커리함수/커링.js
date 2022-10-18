const sum = (a, b) => {
  return a + b;
}
console.log(`sum ===> ${sum(2,3)}`);

function curring(func) {
  return function(a){
    return function(b){
      return func(a, b)
    }
  }
}

const curring2 = func => a => b => func(a, b)

const curried = curring(sum);

const exam1 = curried(20);

const exam1_res = exam1(30);

console.log(`exam1_res: ${exam1_res}`);

const exam2 = curried(30)(40)
console.log(`exam2: ${exam2}`);


/* 
커리함수는 함수를 매개변수를 받을 수 있다. - 자바스크립트에서의 함수는 객체이니까... 
커리함수는 실행 시점에 배개변수로 받은 함수의 인자를 사용하는 함수를 다시 반환할 수 있다.
∴ 마지막에 반환되는 함수는 Lexical scope 개념에 의해 
    커리함수에 전달된 모든 함수를 (누적하여)기억한다.
*/