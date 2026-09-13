// Sidebar

const sidebarItems = document.querySelectorAll(".sidebar li[data-section]");
const sections = document.querySelectorAll("main section");

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
        rowToDelete = null;
        rowToEdit = null;
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

const themeToggle = document.querySelector('#theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

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

