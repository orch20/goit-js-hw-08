const refs = {
  form: document.querySelector('.feedback-form'),
};
const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', emailAndMessageValue);
refs.form.addEventListener('submit', onFormSubmit);

let formTextContent = {};
// console.log(formTextContent);

function emailAndMessageValue(e) {
  formTextContent[e.target.name] = e.target.value;

  localStorage.setItem('STORAGE_KEY', JSON.stringify(formTextContent));
}

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  localStorage.removeItem('STORAGE_KEY');
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
