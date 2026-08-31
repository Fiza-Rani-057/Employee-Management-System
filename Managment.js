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
        <td class="employee-actions">
            <button type="button" class="action-btn view-btn">
                <i class="fas fa-eye"></i>
            </button>
            <button type="button" class="action-btn edit-btn">
                <i class="fas fa-pen"></i>
            </button>
            <button type="button" class="action-btn delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    tablebody.appendChild(row);

    employeeForm.reset();
    addEmployeeModal.classList.remove('active');
});

const employeesTable = document.querySelector('#employees-table tbody');
const confirmationModal = document.getElementById('confirmation-modal');
const confirmationMessage = document.getElementById('confirmation-message');
const cancelConfirmation = document.getElementById('cancel-confirmation');
const confirmAction = document.getElementById('confirm-action');

let rowToDelete = null;
employeesTable.addEventListener('click', function (e) {
    // VIEW
    const viewButton = e.target.closest('.view-btn');
    if (viewButton) {
        const row = viewButton.closest('tr');
        const name = row.cells[1].textContent;
        const department = row.cells[2].textContent;
        const position = row.cells[3].textContent;
        const email = row.cells[4].textContent;
        const phone = row.cells[5].textContent;
        const status = row.cells[6].textContent;

        alert(
            "Employee Details\n\n" +
            "Name: " + name + "\n" +
            "Department: " + department + "\n" +
            "Position: " + position + "\n" +
            "Email: " + email + "\n" +
            "Phone: " + phone + "\n" +
            "Status: " + status
        );
    }
    // DELETE
    const deleteButton = e.target.closest('.delete-btn');
    if (deleteButton) {
        rowToDelete = deleteButton.closest('tr');
        const employeeName = rowToDelete.cells[1].textContent;
        confirmationMessage.textContent =
            "Are you sure you want to delete " + employeeName + "?";
        confirmationModal.classList.add('active');
    }
});
// CANCEL DELETE
cancelConfirmation.addEventListener('click', function () {
    confirmationModal.classList.remove('active');
    rowToDelete = null;
});


// CONFIRM DELETE
confirmAction.addEventListener('click', function () {
    if (rowToDelete) {
        rowToDelete.remove();
        rowToDelete = null;
    }
    confirmationModal.classList.remove('active');
});