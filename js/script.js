
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    
    document.body.className = '';
    document.body.classList.add(`theme-${btn.dataset.theme}`);
  });
});

document.getElementById('menu-toggle').addEventListener('click', () => {
  const menuList = document.querySelector('#main-menu ul');
  menuList.classList.toggle('active'); 
});

document.querySelectorAll('#main-menu a').forEach(link => {
  link.addEventListener('click', () => {
    const menuList = document.querySelector('#main-menu ul');
    if (menuList.classList.contains('active')) {
      menuList.classList.remove('active');
    }
  });
});


let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides(n = slideIndex) {

  if (n >= slides.length) {
    slideIndex = 0;
  } else if (n < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex = n;
  }

  slides.forEach(s => s.classList.remove('active')); 
  slides[slideIndex].classList.add('active'); 
}

function plusSlides(n) {
  showSlides(slideIndex + n);
  resetTimer(); 
}

let slideshowTimer = setInterval(() => showSlides(slideIndex + 1), 5000); 
function resetTimer() {
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(() => showSlides(slideIndex + 1), 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  showSlides(0); 
});



document.getElementById('formCadastro').addEventListener('submit', function (e) {
  e.preventDefault(); 
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const cep = document.getElementById('cep').value.trim();
  const alertaCEP = document.getElementById('alerta-cep');

  
  alertaCEP.textContent = '';
  alertaCEP.classList.remove('success', 'error');

  if (!nome || !email || !senha || !cep) {
    alertaCEP.textContent = "Por favor, preencha todos os campos.";
    alertaCEP.classList.add('error');
    return;
  }

  
  const cepRegex = /^\d{5}-?\d{3}$/;
  if (!cepRegex.test(cep)) {
    alertaCEP.textContent = "CEP inválido. Use o formato XXXXX-XXX ou XXXXXXXX.";
    alertaCEP.classList.add('error');
    return;
  }

  
  if (cep.startsWith("01") || cep.startsWith("02") || cep.startsWith("03")) { // CEPs fictícios de risco
    alertaCEP.textContent = "⚠️ Alerta: Risco moderado a alto de enchente para sua região! Fique atento.";
    alertaCEP.classList.add('error');
  } else {
    alertaCEP.textContent = "✅ Cadastro realizado com sucesso! Você receberá nossos alertas.";
    alertaCEP.classList.add('success');
  }

  
  this.reset();
});



document.getElementById('formNoticia').addEventListener('submit', function (e) {
  e.preventDefault();
  const titulo = document.getElementById('titulo-noticia').value.trim();
  const texto = document.getElementById('texto-noticia').value.trim();

  if (!titulo || !texto) {
    alert("Por favor, preencha o título e o texto da notícia.");
    return;
  }

  const li = document.createElement('li');
  
  li.innerHTML = `<strong>${sanitizeHTML(titulo)}</strong>: ${sanitizeHTML(texto)}`;
  document.getElementById('lista-noticias').prepend(li); 
  this.reset(); 

  
  function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
});


let votosSim = 0;
let votosNao = 0;

document.getElementById('formEnquete').addEventListener('submit', function (e) {
  e.preventDefault();
  const resposta = document.querySelector('input[name="enquete"]:checked');
  const resultado = document.getElementById('resultado-enquete');

  if (!resposta) {
    resultado.textContent = "Por favor, selecione uma opção antes de votar.";
    return;
  }

  if (resposta.value === "sim") {
    votosSim++;
  } else {
    votosNao++;
  }

  resultado.textContent = `Resultado parcial: Sim (${votosSim}) | Não (${votosNao})`;
  this.reset(); 
});



const perguntas = [
  { q: "Enchente ocorre só em áreas rurais?", a: "Não" },
  { q: "É seguro dirigir em ruas alagadas?", a: "Não" },
  { q: "Ter um plano de evacuação é importante?", a: "Sim" },
  { q: "Deve-se evitar contato com a água da enchente?", a: "Sim" },
  { q: "Aplicativos de alerta são inúteis?", a: "Não" },
  { q: "A previsão do tempo ajuda na prevenção?", a: "Sim" },
  { q: "Pisar em bueiro aberto ou valas é seguro?", a: "Não" },
  { q: "Animais de estimação devem ser incluídos nos planos de evacuação?", a: "Sim" },
  { q: "O risco de enchente existe apenas no verão?", a: "Não" },
  { q: "Informação e prevenção salvam vidas?", a: "Sim" }
];

const quizContainer = document.getElementById('quiz-container');
perguntas.forEach((p, i) => {
  const div = document.createElement('div');
  div.classList.add('quiz-question'); 
  div.innerHTML = `
    <p>${i + 1}. ${p.q}</p>
    <select id="q${i}" aria-label="Pergunta ${i + 1}">
      <option value="">Selecione...</option>
      <option value="Sim">Sim</option>
      <option value="Não">Não</option>
    </select>
  `;
  quizContainer.appendChild(div);
});

document.getElementById('quiz-submit').addEventListener('click', () => {
  let acertos = 0;
  let todasRespondidas = true;
  perguntas.forEach((p, i) => {
    const respostaSelecionada = document.getElementById(`q${i}`);
    if (respostaSelecionada.value === "") {
      todasRespondidas = false;
    }
    if (respostaSelecionada.value === p.a) {
      acertos++;
    }
  });

  const quizResult = document.getElementById('quiz-result');
  if (!todasRespondidas) {
    quizResult.textContent = "Por favor, responda a todas as perguntas para ver o resultado.";
    quizResult.style.color = '#dc3545'; //Vermelho para errado
  } else {
    quizResult.textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas.`;
    quizResult.style.color = '#28a745'; // Verde para sucesso
  }
});


window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollY = window.scrollY + 150; 

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`#main-menu a[href="#${id}"]`);

    if (link) { 
      if (scrollY >= top && scrollY < bottom) {
        
        document.querySelectorAll('#main-menu a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});