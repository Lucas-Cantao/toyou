const botoes = {
    sim: document.getElementById('sim'),
    nao: document.getElementById('nao')
}
botoes.nao.addEventListener('mouseenter', ()=>{
    botoes.nao.style.position = 'absolute'
    const top = Math.random() * (85 - 15) + 15;
    botoes.nao.style.top = `${Math.floor(top)}vh`
    const left = Math.random() * (85 - 15) + 15;
    botoes.nao.style.left = `${Math.floor(left)}vw`
})

const fotos = document.querySelector('.content') //
const inicio = document.getElementById('main')
const main = document.querySelector('.main')
const heart = document.querySelector('.heart')
const audioThoseEyes = document.getElementById('thoseEyes')
audioThoseEyes.volume = 0.05
const textoP = document.querySelector('.text')
fotos.children[8].style.filter = 'none'
fotos.children[8].style.scale = 1
alert(`Don't try to click on 'NÃO'... or try`)

const text = `

Amorzinho, antes de começar, <strong style='color: red; text-transform: uppercase;'>eu te amo</strong>

eu sei que você sabe disso, mas eu nunca vou cansar de dizer de novo, afinal

esperei muito ansiosamente para poder dizer isso toda hora.

Nos conhecer e dar uma chance pra nós foi a melhor coisa que fizemos,

como eu sempre digo, desde o inicio já sabia que ficariamos juntos,

mas pra te fazer pensar assim também precisei lutar pra te conquistar,

sempre fazendo de tudo por você para te mostrar que seu lugar é do meu lado,

que é comigo que você tem que planejar seu futuro,

que sou eu quem você tem que apresentar pra sua família,

que é comigo que você tem que planejar sua vida toda.

Eu já te disse, eu nunca vou sair do seu pé,

nunca vou deixar você ir embora, pode fazer o que quiser,

mas eu sempre vou estar contigo,

pois sabemos que é impossível um de nós esquecer do outro algum dia.

Tudo que já fizeram a gente passar até hoje,

tudo que já passamos só para termos uma noite juntos,

tudo que entregamos um ao outro por nos amarmos,

tudo isso mostra que somos um casal incrível e

que a única coisa que pode nos separar é a gente.

Eu quero você em toda minha vida, até eu morrer vou estar do seu lado,

minha vida já tá toda planejada, e adivinha, você está em cada mínimo detalhe,

se você decidir sair da minha vida algum dia ela acaba,

não tenho um segundo caminho e nem vou me preocupar com isso,

porque sei que vamos ficar juntos até o final.

Me mostra, me mostra quando você estiver disposta a viver comigo em uma casa nossa,

me mostra quando já estiver pronta pra investir comigo num lar pra gente,

me mostra e eu irei correr atrás de tudo para realizarmos isso,

você, mais do que ninguém, sabe o quanto eu quero acordar do seu lado todo dia e

depois de um tempo ter um 'mini nós' acordando com a gente.

`

let imageElementWidthAndGap = 0;
let currentTranslateX = 0; 

function calculateImageWidthAndGap() {
    if (fotos.children.length === 0) {
        imageElementWidthAndGap = 0;
        return;
    }
    const firstImage = fotos.children[0];
    imageElementWidthAndGap = firstImage.offsetWidth;

    if (fotos.children.length > 1) {
        const secondImage = fotos.children[1];
        const firstImageRect = firstImage.getBoundingClientRect();
        const secondImageRect = secondImage.getBoundingClientRect();
        if (firstImageRect.width > 0 && secondImageRect.width > 0) {
             imageElementWidthAndGap = secondImageRect.left - firstImageRect.left;
        }
    }
}

// --- Nova Função para Pré-carregar Imagens ---
function preloadCarouselImages() {
    const imageElements = fotos.querySelectorAll('img'); // Seleciona todas as tags <img> dentro do contêiner 'fotos'
    // console.log(`Pré-carregando ${imageElements.length} imagens...`); // Opcional: para depuração
    imageElements.forEach(imgTag => {
        const img = new Image(); // Cria um novo objeto Image em memória
        img.src = imgTag.src;   // Define o src, o que inicia o download pelo navegador
        
        // Opcional: handlers para saber quando carregou ou deu erro (para depuração)
        // img.onload = () => console.log(`Imagem pré-carregada: ${img.src}`);
        // img.onerror = () => console.error(`Erro ao pré-carregar imagem: ${img.src}`);
    });
}
// --- Fim da Nova Função ---


botoes.sim.addEventListener('click', () => {
    
    // --- Chama a função de pré-carregamento aqui ---
    preloadCarouselImages();
    // --- Fim da chamada ---

    inicio.style.marginLeft = '-150vw'
    setTimeout(()=>{
        main.style.display = 'none'
        heart.style.display = 'flex'
        inicio.style.marginLeft = '0'
    }, 300)

    setTimeout(()=>{
        inicio.style.background = 'transparent'
        inicio.style.backdropFilter = 'none'
        setTimeout(()=>{
            heart.style.scale = '0'
        }, 300)
    }, 3000)

    setTimeout(()=>{
        
        const lines = text.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
        
        audioThoseEyes.play()
        
        async function loadText(lines){
            for(const line of lines){
                textoP.style.animation = 'text .4s ease'
                textoP.innerHTML = line;
                setTimeout(()=>{
                    textoP.style.animation = 'none'
                }, 400)
                await new Promise(resolve => setTimeout(resolve, 6000));
            }
        }
        
        loadText(lines)
        
        calculateImageWidthAndGap();
        window.addEventListener('resize', () => {
            calculateImageWidthAndGap();
        });

        fotos.style.transition = 'transform 0.6s ease';
        fotos.style.transform = `translateX(0px)`; 
        currentTranslateX = 0; 

        setInterval(()=>{
            if (imageElementWidthAndGap === 0) { 
                calculateImageWidthAndGap(); 
                if(imageElementWidthAndGap === 0) return; 
            }

            fotos.children[8].style.filter = 'grayscale(1) blur(7px)'
            fotos.children[8].style.scale = 0.8
            fotos.children[9].style.filter = 'none'
            fotos.children[9].style.scale = 1

            currentTranslateX -= imageElementWidthAndGap;
            fotos.style.transform = `translateX(${currentTranslateX}px)`;
            
            setTimeout(()=>{
                const firstChild = fotos.children[0];
                fotos.appendChild(firstChild); 

                currentTranslateX += imageElementWidthAndGap;
                fotos.style.transition = 'none'; 
                fotos.style.transform = `translateX(${currentTranslateX}px)`;
                
                fotos.offsetHeight; 

                fotos.style.transition = 'transform 0.6s ease'; 
            }, 600) 
        }, 3000)
    }, 3000)
})
