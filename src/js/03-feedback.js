import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(setEmailAndMessageValue, 500));
refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', formValidation);

let formTextContent = {};

function formValidation(e) {
  // e.preventDefault();
  if (refs.input.value === '' || refs.input.value == null) {
    refs.input.setAttribute('placeholder', 'enter email');
    alert('enter email');
  }
}

function setEmailAndMessageValue(e) {
  formTextContent[e.target.name] = e.target.value;

  localStorage.setItem('STORAGE_KEY', JSON.stringify(formTextContent));
}

function onFormSubmit(e) {
  e.preventDefault();
  formValidation();
  e.currentTarget.reset();
  localStorage.removeItem('STORAGE_KEY');
  console.log(formTextContent);
}

function getDataFromStarageToInput() {
  const localData = JSON.parse(localStorage.getItem('STORAGE_KEY'));
  if (localData) {
    setDataFromLocalStorage(localData);
  }
}
getDataFromStarageToInput();

function setDataFromLocalStorage(localData) {
  console.log(localData);
  for (const key in localData) {
    refs.form[key].value = localData[key];
  }
}
