document.addEventListener('DOMContentLoaded', () => {
    const email = document.getElementById('email');
    email.addEventListener('input', () => validateEmail(email));

    const submit = document.getElementById('registrationForm');
    submit.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailValid = validateEmail(email);
        const dobValid = validateDateOfBirth();

        if (emailValid && dobValid) {
            saveUserForm(e);
        }
    });

    function validateEmail(element) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(element.value)) {
            element.setCustomValidity("The Email is not in the correct format!");
            element.reportValidity();
            return false;
        } else {
            element.setCustomValidity('');
            return true;
        }
    }

function validateDateOfBirth() {
    const dobValue = document.getElementById('dob').value;

    if (!dobValue) {
        document.getElementById('dob').setCustomValidity("Please select a valid date");
        document.getElementById('dob').reportValidity();
        return false;
    }

    const dobParts = dobValue.split('-');
    const year = parseInt(dobParts[0], 10);
    const month = parseInt(dobParts[1], 10);
    const day = parseInt(dobParts[2], 10);

    if (isNaN(year) || isNaN(month) || isNaN(day) || year < 1968 || year > 2007) {
        document.getElementById('dob').setCustomValidity("Invalid Date. Please enter a valid date between 1968-01-01 and 2007-12-31");
        document.getElementById('dob').reportValidity();
        return false;
    }

    document.getElementById('dob').setCustomValidity("");
    return true;
}


    const retrieveEntries = () => {
        let entries = localStorage.getItem("user-entries");
        if (entries) {
            entries = JSON.parse(entries);
        } else {
            entries = [];
        }
        return entries;
    };

    const displayEntries = () => {
        const entries = retrieveEntries();
        const tableTitle = `<h2 class="text-2xl font-bold text-center mb-4">User-Entries</h2>`;

        const table = `<table class="table-auto w-full border-collapse text-sm">
            <thead>
                <tr class="bg-gray-200 text-xs">
                    <th class="px-2 py-1 border">Name</th>
                    <th class="px-2 py-1 border">Email</th>
                    <th class="px-2 py-1 border">Password</th>
                    <th class="px-2 py-1 border">Dob</th>
                    <th class="px-2 py-1 border">Accepted terms?</th>
                </tr>
            </thead>
            <tbody>
                ${entries.length > 0 ? entries.map((entry) => {
                    const nameCell = `<td class='border px-2 py-1 text-sm'>${entry.name}</td>`;
                    const emailCell = `<td class='border px-2 py-1 text-sm'>${entry.email}</td>`;
                    const passwordCell = `<td class='border px-2 py-1 text-sm'>${entry.password}</td>`;
                    const dobCell = `<td class='border px-2 py-1 text-sm'>${entry.dob}</td>`;
                    const acceptTermsCell = `<td class='border px-2 py-1 text-sm'>${entry.acceptedTermsAndconditions}</td>`;
                    return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
                }).join("\n") : "<tr><td colspan='5' class='text-center'>No entries yet!</td></tr>"}
            </tbody>
        </table>`;

        let details = document.getElementById("user-entries");
        details.innerHTML = tableTitle + table;
    };

    const saveUserForm = (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;

     
        const userEntries = retrieveEntries();

     
        const entry = {
            name,
            email,
            password,
            dob,
            acceptedTermsAndconditions
        };

   
        userEntries.push(entry);

        localStorage.setItem("user-entries", JSON.stringify(userEntries));

       
        displayEntries();
    };

  
    displayEntries();
});
