input = 'name-surya&age-42&gender-male'

// output = { name: 'surya', age: '42', gender: 'male' }
let obj={}

let pair = input.split('&')
for(let  i=0;i<pair.length;i++){
    let [key,value] = (pair[i].split("-"))
    obj[key] = value

}
console.log(obj)