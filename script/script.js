const botoes = {
    sim: document.getElementById('sim'),
    nao: document.getElementById('nao')
}
// const positions = { // Esta variável não está sendo usada, pode ser removida se não houver planos para ela.
//     width: window.innerWidth,
//     height: innerHeight
// }
botoes.nao.addEventListener('mouseenter', ()=>{
    botoes.nao.style.position = 'absolute'
    const top = Math.random() * (85 - 15) + 15;
    botoes.nao.style.top = `${Math.floor(top)}vh`
    const left = Math.random() * (85 - 15) + 15;
    botoes.nao.style.left = `${Math.floor(left)}vw`
})

const fotos = document.querySelector('.content')
const inicio = document.getElementById('main')
const main = document.querySelector('.main')
const heart = document.querySelector('.heart')
const audioThoseEyes = document.getElementById('thoseEyes')
audioThoseEyes.volume = 0.05
const textoP = document.querySelector('.text')
fotos.children[8].style.filter = 'none' //
fotos.children[8].style.scale = 1 //
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

// Variável para armazenar a largura da imagem mais o espaçamento
let imageElementWidthAndGap = 0;
let currentTranslateX = 0; // Controla a posição de translação do carrossel

// Função para calcular a largura de uma imagem e seu espaçamento
function calculateImageWidthAndGap() {
    if (fotos.children.length === 0) {
        imageElementWidthAndGap = 0;
        return;
    }
    const firstImage = fotos.children[0];
    // Fallback para caso haja apenas uma imagem (sem espaçamento para calcular com a segunda)
    imageElementWidthAndGap = firstImage.offsetWidth;

    if (fotos.children.length > 1) {
        const secondImage = fotos.children[1];
        const firstImageRect = firstImage.getBoundingClientRect();
        const secondImageRect = secondImage.getBoundingClientRect();
        // Certifica que as imagens têm dimensões antes de calcular
        if (firstImageRect.width > 0 && secondImageRect.width > 0) {
             imageElementWidthAndGap = secondImageRect.left - firstImageRect.left;
        }
    }
    // console.log('Largura da imagem + gap calculada:', imageElementWidthAndGap); // Para depuração
}


botoes.sim.addEventListener('click', () => {
    
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

    // O carrossel e o texto começam após 3 segundos
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
        
        // --- Início das modificações do Carrossel ---

        // Calcula a largura da imagem e espaçamento assim que o carrossel for iniciado
        calculateImageWidthAndGap();
        // Adiciona um listener para recalcular em caso de redimensionamento da janela (opcional, mas bom para responsividade)
        window.addEventListener('resize', () => {
            calculateImageWidthAndGap();
            // Poderia ser necessário reajustar currentTranslateX aqui se a lógica for muito complexa
        });

        // Aplica a transição CSS ao contêiner das fotos para a propriedade transform
        fotos.style.transition = 'transform 0.6s ease';
        fotos.style.transform = `translateX(0px)`; // Garante a posição inicial
        currentTranslateX = 0; // Reseta se o botão for clicado múltiplas vezes

        setInterval(()=>{
            if (imageElementWidthAndGap === 0) { // Evita divisão por zero ou comportamento estranho se a largura não foi calculada
                // console.warn("Largura da imagem não calculada, pulando a iteração do carrossel.");
                calculateImageWidthAndGap(); // Tenta recalcular
                if(imageElementWidthAndGap === 0) return; // Pula esta iteração se ainda não conseguiu
            }

            // Lógica de destaque da imagem (igual à original)
            // A imagem em fotos.children[8] está saindo do "centro"
            fotos.children[8].style.filter = 'grayscale(1) blur(7px)' //
            fotos.children[8].style.scale = 0.8 //
            // A imagem em fotos.children[9] está entrando no "centro"
            fotos.children[9].style.filter = 'none' //
            fotos.children[9].style.scale = 1 //

            // Move o contêiner de fotos para a esquerda
            currentTranslateX -= imageElementWidthAndGap;
            fotos.style.transform = `translateX(${currentTranslateX}px)`;
            
            // Após a transição de 0.6s, move o elemento DOM e reajusta a posição
            setTimeout(()=>{
                const firstChild = fotos.children[0];
                fotos.appendChild(firstChild); // Move o primeiro filho para o final

                // Compensa a translação para que não haja salto visual
                currentTranslateX += imageElementWidthAndGap;
                fotos.style.transition = 'none'; // Remove a transição temporariamente para o ajuste
                fotos.style.transform = `translateX(${currentTranslateX}px)`;
                
                // Força um reflow do navegador para aplicar a mudança de transform imediatamente
                // antes de reabilitar a transição. Uma forma comum é ler uma propriedade como offsetHeight.
                fotos.offsetHeight; 

                fotos.style.transition = 'transform 0.6s ease'; // Readiciona a transição para a próxima animação
            }, 600) // Este tempo DEVE corresponder à duração da transição CSS (0.6s)
        }, 3000)
        // --- Fim das modificações do Carrossel ---
    }, 3000)
})
