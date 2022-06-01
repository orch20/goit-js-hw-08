import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(setEmailAndMessageValue, 500));
refs.form.addEventListener('submit', onFormSubmit);
// refs.input.addEventListener('input', formValidation);

let formTextContent;

function setEmailAndMessageValue(e) {
  formTextContent[e.target.name] = e.target.value;

  localStorage.setItem('STORAGE_KEY', JSON.stringify(formTextContent));
}

function onFormSubmit(e) {
  e.preventDefault();
  formValidation(e);
  e.currentTarget.reset();
  localStorage.removeItem('STORAGE_KEY');
  formTextContent = {};
}

function formValidation() {
  if (!formTextContent['email'] || !formTextContent['message']) {
    alert('Fill form');
    // if (true) {
    //   validateEmail();
    // }
  } else {
    console.log(formTextContent);
  }
}

// function validateEmail(e) {
//   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (e.target.data.email.match(mailformat)) {
//     alert('Valid email address!');
//     document.form1.text1.focus();
//     return true;
//   } else {
//     alert('You have entered an invalid email address!');
//     document.form1.text1.focus();
//     return false;
//   }
// }

function getDataFromStarageToInput() {
  formTextContent = JSON.parse(localStorage.getItem('STORAGE_KEY'));
  if (formTextContent) {
    setDataFromLocalStorage(formTextContent);
  } else formTextContent = {};
}
getDataFromStarageToInput();

function setDataFromLocalStorage(formTextContent) {
  for (const key in formTextContent) {
    refs.form[key].value = formTextContent[key];
  }
}
