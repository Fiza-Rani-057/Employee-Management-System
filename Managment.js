const addEmployeeBtn = document.getElementById('add-employee-btn');
const addEmployeeModal = document.getElementById('add-employee-modal');

addEmployeeBtn.addEventListener("click", function () {
    addEmployeeModal.classList.add("active");
});

const cancelAddEmployee = document.getElementById('cancel-add-employee');

cancelAddEmployee.addEventListener('click', () => {
    addEmployeeModal.classList.remove('active');
});

const employeeForm = document.querySelector('.add-employee-form');

employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstname = document.getElementById('first-name').value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    console.log(firstname);
    console.log(lastName);
    console.log(email);
    console.log(phone);
});


