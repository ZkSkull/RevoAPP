import { authenticate, register } from '../api.js';
const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
  let errors = [];
  let isSuccess = false;

  if (firstname_input) {
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    if (errors.length === 0) {
      try {
        await register({
          name: firstname_input.value,
          email: email_input.value,
          password: password_input.value
        });
        isSuccess = true;
      } catch (error) {
        errors.push(error.message);
      }
    }
  } else {
    errors = getLoginFormErrors(email_input.value, password_input.value);
    if (errors.length === 0) {
      try {
        await authenticate({
          email: email_input.value,
          password: password_input.value
        });
        isSuccess = true;
      } catch (error) {
        errors.push(error.message);
      }
    }
  }

  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  } else if (isSuccess) {
    window.location.href = '/';
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = []

  if (firstname === '' || firstname == null) {
    errors.push('Nome é obrigatório')
    firstname_input.parentElement.classList.add('Incorreta')
  }
  if (email === '' || email == null) {
    errors.push('Email é obrigatório')
    email_input.parentElement.classList.add('Incorreta')
  }
  if (password === '' || password == null) {
    errors.push('Senha é obrigatória')
    password_input.parentElement.classList.add('Incorreta')
  }
  if (password.length < 8) {
    errors.push('Senha deve ter pelo menos 8 caracteres')
    password_input.parentElement.classList.add('Incorreta')
  }
  if (password !== repeatPassword) {
    errors.push('Senha não corresponde à senha repetida')
    password_input.parentElement.classList.add('Incorreta')
    repeat_password_input.parentElement.classList.add('Incorreta')
  }


  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = []

  if (email === '' || email == null) {
    errors.push('Email é obrigatório')
    email_input.parentElement.classList.add('Incorreto')
  }
  if (password === '' || password == null) {
    errors.push('Senha é obrigatória')
    password_input.parentElement.classList.add('Incorreta')
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('Incorreto')) {
      input.parentElement.classList.remove('Incorreto')
      error_message.innerText = ''
    }
  })
})

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Aqui você pode adicionar uma validação, se quiser
    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("password-input").value;

    if (email && senha) {
      // Se tudo estiver preenchido, redireciona para index.html
      window.location.href = "index.html";
    } else {
      // Se estiver faltando algo, mostra uma mensagem de erro
      document.getElementById("error-message").textContent = "Preencha todos os campos.";
    }
  });
});
