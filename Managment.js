const addEmployeeBtn = document.getElementById('add-employee-btn');
const addEmployeeModal = document.getElementById('add-employee-modal');

addEmployeeBtn.addEventListener("click", function () {
    addEmployeeModal.classList.add("active");
});

const cancelAddEmployee = document.getElementById('cancel-add-employee');

cancelAddEmployee.addEventListener('click', function () {
    addEmployeeModal.classList.remove('active');
});

const employeeForm = document.querySelector('.add-employee-form');

employeeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstname = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const department = document.getElementById('department').value;
    const position = document.getElementById('position').value;
    const hireDate = document.getElementById('hire-date').value;
    const salary = document.getElementById('salary').value;
    const status = document.getElementById('status').value;

    const tablebody = document.querySelector('#employees-table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>1</td>
        <td>${firstname} ${lastName}</td>
        <td>${department}</td>
        <td>${position}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${status}</td>
        <td>
            <button class="action-btn">Edit</button>
            <button class="btn-danger">Delete</button>
        </td>
    `;

    tablebody.appendChild(row);

    employeeForm.reset();
    addEmployeeModal.classList.remove('active');
});

