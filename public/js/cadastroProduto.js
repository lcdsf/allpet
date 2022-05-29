

if (document.querySelector("#preco") !== undefined){
    // let temp;
    let preco = document.querySelector("#preco")
    preco.addEventListener('keypress', function(event){

      
        if (preco.value.length <= 1){
            preco.value = "0.0"+preco.value;
        }
        if (preco.value.length == 4 && parseFloat(preco.value) < 0.10){
            preco.value = "0."+preco.value.slice(3,5);
        }
        if (preco.value.length == 4 && parseFloat(preco.value) < 1.00){
            preco.value = preco.value[2]+'.'+preco.value.slice(3,5);
        }
        if (preco.value.length == 4 && parseFloat(preco.value) < 10.00){
            preco.value = preco.value[0]+preco.value[2]+'.'+preco.value.slice(3,5);
        }
        if (preco.value.length == 5 && (parseFloat(preco.value) >= 10.00 && parseFloat(preco.value) < 100.00)){
            preco.value = preco.value.slice(0,2)+preco.value[3]+'.'+preco.value.slice(4,6);
        }
        if (preco.value.length == 6 && (parseFloat(preco.value) >= 100.00 && parseFloat(preco.value) < 1000.00)){
            preco.value = preco.value.slice(0, 3)+preco.value[4]+'.'+preco.value.slice(5,7);
        }
        if (preco.value.length == 7 && (parseFloat(preco.value) >= 1000.00 && parseFloat(preco.value) < 10000.00)){
            preco.value = preco.value.slice(0, 4)+preco.value[5]+'.'+preco.value.slice(6,8);
        }

        if (preco.value.length == 8 && preco.value[5] == '.'){
            alert('O valor deve ser menor que 100.000');
            event.preventDefault();
        }
        // if (preco.value.length == 3){
        //     console.log('tam3')
        // }
        // if (preco.value.length == 4){
        //     console.log('tam4')
        // }


    });
};