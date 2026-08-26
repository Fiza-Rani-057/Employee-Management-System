let email = document.getElementById('email');
let password = document.getElementById('password');
let login = document.getElementById('login');
let Form = document.querySelector('form');


 login.addEventListener('click', function (e) {
    e.preventDefault();

    let ValidEmail = "admin@gmail.com";
    let ValidPassword = "admin1234";
 
    if(email.value !== ValidEmail || password.value!== ValidPassword){
        alert('please Enter a valid password or email');
        return;
    }
        window.location.href = "Managment.html";
      
});
