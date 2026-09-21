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
        rowToDelete.remove();
        totalEmployee.textContent = employeesTable.children.length;

        let activeCount = 0;

        for (let i = 0; i < employeesTable.children.length; i++) {
            if (employeesTable.children[i].cells[6].textContent.toLowerCase() === 'active') {
                activeCount++;
            }
        }

        activeEmployees.textContent = activeCount;
        rowToDelete = null;
        rowToEdit = null;
    }
    let salaryToDelete = null;

    if (positionToDelete) {
        positionToDelete.remove();
        totalPositions.textContent = positionsTable.children.length;
        positionToDelete = null;
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

    if (messageToDelete) {
        messageToDelete.remove();
        messageToDelete = null;
    }

    if (performanceToDelete) {
        performanceToDelete.remove();
        performanceToDelete = null;
    }
    if (salaryToDelete) {
    salaryToDelete.remove();
    salaryToDelete = null;
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

// ======================== Department ==========================

const addDepartmentsBtn = document.querySelector('#add-department-btn');
const departmentModal = document.getElementById('department-modal');
const departmentForm = document.getElementById('department-form');
const departmentTable = document.getElementById('department-table').getElementsByTagName('tbody')[0];
const totalDepartments = document.getElementById('total-departments');

let departmentToDelete = null;
let departmentToEdit = null;

// Add Department Button
addDepartmentsBtn.addEventListener('click', () => {
    departmentForm.reset();
    departmentToEdit = null;
    departmentModal.classList.add('active');

});

// Add / Edit Department
departmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const departmentName = document.getElementById('department-name').value;
    const manager = document.getElementById('department-manager').value;
    const budget = document.getElementById('department-budget').value;
    // Edit Department
    if (departmentToEdit) {

        departmentToEdit.cells[1].textContent = departmentName;
        departmentToEdit.cells[2].textContent = manager || 'Not Assigned';
        departmentToEdit.cells[3].textContent = budget;
        departmentToEdit = null;

    }
    // Add Department
    else {
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
        `;
        departmentTable.appendChild(deptRow);
    }
    totalDepartments.textContent = departmentTable.children.length;
    departmentForm.reset();
    departmentModal.classList.remove('active');

});

// Edit / Delete Department
departmentTable.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) {
        return;
    }
    const row = button.parentElement.parentElement;
    // Delete Department
    if (button.classList.contains('delete-btn')) {
        departmentToDelete = row;
        confirmationTitle.textContent = 'Delete Department';
        confirmationMessage.textContent =
            'Are you sure you want to delete ' +
            row.cells[1].textContent +
            '?';
       confirmationModal.classList.add('active');
    }
    // Edit Department
    if (button.classList.contains('edit-btn')) {
        departmentToEdit = row;
        document.getElementById('department-name').value =
            row.cells[1].textContent;
        document.getElementById('department-manager').value =
            row.cells[2].textContent;
        document.getElementById('department-budget').value =
            row.cells[3].textContent;
        departmentModal.classList.add('active');
    }

});
// Cancel Department
const cancelDepartment = document.querySelector('#cancel-department');

cancelDepartment.addEventListener('click', () => {

    departmentForm.reset();
    departmentToEdit = null;
    departmentModal.classList.remove('active');

});


// Close Department Modal
const closeDepartment = departmentModal.querySelector('.close-btn');

closeDepartment.addEventListener('click', () => {

    departmentForm.reset();
    departmentToEdit = null;
    departmentModal.classList.remove('active');

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
        totalEmployee.textContent = employeesTable.children.length;
        rowToDelete = null;
    }

    // Delete Department
    if (departmentToDelete) {
        departmentToDelete.remove();
        totalDepartments.textContent = departmentTable.children.length;
        departmentToDelete = null;
    }

    // Delete Position
    if (positionToDelete) {
        positionToDelete.remove();
        totalPositions.textContent = positionsTable.children.length;
        positionToDelete = null;
    }

    // Delete Salary
    if (salaryToDelete) {
        salaryToDelete.remove();
        salaryToDelete = null;
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
// ======================== Payroll ==========================

const addSalaryBtn = document.getElementById('add-salary-btn');
const salaryModal = document.getElementById('salary-modal');
const salaryForm = document.getElementById('salary-form');
const salariesTable = document.getElementById('salaries-table').getElementsByTagName('tbody')[0];

let salaryToDelete = null;

// Add Salary
addSalaryBtn.addEventListener('click', function () {
    salaryForm.reset();
    const salaryEmployee = document.getElementById('salary-employee');
    salaryEmployee.innerHTML = `<option value="">Select Employee</option>`;

    // Employees dropdown fill
    for (let i = 0; i < employeesTable.children.length; i++) {
        const employeeName = employeesTable.children[i].cells[1].textContent;
        const option = document.createElement('option');
        option.value = employeeName;
        option.textContent = employeeName;
        salaryEmployee.appendChild(option);
    }

    salaryModal.classList.add('active');
});

// Save Salary
salaryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const employee = document.getElementById('salary-employee').value;
    const basicSalary = document.getElementById('salary-basic').value;
    const month = document.getElementById('salary-month').value;
    const allowances = document.getElementById('salary-allowances').value || 0;
    const deductions = document.getElementById('salary-deductions').value || 0;
    const status = document.getElementById('salary-status').value;

    // Employee ki Position find karo
    let position = "";
    for (let i = 0; i < employeesTable.children.length; i++) {
        if (employeesTable.children[i].cells[1].textContent === employee) {
            position = employeesTable.children[i].cells[3].textContent;
            break;
        }
    }

    // Net Salary
    const netSalary = Number(basicSalary) + Number(allowances) - Number(deductions);

    // New Row
    const salaryRow = document.createElement('tr');
    salaryRow.innerHTML = `
        <td>${salariesTable.children.length + 1}</td>
        <td>${employee}</td>
        <td>${position}</td>
        <td>${basicSalary}</td>
        <td>${allowances}</td>
        <td>${deductions}</td>
        <td>${netSalary}</td>
        <td>${month}</td>
        <td>${status}</td>
        <td>
            <button type="button" class="action-btn delete-salary-btn">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    salariesTable.appendChild(salaryRow);
    salaryForm.reset();
    salaryModal.classList.remove('active');
});

// Cancel Salary
const cancelSalary = document.getElementById('cancel-salary');
cancelSalary.addEventListener('click', function () {
    salaryForm.reset();
    salaryModal.classList.remove('active');
});

// Close Salary Modal
const closeSalary = salaryModal.querySelector('.close-btn');
closeSalary.addEventListener('click', function () {
    salaryForm.reset();
    salaryModal.classList.remove('active');
});

// Delete Salary
salariesTable.addEventListener('click', function (e) {
    const button = e.target.closest('button');
    if (!button) {
        return;
    }

    if (button.classList.contains('delete-salary-btn')) {
        salaryToDelete = button.parentElement.parentElement;
        confirmationTitle.textContent = 'Delete Salary';
        confirmationMessage.textContent = 'Are you sure you want to delete this salary?';
        confirmationModal.classList.add('active');
    }
});

 // ======================== Reports ==========================

const reportType = document.getElementById('report-type');
const generateReport = document.getElementById('generate-report');

let reportChart = null;

generateReport.addEventListener('click', function () {
    const selectedReport = reportType.value;

    // Agar pehle chart bana hua hai to remove karo
    if (reportChart) {
        reportChart.destroy();
    }

    // Department Distribution
    if (selectedReport === 'department-distribution') {
        reportChart = new Chart(
            document.getElementById('report-chart'),
            {
                type: 'bar',
                data: {
                    labels: ['IT', 'HR', 'Finance'],
                    datasets: [{
                        label: 'Employees',
                        data: [
                            countDepartment('IT'),
                            countDepartment('HR'),
                            countDepartment('Finance')
                        ]
                    }]
                },
                options: {
                    responsive: true
                }
            }
        );
    }

    // Salary Distribution
    if (selectedReport === 'salary-distribution') {
        reportChart = new Chart(
            document.getElementById('report-chart'),
            {
                type: 'bar',
                data: {
                    labels: ['Employees'],
                    datasets: [{
                        label: 'Salary',
                        data: [
                            getTotalSalary()
                        ]
                    }]
                },
                options: {
                    responsive: true
                }
            }
        );
    }

    // Hiring Trends
    if (selectedReport === 'hiring-trends') {
        reportChart = new Chart(
            document.getElementById('report-chart'),
            {
                type: 'line',
                data: {
                    labels: ['Employees'],
                    datasets: [{
                        label: 'Total Employees',
                        data: [
                            employeesTable.children.length
                        ]
                    }]
                },
                options: {
                    responsive: true
                }
            }
        );
    }

    // Attrition Rate
    if (selectedReport === 'attrition-rate') {
        let terminated = 0;
        for (let i = 0; i < employeesTable.children.length; i++) {
            if (employeesTable.children[i].cells[6].textContent.toLowerCase() === 'terminated') {
                terminated++;
            }
        }

        reportChart = new Chart(
            document.getElementById('report-chart'),
            {
                type: 'doughnut',
                data: {
                    labels: ['Active', 'Terminated'],
                    datasets: [{
                        data: [
                            employeesTable.children.length - terminated,
                            terminated
                        ]
                    }]
                },
                options: {
                    responsive: true
                }
            }
        );
    }

    // Leave Analysis
    if (selectedReport === 'leave-analysis') {
        let pending = 0;
        let approved = 0;
        let rejected = 0;

        for (let i = 0; i < leavesTable.children.length; i++) {
            const status = leavesTable.children[i].cells[7].textContent.toLowerCase();
            if (status === 'pending') {
                pending++;
            }
            if (status === 'approved') {
                approved++;
            }
            if (status === 'rejected') {
                rejected++;
            }
        }

        reportChart = new Chart(
            document.getElementById('report-chart'),
            {
                type: 'doughnut',
                data: {
                    labels: ['Pending', 'Approved', 'Rejected'],
                    datasets: [{
                        data: [
                            pending,
                            approved,
                            rejected
                        ]
                    }]
                },
                options: {
                    responsive: true
                }
            }
        );
    }
});

// Count employees by department
function countDepartment(department) {
    let count = 0;
    for (let i = 0; i < employeesTable.children.length; i++) {
        if (employeesTable.children[i].cells[2].textContent === department) {
            count++;
        }
    }
    return count;
}

// Calculate total salary
function getTotalSalary() {
    let total = 0;
    for (let i = 0; i < salariesTable.children.length; i++) {
        total += Number(salariesTable.children[i].cells[6].textContent);
    }
    return total;
}

// ======================== Calendar ==========================

const addCalendarEvent = document.getElementById('add-calendar-event');
const calendarModal = document.getElementById('calendar-modal');
const calendarForm = document.getElementById('calendar-form');
const calendarTable = document.getElementById('calendar-table').getElementsByTagName('tbody')[0];

// Add Event Button
addCalendarEvent.addEventListener('click', function () {
    calendarForm.reset();
    calendarModal.classList.add('active');
});

// Save Event
calendarForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const date = document.getElementById('calendar-date').value;
    const eventName = document.getElementById('calendar-event').value;
    const time = document.getElementById('calendar-time').value;
    const location = document.getElementById('calendar-location').value;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${date}</td>
        <td>${eventName}</td>
        <td>${time}</td>
        <td>${location}</td>
        <td>
            <button type="button" class="action-btn delete-calendar-btn">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    calendarTable.appendChild(row);
    calendarForm.reset();
    calendarModal.classList.remove('active');
});

// Cancel
const cancelCalendar = document.getElementById('cancel-calendar');
cancelCalendar.addEventListener('click', function () {
    calendarForm.reset();
    calendarModal.classList.remove('active');
});

// Close
const closeCalendar = calendarModal.querySelector('.close-btn');
closeCalendar.addEventListener('click', function () {
    calendarForm.reset();
    calendarModal.classList.remove('active');
});

  // Delete Calendar Event

calendarTable.addEventListener('click', function (e) {
    const button = e.target.closest('button');

    if (!button) {
        return;
    }

    if (button.classList.contains('delete-calendar-btn')) {
        rowToDelete = button.closest('tr');

        confirmationTitle.textContent = 'Delete Event';
        confirmationMessage.textContent = 'Are you sure you want to delete this event?';

        confirmationModal.classList.add('active');
    }
});

// ======================== Performance ==========================

const addPerformanceBtn = document.getElementById('add-performance-btn');
const performanceModal = document.getElementById('performance-modal');
const performanceForm = document.getElementById('performance-form');
const performanceTable = document
    .getElementById('performance-table')
    .getElementsByTagName('tbody')[0];

let performanceToDelete = null;

addPerformanceBtn.addEventListener('click', function () {
    performanceForm.reset();
    const performanceEmployee =
        document.getElementById('performance-employee');

    performanceEmployee.innerHTML =
        `<option value="">Select Employee</option>`;

    for (let i = 0; i < employeesTable.children.length; i++) {
        const employeeName =
            employeesTable.children[i].cells[1].textContent;
        const option = document.createElement('option');

        option.value = employeeName;
        option.textContent = employeeName;

        performanceEmployee.appendChild(option);
    }

    performanceModal.classList.add('active');
});

performanceForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const employee =
        document.getElementById('performance-employee').value;
    const performance =
        document.getElementById('performance-rating').value;
    const status =
        document.getElementById('performance-status').value;

    let department = "";

    for (let i = 0; i < employeesTable.children.length; i++) {
        if (
            employeesTable.children[i].cells[1].textContent
            === employee
        ) {
            department =
                employeesTable.children[i].cells[2].textContent;
            break;
        }
    }

    const performanceRow = document.createElement('tr');

    performanceRow.innerHTML = `
        <td>${performanceTable.children.length + 1}</td>
        <td>${employee}</td>
        <td>${department}</td>
        <td>${performance}</td>
        <td>${status}</td>
        <td>
            <button type="button"
                class="action-btn delete-performance-btn">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    performanceTable.appendChild(performanceRow);

    performanceForm.reset();
    performanceModal.classList.remove('active');
});

const cancelPerformance =
    document.getElementById('cancel-performance');

cancelPerformance.addEventListener('click', function () {
    performanceForm.reset();
    performanceModal.classList.remove('active');
});

const closePerformance =
    performanceModal.querySelector('.close-btn');

closePerformance.addEventListener('click', function () {
    performanceForm.reset();
    performanceModal.classList.remove('active');
});

performanceTable.addEventListener('click', function (e) {
    const button = e.target.closest('button');

    if (!button) {
        return;
    }

    if (button.classList.contains('delete-performance-btn')) {
        performanceToDelete =
            button.parentElement.parentElement;

        confirmationTitle.textContent = 'Delete Performance';
        confirmationMessage.textContent =
            'Are you sure you want to delete this performance?';

        confirmationModal.classList.add('active');
    }
});
// ======================== Messages ==========================

const newMessageBtn = document.getElementById('new-message-btn');
const messageModal = document.getElementById('message-modal');
const messageForm = document.getElementById('message-form');
const messagesTable = document
    .getElementById('messages-table')
    .getElementsByTagName('tbody')[0];

let messageToDelete = null;

newMessageBtn.addEventListener('click', function () {
    messageForm.reset();
    messageModal.classList.add('active');
});

messageForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const sender = document.getElementById('message-sender').value;
    const message = document.getElementById('message-text').value;
    const status = document.getElementById('message-status').value;
    const date = new Date().toLocaleDateString();

    const messageRow = document.createElement('tr');

    messageRow.innerHTML = `
        <td>${messagesTable.children.length + 1}</td>
        <td>${sender}</td>
        <td>${message}</td>
        <td>${date}</td>
        <td>${status}</td>
        <td>
            <button type="button"
                class="action-btn delete-message-btn">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    messagesTable.appendChild(messageRow);

    messageForm.reset();
    messageModal.classList.remove('active');
});

const cancelMessage = document.getElementById('cancel-message');

cancelMessage.addEventListener('click', function () {
    messageForm.reset();
    messageModal.classList.remove('active');
});

const closeMessage = messageModal.querySelector('.close-btn');

closeMessage.addEventListener('click', function () {
    messageForm.reset();
    messageModal.classList.remove('active');
});

messagesTable.addEventListener('click', function (e) {
    const button = e.target.closest('button');

    if (!button) {
        return;
    }

    if (button.classList.contains('delete-message-btn')) {
        messageToDelete = button.parentElement.parentElement;

        confirmationTitle.textContent = 'Delete Message';
        confirmationMessage.textContent =
            'Are you sure you want to delete this message?';

        confirmationModal.classList.add('active');
    }
});