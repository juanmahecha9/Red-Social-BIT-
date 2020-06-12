$(document).ready(function () {

	//TODO:
	//check for cross browser compatability
	//upload to my site isntead of codepen (sorry codepen ily)

	//simple method to give random item from array
	var randomItem = function (array) { return array[Math.floor(Math.random() * array.length)]; };

	var username = "Stranger";

	var kid = {
		WPM: 80,//typing speed aka time it takes to type response
		status: "not connected",
		maxAttention: 60,//how long in seconds before kid gets bored and leaves
		curAttentionSpan: this.maxAttention,//start at max
		curUsername: "Kid",
		usernames: [
			"Crhis", "Maryury", "Tony Stark", "El brayan Galindo", "Vayroooon Alexys"
		],
		greetings: [
			"Hola",
			"Que mas?",
			"Bien o que?",
			"Todo vientos o maletas?",
			"Todo fresas que la vida es crema",

		],
		
		copypastas: [
			"carenalga",
			"( ͡°╭͜ʖ╮͡° )  ( ͡°╭͜ʖ╮͡° )",
			"🍌 💦💦💦 🍑",
			"Que carajos dices?",
			 "Todo bien y ud que?", 
			 "Que hace?",
			"¿Qué carajo acabas de decir de mí, pequeña perra? Te haré saber que me gradué como el mejor de mi clase en los Navy Seals, y he estado involucrado en numerosas redadas secretas en Al-Quaeda, y tengo más de 300 muertes confirmadas. ¡Más uno próximo!",
			"Hohohohohh MYFuckking Gofd, Esto esta muy divertido 💯💯💯, no puedo creer lo divertida que es esta mierda 👦 no puedo ❌ ❗️. I need an ambulance🚑🚑"
		],
		afkAlmostGone: [
			"...?",
			"LOL?",
			"Relajese perro?",
			"Que pasa Bro?",
			"Como es la vuelta?",
			"Me va hacer un 14?",
		],
		insults: [
			"Mucho idiota!", "🤬🤬 🔞 🤬🤬",
		],
		afkGoodbyes: [
			"Bye",
			"Se cuida esas tapas",
			"Cuidese que estan robando bobos!",
			"Lo siento, me tengo que ir",
			"Vemos todo bien",
			"Como dijo andrea, vemos Go...!",
			"Como dijo mi padre, Me largo!",
		],
		triggers: [//something to keep in mind is that these are in order of importance
			[//so if two matches are triggered, the first one will be used
				new RegExp(".*(?:i (?:(?:got(?:ta| to))|have to) go|i'?m .*leav(?:e|ing)|bye+|cya|p(?:ea)?ce|gtg).*", 'gi'),
				[
					"Vemos lok",
					"hasta la vista loser",
					"vemos care buñuelo",
					"hay te ves...",
					"cuide esas tapas",
					"nospi",
				]
			],
			[
				new RegExp(".*(?:(?:user)?name)[^?]*", 'gi'),
				[
					'Que boleta de nombre socio',
					'Mi nombre de usuario si es genial, el tuyo pufff"',
					'al menos mi nombre de usuario es mejor que el tuyo, tu nombre debe ser "el sizas"',
				]
			],
			[
				new RegExp('.*(?:old|\d ?y\/?o|y(?:ea)?rs? old|age|young).*', 'gi'),
				[
					"soy yo carenalga",
					"yo soy el mejor",
					"Soy un 10, tu ni a 5 llegas",
					"solo soy un menor de edad",
				]
			],
			[
				new RegExp(".*(?:(?:yo)?u (?:are|r)|ur|you'?re)(?! not).*(?:retard|idiot|stupid|dumb).*", 'gi'),
				[
					"k...?",
					"mirate en un espejo, feo",
					"jejeje que feo eres",
					"No se ha visto en un espejo",
				]
			],
		],
		reply: function (text) {
			this.status = "typing";
			var kidName = this.curUsername;
			var kidWPM = this.WPM;
			var kidReply = "";
			var isCopyPasta = false;
			if (text !== undefined && text !== null && text !== "") { kidReply = text; } else {
				if ($(".chatbox .messages-wrapper .you").length === 1) {
					kidReply = randomItem(this.greetings);
				} else {
					var finalDecision = randomItem(this.copypastas);
					var lastUserMessage = $(".chatbox .message.you:last-child .text").text();
					var triggered = false;
					for (var i = 0; i < this.triggers.length; i++) {
						var curRegex = this.triggers[i][0];
						var randReply = randomItem(this.triggers[i][1]);
						if (lastUserMessage.match(curRegex)) {
							console.log("TRIGGERED");
							triggered = true;
							finalDecision = randReply;
							break;
						}
					}
					if (Math.random() < 0.1 && !triggered) {
						finalDecision = randomItem(this.insults);
						isCopyPasta = true;
					}
					kidReply = finalDecision;
				}
			}

			//function to simulate actual typing using WPM to estimate how long it'd take to type up a reply
			var sendReply = function (replyText, isPasta) {
				setTimeout(function () {
					sendMsg(kidName, replyText);
					kid.status = "idle";
					$(".reply .typing").text("");
					console.log("done typing! took " + (replyText.length * (1000 / ((kidWPM * 6) / 60))) + "ms to reply");
				}, isPasta ? 500 : (replyText.length * (1000 / ((kidWPM * 6) / 60))));
			};
			//function to delay response time (so kid doesnt start typing response instantly)
			setTimeout(function () {
				$(".reply .typing").text(kidName + " is typing...");
				console.log("typing");
				sendReply(kidReply, isCopyPasta);
			}, (250 + (Math.random() * 5000)));
		},
	};

	//start attention span countdown
	var timerActive = false, almostAFK = false;
	var attentionTimer = function () {
		var timer = setInterval(function () {
			//console.log(kid.curAttentionSpan+" "+almostAFK);
			if (kid.curAttentionSpan > 0) {
				if (kid.status === "idle") { kid.curAttentionSpan--; }
				if (!almostAFK && kid.curAttentionSpan <= kid.maxAttention - (kid.maxAttention / 2)) {
					almostAFK = true;
					if (kid.status !== "typing") { kid.reply(randomItem(kid.afkAlmostGone)); }
				}
			} else {
				if (kid.status !== "typing") {
					kid.reply(randomItem(kid.afkGoodbyes));
					kid.status = "disconnected";
					clearInterval(timer);
				}
			}
		}, 1000);
	};

	//function to add message to window, if who === username, it's your message, otherwise its the stranger
	var sendMsg = function (who, text) {
		if (text === null || text === undefined || text === "") { return; }
		if ($(".reply input.usermsg").attr("placeholder") != "") {
			$(".reply input.usermsg").attr("placeholder", "");
		}
		var html = '' +
			'<div class="' + (who === username ? "you" : "them") + ' message">' +
			'<div class="avatar"></div>' +
			'<div class="name">' + who + '</div>' +
			'<div class="text">' + text + '</div>' +
			'</div>';
		$(".chatbox .messages-wrapper").append($.parseHTML(html));
		$(".chatbox").scrollTop($(".chatbox .messages-wrapper").height());
		if (who === username) {
			if (!timerActive) { timerActive = true; attentionTimer(); }
			kid.curAttentionSpan = kid.maxAttention;
			almostAFK = false;
			if (kid.status !== "typing") { kid.reply(); }
			$(".reply input.usermsg").val("");
		}
	};

	//function to set initial username
	$(".setuser button").click(function () {
		var desiredName = $(".setuser .username").val();
		if (desiredName !== "" && desiredName !== null && desiredName !== undefined) {
			username = desiredName;
			$(".setuser, .dim").fadeOut(100);
			setTimeout(function () {
				$(".messages-wrapper .status").text("Conectado, Saluda!");
				$(".reply input.usermsg").prop('disabled', false);
				kid.status = "idle";
				kid.curUsername = randomItem(kid.usernames);
			}, (500 + (Math.random() * 1000)));
		} else {
			alert("Please enter a username.");
			$(".setuser input.username").focus();
		}
	});

	//send user's typed message when send button or enter key is pressed
	$(".reply input.usermsg").keydown(function (e) { if (e.which === 13) { sendMsg(username, $(this).val()); } });
	$(".reply button.send").click(function () { sendMsg(username, $(".reply input.usermsg").val()); $(".reply input.usermsg").focus(); });

});




































