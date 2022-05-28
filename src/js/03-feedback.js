import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(setEmailAndMessageValue, 500));
refs.form.addEventListener('submit', onFormSubmit);

let formTextContent = {};

function setEmailAndMessageValue(e) {
  formTextContent[e.target.name] = e.target.value;

  localStorage.setItem('STORAGE_KEY', JSON.stringify(formTextContent));
}

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  localStorage.removeItem('STORAGE_KEY');
  console.log(e.target.value);
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
