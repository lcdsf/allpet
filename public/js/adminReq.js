

if (document.querySelector('#formeditastatus') != undefined){
    let formEdit = document.querySelector('#formeditastatus');
    

    document.querySelector('#editastatus').addEventListener('click', function(){
        formEdit.style.display = "block";
    });

    document.querySelector('#cancelaedicaostatus').addEventListener('click', function(){
        formEdit.style.display = "none";
    });

    

}

if (document.querySelector('#formaddstatus') != undefined){
    let formAddStatus = document.querySelector('#formaddstatus');

    if (document.querySelector('#addstatus') != undefined){
        document.querySelector("#addstatus").addEventListener('click', function(){
            formAddStatus.style.display = 'block';
        });
    }

    if (document.querySelector('#cancelaaddstatus') != undefined){
        document.querySelector("#cancelaaddstatus").addEventListener('click', function(){
            formAddStatus.style.display = 'none';
        });
    }

}

if (document.querySelector("#formfinalizareq") !== undefined){


    if (document.querySelector("#formfinalizareq") != null){

        document.querySelector("#formfinalizareq").addEventListener('submit', function(event){
            // console.log('CLICA DELETE')
            let deleta = confirm("Tem certeza que deseja finalizar o requerimento?\nApós finalizar, não será mais possível editá-lo.")

            if (!deleta) event.preventDefault();

        });
    }
}

if (document.querySelector("#formcancelareq") !== undefined){

    if (document.querySelector("#formcancelareq") != null){
        document.querySelector("#formcancelareq").addEventListener('submit', function(event){
            // console.log('CLICA DELETE')
            let cancelamento = confirm("Tem certeza que deseja cancelar o requerimento?")

            if (!cancelamento) event.preventDefault();

        });
    }
}