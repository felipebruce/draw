var socket;

//Cria a tela
function setup() {
    createCanvas(600, 400);
    background(19);
    socket = io.connect(location.host); //IPV4 da máquina que está rodando o servidor
    
    socket.on('mouse', function(data) {
        noStroke();
        fill(255, 0, 100);
        ellipse(data.x, data.y, 36, 36);
    });

}

//Quando o mouse for pressionado, envia a informação para o servidor,
//que transmite para todos os clientes 
function mouseDragged() {
    console.log('Enviando: ' + mouseX + ',' + mouseY);
    noStroke();
    fill(25, 56, 9);
    ellipse(mouseX, mouseY, 36, 36);

    var data = {
        x: mouseX,
        y: mouseY
    }

    //Envia através da conexão o evento
    socket.emit('mouse', data);

}

function draw() {}