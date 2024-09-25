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
  let userForm = document.getElementById("registrationForm");

    const retrieveEntries = () => {
        let entries = localStorage.getItem("user-entries");
        if (entries) {
            entries = JSON.parse(entries);
        } else {
            entries = [];
        }
        console.log('Retrieved Entries:', entries);
        return entries;
    };
    const validateDateOfBirth = () => {
        const dobInput = document.getElementById("dob");
        const dobValue = dobInput.value;
    
        if (!dobValue) {
            dobInput.setCustomValidity("Date of birth is required.");
            dobInput.reportValidity();
            return false;
        }
    
        const yearOfBirth = new Date(dobValue).getFullYear(); // Extract the year from the date
    
        const minYear = 1969;
        const maxYear = 2006;
    
        if (yearOfBirth < minYear || yearOfBirth > maxYear) {
            dobInput.setCustomValidity(`Year of birth must be between ${minYear} and ${maxYear}.`);
            dobInput.reportValidity();
            return false;
        } else {
            dobInput.setCustomValidity('');
            return true;
        }
    };
    
    
    let userEntries = retrieveEntries();
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

        const entry = {
            name,
            email,
            password,
            dob,
            acceptedTermsAndconditions
        };

        console.log('New Entry:', entry);

        userEntries.push(entry);
        localStorage.setItem("user-entries", JSON.stringify(userEntries));

        displayEntries();
    };

    displayEntries();
});
