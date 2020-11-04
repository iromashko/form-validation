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
      email: formData.get('email'),
    }),
    method: 'POST',
  };

  fetch('formdata', Params)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(`successful`);
      } else {
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
