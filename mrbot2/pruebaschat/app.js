'use strict';
const BootBot = require('bootbot');
const prettyjson = require('prettyjson');

const bot = new BootBot({
  accessToken: 'EAAhkR2U5nzoBAE13b0W9Wz8ZAyw5kKECqINRSzNdtd9zd3WBrahsSqbs5OkXsKBw14KNYwTUj8ZAZABPaE8CpM0cRr1bUFQaudtjHP0pPEptXlhkKCgB2yLZB2YKsowZBjETX05dLYkjM5A2GgUIMPXSyuXCvIESbC9QcfkNDSgVhZCr6vsNkd',
  verifyToken: 'asistenteMrbot1',
  appSecret: '6196ea164a711a3dca511664aa886f85'
});

//inicio de flujo
bot.setGetStartedButton((payload, chat) => {
  console.log(prettyjson.render(payload));
  const welcome1 = 'Soy Mr.Bot 🤖🖐 tu asistente virtual';
  const options = { typing: true };
  chat.say (welcome1, options) 
    .then (() => chat.say ({
         text: 'Selecciona una de las sguintes opciones?',
         quickReplies: [ {
          'content_type': 'text',
          'title': 'Socilitar adelanto',
          'payload': 'OPTION_ONE' },
          {
            'content_type': 'text',
            'title': 'Preguntas frecuentes',
            'payload': 'OPTION_TWO' 
          }]          
        }
        
      
        ));
        console.log(prettyjson.render(payload)); 
});

// llamada de los botones de inicio 'Solicitar adelanto y preguntas frecuentes'

bot.on('quick_reply:OPTION_ONE', (payload, chat , conversation) => {
  console.log(chat, payload);
    chat.say({
      text: '¡Excelente! para realizar solicitud es muy importante que en cada pregunta ingreses los datos correctos, si tienes preguntas por favor hazlas al FINALIZAR la aplicación, en las preguntas que existan BOTONES porfavor responde usando los BOTONES',
      quickReplies: [ {'content_type': 'text',
                        'title':'Continuar',
                       'payload':'OPTION_CONTINUAR'
                      },
                     ]
                  });
});



//Menu preguntas frecuentes
bot.on('quick_reply:OPTION_TWO', (payload, chat) => {
  
    chat.say({
      text: 'Selecciona una de las opciones siguientes para obtener mas informacion 🕵️‍♂️😃',
      quickReplies: [
        {
         
          'title':'Requisitos',
          'payload':'OPTION_REQUISITOS',

        },
        {
          'content_type': 'text',
          'title':'Tasas',
          'payload':'OPTION_TASAS',
        },
        {
          'content_type': 'text',
          'title':'Ubicaciones',
          'payload':'OPTION_UBICACIONES',
        },
        {
          'content_type': 'text',
          'title':'Solicitar adelanto',
          'payload':'OPTION_ONE',
        }

      ]
    }); 
 
});
//boton requisitos
//boton tasas 
//boton Unicaciones 
//boton solicitar adelanto redirije a conversacion en cascada

//contexto de requisitos
bot.hear('Requisitos', (payload, chat) => {
  chat.say({
    "sender_action": "typing_on",
    attachment: 'image',
    url: 'https://media.giphy.com/media/1dOIvm5ynwYolB2Xlh/giphy.gif',
    quickReplies: [ 
      {
        'content_type':'text',
        'title':'Otra pregunta',
        'payload':'OPTION_TWO'

      }
    ]
  });
});

//contexto de tasas
bot.hear('tasas', (payload, chat) => {
  chat.say({
    "sender_action": "typing_on",
    attachment: 'image',
    url: 'https://media.giphy.com/media/1dOIvm5ynwYolB2Xlh/giphy.gif',
    quickReplies: [ 
      {
        'content_type':'text',
        'title':'Otra pregunta',
        'payload':'OPTION_TWO'

      }
    ]
  });
});

//

//contexto de ubicaciones 
bot.hear('Ubicaciones', (payload, chat) => {
  chat.say({
    "sender_action": "typing_on",
    attachment: 'image',
    url: 'https://media.giphy.com/media/1dOIvm5ynwYolB2Xlh/giphy.gif',
    quickReplies: [ 
      {
        'content_type':'text',
        'title':'Otra pregunta',
        'payload':'OPTION_TWO'

      }
    ]
  });
});

bot.on('quick_reply:OPTION_GUATE', (payload, chat , conversation) => {
  console.log(chat, payload);
  chat.say({

   });
});


//inicio flujo conversacion en cascada
bot.hear('Continuar', (payload, chat) => {
	const askName = (convo) => {
		convo.ask('¡Empecemos! ¿Cuál es tu primer nombre?', (payload, convo) => {
			const text = payload.message.text;
			convo.set('name', text);
      convo.say(`mucho gusto, ${text}`).then(() => askLastName(convo));
      console.log(prettyjson.render(payload));
		});
	};

	const askLastName = (convo) => {
   
		convo.ask(`Hora podrias decirme cual es tu primer apellido`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('lastname', text);
      convo.say(`Excelente continuemos`).then(() => askNumber(convo));
      console.log(text);
		});
  };

  const askNumber= (convo) => {
		convo.ask(`Ahora necesito saber cual es tu fecha de nacimiento,📆 ejemplo:  02/01/2011`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('Date', text);
      convo.say(`Excelente! `).then(() => askDpi(convo));
      console.log(convo);
		});
  };
  
  const askDpi = (convo) => {
		convo.ask(`Hora, dime tu numero de DPI sin guiones ni espacios tal y como esta en tu documento`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('dpi', text);
      convo.say(`vamos muy bien!`).then(() => askNit(convo));
      
		});
  };
  
  const askNit = (convo) => {
		convo.ask(`podrias procionarme tu numero de NIT? `, (payload, convo) => {
			const text = payload.message.text;
			convo.set('nit', text);
      convo.say(`Gracias!`).then(() => askPhone(convo));
     
		});
	};

  const askPhone = (convo) => {
		convo.ask(`cual es tu número telefonico 📱`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('phone', text);
      convo.say(`Perfecto ya estamos por terminar`).then(() => askMail(convo));
      
		});
	};

  const askMail = (convo) => {
		convo.ask(`Ahora dime tu correo, escribelo como el siguiente ejemplo: lisa12@gmail.com `, (payload, convo) => {
			const text = payload.message.text;
			convo.set('mail', text);
      convo.say(`Excelente hemos terminado! `).then(() => askTEnd(convo));
      
		}); 
	};
  
  const askTEnd = (convo) => {
		convo.say ('Uno de nuestros agentes te contactara en las proximas 24 horas') 
    .then (() => chat.say ({
         text: 'Fue un gusto atenderte 🤖🖐',
         quickReplies: [ {
          'content_type': 'text',
          'title': 'Salir',
          'payload': 'OPTION_TWO' }
         ]          
        }
        
        ));
	};
   
  //despliegue de botones de menu preguntas frecuentes

  

	chat.conversation((convo) => {
	askName(convo);
  });
  
});

bot.start();