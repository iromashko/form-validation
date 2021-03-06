let form = document.querySelector('form');

form.onsubmit = sendData;

function sendData(e) {
  e.preventDefault();

  let formData = new FormData(form);

  let Params = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
      age: formData.get('age'),
      zip: formData.get('zip'),
      phone1: formData.get('phone1'),
      phone2: formData.get('phone2'),
      phone3: formData.get('phone3'),
    }),
    method: 'POST',
  };

  fetch('formdata', Params)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(`successful`);
        document.querySelector('.errorContainer').style.display = 'none';
        document.querySelector('.successContainer').style.display = 'block';
      } else {
        document.querySelector('.successContainer').style.display = 'none';
        let error = document.querySelector('.error');

        error.innerHTML = '';

        document.querySelector('.errorContainer').style.display = 'block';

        data.errors.forEach(function (err) {
          error.innerHTML += `<li>${err.msg}</li>`;
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
