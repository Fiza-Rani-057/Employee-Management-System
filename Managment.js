// Sidebar

const sidebarItems = document.querySelectorAll(".sidebar li[data-section]");
const sections = document.querySelectorAll("main section");
const totalEmployee = document.querySelector('#total-employees');
const activeEmployees = document.querySelector('#active-employees');
const totalPositions = document.querySelector('#total-positions');

sidebarItems.forEach(function (item) {

    item.addEventListener("click", function () {
        // Sab items se active hatao
        sidebarItems.forEach(function (li) {
            li.classList.remove("active");
        });

        // Clicked item ko active karo
        item.classList.add("active");

        // Sab sections hide karo
        sections.forEach(function (section) {
            section.style.display = "none";
        });

        // Clicked item ka section show karo
        let id = item.getAttribute("data-section") + "-section";
        let section = document.getElementById(id);

        section.style.display = "block";
    });

});
//   Add employee 

const addEmployeeBtn = document.getElementById('add-employee-btn');
const addEmployeeModal = document.getElementById('add-employee-modal');

addEmployeeBtn.addEventListener('click', function () {
    employeeForm.reset();
    addEmployeeModal.classList.add('active');
});

const cancelAddEmployee = document.getElementById('cancel-add-employee');

cancelAddEmployee.addEventListener('click', function () {
    addEmployeeModal.classList.remove('active');
});

const employeeForm = document.getElementsByClassName('add-employee-form')[0];

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

    const employeesTable = document.getElementById('employees-table').getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');

    row.innerHTML = `<td>${employeesTable.children.length + 1}</td>
    <td>${firstname} ${lastName}</td>
    <td>${department}</td>
    <td>${position}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td>${status}</td>
    <td class="employee-actions">
    <button type="button" class="action-btn view-btn">
    <i class="fas fa-eye"></i>
    </button><button type="button" class="action-btn edit-btn">
    <i class="fas fa-pen"></i>
    </button><button type="button" class="action-btn delete-btn">
    <i class="fas fa-trash"></i></button></td>
    `;

    row.dataset.hireDate = hireDate;
    row.dataset.salary = salary;

    employeesTable.appendChild(row);
    totalEmployee.textContent = employeesTable.children.length;

    let activeCount = 0;
    for(let i = 0; i< employeesTable.children.length; i++){
         if (employeesTable.children[i].cells[6].textContent === 'active') {
        activeCount++;
    }
    activeEmployees.textContent = activeCount;
    }
    employeeForm.reset();
    addEmployeeModal.classList.remove('active');
});

const closeAddEmployee = document.getElementById('add-employee-modal').getElementsByClassName('close-btn')[0];

closeAddEmployee.addEventListener('click', function () {
    addEmployeeModal.classList.remove('active');
    employeeForm.reset();
});

const employeesTable = document.getElementById('employees-table').getElementsByTagName('tbody')[0];

const confirmationModal = document.getElementById('confirmation-modal');
const confirmationMessage = document.getElementById('confirmation-message');
const confirmationTitle = document.getElementById('confirmation-title');

// Temporarily employ row ko store kren ga 

let rowToDelete = null;
let rowToEdit = null;


//   Veiw Button 

employeesTable.addEventListener('click', function (e) {
    const button = e.target.closest('button');
    if (!button) return;
    const row = button.parentElement.parentElement;
    if (button.classList.contains('view-btn')) {
        const viewEmployeeModal = document.getElementById('view-employee-modal');

        document.getElementById('view-name').textContent = row.cells[1].textContent;
        document.getElementById('view-department').textContent = row.cells[2].textContent;
        document.getElementById('view-position').textContent = row.cells[3].textContent;
        document.getElementById('view-email').textContent = row.cells[4].textContent;
        document.getElementById('view-phone').textContent = row.cells[5].textContent;
        document.getElementById('view-status').textContent = row.cells[6].textContent;

        viewEmployeeModal.classList.add('active');
    }
    //    Edit Button 
    if (button.classList.contains('edit-btn')) {
        rowToEdit = row;

        const name = row.cells[1].textContent.split(' ');

        document.getElementById('edit-first-name').value = name[0] || '';
        document.getElementById('edit-last-name').value = name.slice(1).join(' ') || '';
        document.getElementById('edit-email').value = row.cells[4].textContent;
        document.getElementById('edit-phone').value = row.cells[5].textContent;
        document.getElementById('edit-department').value = row.cells[2].textContent;
        document.getElementById('edit-position').value = row.cells[3].textContent;
        document.getElementById('edit-hire-date').value = row.dataset.hireDate || '';
        document.getElementById('edit-salary').value = row.dataset.salary || '';
        document.getElementById('edit-status').value = row.cells[6].textContent;

        document.getElementById('edit-employee-modal').classList.add('active');
    }

    if (button.classList.contains('delete-btn')) {
        rowToDelete = row;

        confirmationMessage.textContent = 'Are you sure you want to delete '
            + row.cells[1].textContent + '?';

        confirmationModal.classList.add('active');
    }
});

const closeViewEmployee = document.getElementById('close-view-employee');
const closeViewBtn = document.getElementById('close-view-btn');

closeViewEmployee.addEventListener('click', function () {
    document.getElementById('view-employee-modal').classList.remove('active');
});

closeViewBtn.addEventListener('click', function () {
    document.getElementById('view-employee-modal').classList.remove('active');
});

const cancelConfirmation = document.getElementById('cancel-confirmation');

cancelConfirmation.addEventListener('click', function () {
    confirmationModal.classList.remove('active');
    rowToDelete = null;
});

const confirmAction = document.getElementById('confirm-action');

confirmAction.addEventListener('click', function () {
    if (rowToDelete) {
        totalEmployee.textContent = employeesTable.children.length;
        rowToDelete.remove();
        rowToDelete = null;
        rowToEdit = null;
    }
  if (positionToDelete) {

    positionToDelete.remove();
    totalPositions.textContent = positionsTable.children.length;
    positionToDelete = null;
    confirmationModal.classList.remove('active');
}
 if (leaveToDelete) {
    leaveToDelete.remove();

    let pendingCount = 0;
    for (let i = 0; i < leavesTable.children.length; i++) {
        if (leavesTable.children[i].cells[7].textContent.toLowerCase() === 'pending') {
            pendingCount++;
        }
    }

    pendingLeaves.textContent = pendingCount;
    leaveToDelete = null;
}

    confirmationModal.classList.remove('active');
});

const closeEditEmployee = document.getElementById('edit-employee-modal').getElementsByClassName('close-btn')[0];

closeEditEmployee.addEventListener('click', function () {
    document.getElementById('edit-employee-modal').classList.remove('active');
    rowToEdit = null;
});

const cancelEditEmployee = document.getElementById('cancel-edit-employee');

cancelEditEmployee.addEventListener('click', function () {
    document.getElementById('edit-employee-modal').classList.remove('active');
    document.getElementsByClassName('edit-employee-form')[0].reset();
    rowToEdit = null;
});

const editEmployeeForm = document.getElementsByClassName('edit-employee-form')[0];

editEmployeeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (rowToEdit) {
        rowToEdit.cells[1].textContent = document.getElementById('edit-first-name').value + ' ' + document.getElementById('edit-last-name').value;
        rowToEdit.cells[2].textContent = document.getElementById('edit-department').value;
        rowToEdit.cells[3].textContent = document.getElementById('edit-position').value;
        rowToEdit.cells[4].textContent = document.getElementById('edit-email').value;
        rowToEdit.cells[5].textContent = document.getElementById('edit-phone').value;
        rowToEdit.cells[6].textContent = document.getElementById('edit-status').value;
        rowToEdit.dataset.hireDate = document.getElementById('edit-hire-date').value;
        rowToEdit.dataset.salary = document.getElementById('edit-salary').value;
    }

    document.getElementById('edit-employee-modal').classList.remove('active');
    editEmployeeForm.reset();
    rowToEdit = null;
});

const deleteEmployee = document.getElementById('delete-employee');

deleteEmployee.addEventListener('click', function () {
    if (rowToEdit) {
        rowToDelete = rowToEdit;
        confirmationMessage.textContent = 'Are you sure you want to delete ' + rowToEdit.cells[1].textContent + '?';
        confirmationModal.classList.add('active');
        document.getElementById('edit-employee-modal').classList.remove('active');
    }
});



//  Themee Toggle 

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}
//    Charts 
document.addEventListener("DOMContentLoaded", function () {

    const productivityChart = document.getElementById("productivityChart");

    new Chart(productivityChart, {
        type: "bar",
        data: {
            labels: ["Engineering", "Sales", "Marketing", "HR", "Finance", "Support"],
            datasets: [{
                label: "Productivity",
                data: [85, 72, 68, 90, 65, 78],
                backgroundColor: "#8257e5",
                borderRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "#8b949e"
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#8b949e"
                    }
                }
            }
        }
    });


    const attendanceChart = document.getElementById("attendanceChart");

    new Chart(attendanceChart, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Attendance",
                data: [82, 88, 85, 91, 87, 94],
                borderColor: "#8257e5",
                backgroundColor: "rgba(130,87,229,.12)",
                fill: true,
                tension: .4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "#8b949e"
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#8b949e"
                    }
                }
            }
        }
    });


    const leaveChart = document.getElementById("leaveChart");

    new Chart(leaveChart, {
        type: "doughnut",
        data: {
            labels: ["Approved", "Pending", "Rejected"],
            datasets: [{
                data: [60, 25, 15],
                backgroundColor: [
                    "#8257e5",
                    "#39d353",
                    "#4ca1af"
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#8b949e",
                        padding: 15
                    }
                }
            }
        }
    });


    const performanceChart = document.getElementById("performanceChart");

    new Chart(performanceChart, {
        type: "bar",
        data: {
            labels: ["Excellent", "Good", "Average", "Needs Improvement"],
            datasets: [{
                label: "Employees",
                data: [35, 45, 15, 5],
                backgroundColor: "#8257e5",
                borderRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "#8b949e"
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#8b949e"
                    }
                }
            }
        }
    });

});


//  Add department

const addDepartmentsBtn = document.querySelector('#add-department-btn');
const departmentModal = document.getElementById('department-modal');
const departmentForm = document.getElementById('department-form');
const departmentTable = document.getElementById('department-table').getElementsByTagName('tbody')[0];
const totalDepartments = document.getElementById('total-departments');

let departmentToDelete = null;

addDepartmentsBtn.addEventListener('click', () => {
    departmentForm.reset();
    departmentModal.classList.add('active');
});

departmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const departmentName = document.getElementById('department-name').value;
    const manager = document.getElementById('department-manager').value;
    const budget = document.getElementById('department-budget').value;
    const deptRow = document.createElement('tr');

    deptRow.innerHTML = `
     <td>${departmentTable.children.length + 1}</td>
        <td>${departmentName}</td>
        <td>${manager || 'Not Assigned'}</td>
        <td>${budget}</td>
        <td>0</td>
        <td>
            <button type="button" class="action-btn edit-btn">
                <i class="fas fa-pen"></i>
            </button>
            <button type="button" class="action-btn delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `
    departmentTable.appendChild(deptRow);
    totalDepartments.textContent = departmentTable.children.length;

    departmentForm.reset();
    departmentModal.classList.remove('active');
});

departmentTable.addEventListener('click', (e) => {
    const button = e.target.closest('button');

    if (!button) {
        return;
    }
    const row = button.parentElement.parentElement;

    if (button.classList.contains('delete-btn')) {
        departmentToDelete = row;
        confirmationMessage.textContent =
            'Are you sure you want to delete ' + row.cells[1].textContent + '?';

        confirmationModal.classList.add('active');
    }
    if (button.classList.contains('edit-btn')) {
        document.getElementById('department-name').value = row.cells[1].textContent;
        document.getElementById('department-manager').value = row.cells[2].textContent;
        document.getElementById('department-budget').value = row.cells[3].textContent;

        departmentModal.classList.add('active');
    }

});
const cancelDepartment = document.querySelector('#cancel-department');

cancelDepartment.addEventListener('click', () => {
    departmentForm.reset();
    departmentModal.classList.remove('active');
});

const closeDepartment = departmentModal.querySelector('.close-btn');

closeDepartment.addEventListener('click', () => {
    departmentModal.classList.remove('active');
    departmentForm.reset();
});

const confirmDepartmentDelete = document.getElementById('confirm-action');
const cancelDepartmentDelete = document.getElementById('cancel-confirmation');

confirmDepartmentDelete.addEventListener('click', () => {
    if (departmentToDelete) {
        departmentToDelete.remove();
        departmentToDelete = null;
        totalDepartments.textContent = departmentTable.children.length;
        confirmationModal.classList.remove('active');
    }
});

cancelDepartmentDelete.addEventListener('click', function () {
    departmentToDelete = null;
    confirmationModal.classList.remove('active');
});

//  ==============Search=====================
const employeeSearch = document.querySelector('#search-input');

employeeSearch.addEventListener('input', () => {

    const searchValue = employeeSearch.value.toLowerCase();
    const rows = employeesTable.children;

    for (let i = 0; i < rows.length; i++) {

        const row = rows[i];

        const name = row.cells[1].textContent.toLowerCase();
        const department = row.cells[2].textContent.toLowerCase();
        const position = row.cells[3].textContent.toLowerCase();
        const email = row.cells[4].textContent.toLowerCase();

        if (
            name.includes(searchValue) ||
            department.includes(searchValue) ||
            position.includes(searchValue) ||
            email.includes(searchValue)
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
});
//  ======================== Positions ==========================
// Add Position

const addPositionBtn = document.getElementById('add-position-btn');
const positionModal = document.getElementById('position-modal');
const positionForm = document.getElementById('position-form');
const positionsTable = document.getElementById('positions-table').getElementsByTagName('tbody')[0];
const totalpositions = document.getElementById('total-positions');

let positionToEdit = null;
let positionToDelete = null;


// Add Position Button

addPositionBtn.addEventListener('click', function () {
    positionToEdit = null;
    positionForm.reset();
    positionModal.classList.add('active');

});
// Save Position

positionForm.addEventListener('submit', function (e) {

    e.preventDefault();
    const positionTitle = document.getElementById('position-title').value;
    const department = document.getElementById('position-department').value;
    const salary = document.getElementById('position-salary').value;

    // Edit Existing Position
    if (positionToEdit) {
        positionToEdit.cells[1].textContent = positionTitle;
        positionToEdit.cells[2].textContent = department;
        positionToEdit.cells[3].textContent = salary;

        positionToEdit = null;

    }

    // Add New Position

    else {

        const positionRow = document.createElement('tr');

        positionRow.innerHTML = `
            <td>${positionsTable.children.length + 1}</td>
            <td>${positionTitle}</td>
            <td>${department}</td>
            <td>${salary}</td>
            <td>0</td>
            <td>
                <button type="button" class="action-btn edit-position-btn">
                    <i class="fas fa-pen"></i>
                </button>

                <button type="button" class="action-btn delete-position-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        positionsTable.appendChild(positionRow);

    }


    totalPositions.textContent = positionsTable.children.length;

    positionForm.reset();

    positionModal.classList.remove('active');

});


// Edit and Delete Position

positionsTable.addEventListener('click', function (e) {

    const button = e.target.closest('button');

    if (!button) {
        return;
    }

    const row = button.parentElement.parentElement;


    // Edit Position

    if (button.classList.contains('edit-position-btn')) {

        positionToEdit = row;

        document.getElementById('position-title').value =
            row.cells[1].textContent;

        document.getElementById('position-department').value =
            row.cells[2].textContent;

        document.getElementById('position-salary').value =
            row.cells[3].textContent;

        positionModal.classList.add('active');

    }


    // Delete Position

    if (button.classList.contains('delete-position-btn')) {

        positionToDelete = row;

        confirmationTitle.textContent = 'Delete Position';
        confirmationMessage.textContent =
            'Are you sure you want to delete this position?';
        confirmationModal.classList.add('active');
    }

});
// Confirm Delete

confirmAction.addEventListener('click', function () {
    // Delete Employee
    if (rowToDelete) {
        rowToDelete.remove();
        totalEmployee.textContent =
            employeesTable.children.length;
        rowToDelete = null;

    }


    // Delete Department
    if (departmentToDelete) {
        departmentToDelete.remove();
        totalDepartments.textContent =
            departmentTable.children.length;
        departmentToDelete = null;
    }
    // Delete Position

    if (positionToDelete) {
        positionToDelete.remove();
        totalPositions.textContent =
            positionsTable.children.length;
        positionToDelete = null;
    }
    confirmationModal.classList.remove('active');

});

// Cancel Position

const cancelPosition = document.getElementById('cancel-position');
cancelPosition.addEventListener('click', function () {
    positionForm.reset();
    positionToEdit = null;
    positionModal.classList.remove('active');
});
// Close Position Modal

const closePosition =
    positionModal.querySelector('.close-btn');
closePosition.addEventListener('click', function () {
    positionForm.reset();
    positionToEdit = null;
    positionModal.classList.remove('active');

});

// ======================== Leave ==========================

const addLeaveBtn = document.getElementById('add-leave-btn');
const leaveModal = document.getElementById('leave-modal');
const leaveForm = document.getElementById('leave-form');
const leavesTable = document.getElementById('leaves-table').getElementsByTagName('tbody')[0];
const pendingLeaves = document.getElementById('pending-leaves');

// Add Leave Button
addLeaveBtn.addEventListener('click', function () {
    leaveForm.reset();
    const leaveEmployee = document.getElementById('leave-employee');
    leaveEmployee.innerHTML = `<option value="">Select Employee</option>`;

    for (let i = 0; i < employeesTable.children.length; i++) {
        const employeeName = employeesTable.children[i].cells[1].textContent;
        const option = document.createElement('option');
        option.value = employeeName;
        option.textContent = employeeName;
        leaveEmployee.appendChild(option);
    }
    leaveModal.classList.add('active');
});

// Save Leave
leaveForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const employee = document.getElementById('leave-employee').value;
    const start = document.getElementById('leave-start').value;
    const end = document.getElementById('leave-end').value;
    const type = document.getElementById('leave-type').value;
    const status = document.getElementById('leave-status').value;
    const reason = document.getElementById('leave-reason').value;

    // Calculate Days
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDifference = endDate - startDate;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;

    // Create Row
    const leaveRow = document.createElement('tr');
    leaveRow.innerHTML = `
        <td>${leavesTable.children.length + 1}</td>
        <td>${employee}</td>
        <td>${type}</td>
        <td>${start}</td>
        <td>${end}</td>
        <td>${days}</td>
        <td>${reason}</td>
        <td>${status}</td>
        <td>
            <button type="button" class="action-btn delete-leave-btn">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    leavesTable.appendChild(leaveRow);

    // Pending Leaves Count
    let pendingCount = 0;
    for (let i = 0; i < leavesTable.children.length; i++) {
        if (leavesTable.children[i].cells[7].textContent.toLowerCase() === 'pending') {
            pendingCount++;
        }
    }
    pendingLeaves.textContent = pendingCount;

    leaveForm.reset();
    leaveModal.classList.remove('active');
});

// Cancel Leave
const cancelLeave = document.getElementById('cancel-leave');
cancelLeave.addEventListener('click', function () {
    leaveForm.reset();
    leaveModal.classList.remove('active');
});

// Close Leave Modal
const closeLeave = leaveModal.querySelector('.close-btn');
closeLeave.addEventListener('click', function () {
    leaveForm.reset();
    leaveModal.classList.remove('active');
});

// Delete Leave
let leaveToDelete = null;

leavesTable.addEventListener('click', function (e) {
    const button = e.target.closest('button');
    if (!button) {
        return;
    }

    const row = button.parentElement.parentElement;

    if (button.classList.contains('delete-leave-btn')) {
        leaveToDelete = row;
        confirmationTitle.textContent = 'Delete Leave';
        confirmationMessage.textContent = 'Are you sure you want to delete this leave?';
        confirmationModal.classList.add('active');
    }
});