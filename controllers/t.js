

var vm = {
    '1': 3,
    '2': 5
}
var arr = [
    { id: 1, count: 2 },
    { id: 2, count: 4 }
];
var temp = Object.keys(vm);
for (let i = 0; i < arr.length; i++) {
    for(let j = 0; j < temp.length; j++){
        if(arr[i].id == temp[j]){
            arr[i].count = vm.temp[j];
        }
    }
}
console.log(Object.keys(vm));