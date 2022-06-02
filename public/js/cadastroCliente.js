if (document.querySelector('#formuser') != undefined){
    
    let form = document.getElementById('formuser');

    let nomeInput = document.getElementById("nome");
    let sobrenome = document.getElementById("sobrenome");
    let cpf = document.getElementById("cpf");

    let sucess = document.getElementById("sucesso-msg");


    form.addEventListener('submit', function (e) {
        function validar() {

            if (nomeInput.value == "") {
                alert("O campo nome deve ser preenchido")
                nome.style.border = "2px solid red"
                nome.style.backgroundColor = "#f5939362";

                return;
            }
            if (sobrenome.value == "") {
                alert("O campo sobrenome deve ser preenchido")
                sobrenome.style.border = "2px solid red"
                sobrenome.style.backgroundColor = "#f5939362";
                return;
            }

            if (cpf.value == "") {
                alert("O campo cpf deve ser preenchido")
                cpf.style.border = "2px solid red"
                cpf.style.backgroundColor = "#f5939362";
                return;
            }

            sucess.style.display = "initial";
        };
        e.preventDefault();
        validar()
    })
}












// if (document.querySelector('#formendereco') != undefined){
//     const formEndereco = document.querySelector('#formendereco');

//     document.querySelector('#btnaddendereco').addEventListener('click', function(event){
//         event.preventDefault();

//         const clone = formEndereco.cloneNode(true);

//         document.querySelector('#formendereco').appendChild(clone);
//     })

//     document.querySelector('#btndelendereco').addEventListener('click', function(event){
//         event.preventDefault();

//         const clone = formEndereco.cloneNode(true);

//         document.querySelector('#formendereco').appendChild(clone);


//     })



// }