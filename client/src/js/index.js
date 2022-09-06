import { initdb, getDb, postDb, deleteDb, editDb } from './database';
import { fetchCards } from './cards';
// import modules
import { toggleForm, clearForm } from './form';


// import css files
import '../css/index.css';

// importing bootstrap
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

// to insert images
window.addEventListener('load', function() {
    initdb();
    fetchCards();
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
    
});

    // Form functionality
    const form = document.getElementById("formToggle");
    const newContactButton = document.getElementById("new-contact");
    let submitBtnToUpdate = false;
    let profileId;

    newContactButton.addEventListener('click', event => {
        toggleForm()
    })

    form.addEventListener('submit', event => {
    // Handle data
        event.preventDefault();
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let profile = document.querySelector('input[type="radio"]:checked').value;

        // Post form data to IndexedDB OR Edit an existing card in IndexedDB
        if (submitBtnToUpdate == false) {
            postDb(name, email, phone, profile);
        } else {

            let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let profile = document.querySelector('input[type="radio"]:checked').value;

        // calls the editDB function passing in any values from the form element
        editDb(profileId, name, email, phone, profile);

        fetchCards();
        // Toggles the submit button back to POST functionality
        submitBtnToUpdate = false;
    }

    // Clear form
    clearForm();
    // Toggle form
    toggleForm();
    // Reload the DOM
    fetchCards();
});

// add delete card to the global scope so each card has access to it 
window.deleteCard = (e) => {
    // grabs the id from the button element attached to the contact card
    let id = parseInt(e.id);
    // delete the card
    deleteDb(id);
    // reload the dom
    fetchCards();
};

window.editCard= (e) => {
    // grab the id from the button element attached to the contact card 
    profileId = parseInt(e.dataset.id);

    // grabs information to pre-populate edit form
    let editName = e.dataset.name;
    let editEmail = e.dataset.email;
    let editPhone = e.dataset.phone;

    document.getElementById("name").value = editName;
    document.getElementById("email").value = editEmail;
    document.getElementById("phone").value = editPhone;

    form.style.display = "block";

    // toggles the submit button so that it now updates an existing contact
    submitBtnToUpdate = true;
};

if ('serviceWorker' in navigator) {
    // use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js');
    })
};
