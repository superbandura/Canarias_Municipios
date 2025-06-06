document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a Elementos del DOM ---
    const svgMap = document.getElementById('canary-map');
    const municipalitiesButton = document.getElementById('municipalities-button'); // ID actualizado
    const cultureButton = document.getElementById('culture-button');           // Nuevo botón
    const gameStatus = document.getElementById('game-status');
    const itemDisplay = document.getElementById('item-display'); // ID actualizado
    const itemTypeLabelEl = document.getElementById('item-type-label'); // Nuevo
    const itemNameOrQuestionEl = document.getElementById('item-name-or-question'); // ID actualizado
    const scoreDisplay = document.getElementById('score-display');
    const scorePointsEl = document.getElementById('score-points');
    const scoreTotalRoundsEl = document.getElementById('score-total-rounds');
    const infoBox = document.getElementById('info-box');
    const islandDetailsDiv = document.getElementById('island-details');
    const infoName = document.getElementById('info-name');
    const infoCapital = document.getElementById('info-capital');
    const infoArea = document.getElementById('info-area');
    const infoPopulation = document.getElementById('info-population');
    const infoBoxIntro = document.querySelector('#info-box p:first-child');
    const islandPaths = svgMap.querySelectorAll('path[id]');

    // --- Datos de Información de Islas (sin cambios) ---
    const islandData = {
        'el-hierro': { name: 'El Hierro', capital: 'Valverde', area: 268.71, population: 11836 },
        'la-palma': { name: 'La Palma', capital: 'Santa Cruz de La Palma', area: 708.32, population: 84338 },
        'la-gomera': { name: 'La Gomera', capital: 'San Sebastián de La Gomera', area: 369.76, population: 22361 },
        'tenerife': { name: 'Tenerife', capital: 'Santa Cruz de Tenerife', area: 2034.38, population: 948815 },
        'gran-canaria': { name: 'Gran Canaria', capital: 'Las Palmas de Gran Canaria', area: 1560.11, population: 863309 },
        'fuerteventura': { name: 'Fuerteventura', capital: 'Puerto del Rosario', area: 1659.74, population: 124152 },
        'lanzarote': { name: 'Lanzarote', capital: 'Arrecife', area: 845.94, population: 161463 },
    };

    // --- Datos del Juego: Municipios ---
    const allMunicipalities = [
        // ... (tu lista completa de municipios, sin cambios)
      { name: "Adeje", islandId: "tenerife" }, { name: "Arafo", islandId: "tenerife" },
      { name: "Arico", islandId: "tenerife" }, { name: "Arona", islandId: "tenerife" },
      { name: "Buenavista del Norte", islandId: "tenerife" }, { name: "Candelaria", islandId: "tenerife" },
      { name: "Fasnia", islandId: "tenerife" }, { name: "Garachico", islandId: "tenerife" },
      { name: "Granadilla de Abona", islandId: "tenerife" }, { name: "La Guancha", islandId: "tenerife" },
      { name: "Guía de Isora", islandId: "tenerife" }, { name: "Güímar", islandId: "tenerife" },
      { name: "Icod de los Vinos", islandId: "tenerife" }, { name: "La Matanza de Acentejo", islandId: "tenerife" },
      { name: "La Orotava", islandId: "tenerife" }, { name: "Puerto de la Cruz", islandId: "tenerife" },
      { name: "Los Realejos", islandId: "tenerife" }, { name: "El Rosario", islandId: "tenerife" },
      { name: "San Cristóbal de La Laguna", islandId: "tenerife" }, { name: "San Juan de la Rambla", islandId: "tenerife" },
      { name: "San Miguel de Abona", islandId: "tenerife" }, { name: "Santa Cruz de Tenerife", islandId: "tenerife" },
      { name: "Santa Úrsula", islandId: "tenerife" }, { name: "Santiago del Teide", islandId: "tenerife" },
      { name: "El Sauzal", islandId: "tenerife" }, { name: "Los Silos", islandId: "tenerife" },
      { name: "Tacoronte", islandId: "tenerife" }, { name: "El Tanque", islandId: "tenerife" },
      { name: "Tegueste", islandId: "tenerife" }, { name: "La Victoria de Acentejo", islandId: "tenerife" },
      { name: "Vilaflor de Chasna", islandId: "tenerife" },
	    { name: "Valverde", islandId: "el-hierro" }, { name: "La Frontera", islandId: "el-hierro" },
      { name: "El Pinar de El Hierro", islandId: "el-hierro" },
		  { name: "Barlovento", islandId: "la-palma" }, { name: "Breña Alta", islandId: "la-palma" },
      { name: "Breña Baja", islandId: "la-palma" }, { name: "Fuencaliente de La Palma", islandId: "la-palma" },
      { name: "Garafía", islandId: "la-palma" }, { name: "Los Llanos de Aridane", islandId: "la-palma" },
      { name: "El Paso", islandId: "la-palma" }, { name: "Puntagorda", islandId: "la-palma" },
      { name: "Puntallana", islandId: "la-palma" }, { name: "San Andrés y Sauces", islandId: "la-palma" },
      { name: "Santa Cruz de La Palma", islandId: "la-palma" }, { name: "Tazacorte", islandId: "la-palma" },
      { name: "Tijarafe", islandId: "la-palma" }, { name: "Villa de Mazo", islandId: "la-palma" },
		  { name: "Agulo", islandId: "la-gomera" }, { name: "Alajeró", islandId: "la-gomera" },
      { name: "Hermigua", islandId: "la-gomera" }, { name: "San Sebastián de La Gomera", islandId: "la-gomera" },
      { name: "Valle Gran Rey", islandId: "la-gomera" }, { name: "Vallehermoso", islandId: "la-gomera" },
			{ name: "Antigua", islandId: "fuerteventura" }, { name: "Betancuria", islandId: "fuerteventura" },
      { name: "La Oliva", islandId: "fuerteventura" }, { name: "Pájara", islandId: "fuerteventura" },
      { name: "Puerto del Rosario", islandId: "fuerteventura" }, { name: "Tuineje", islandId: "fuerteventura" },
			{ name: "Arrecife", islandId: "lanzarote" }, { name: "Haría", islandId: "lanzarote" },
      { name: "San Bartolomé", islandId: "lanzarote" }, { name: "Teguise", islandId: "lanzarote" },
      { name: "Tías", islandId: "lanzarote" }, { name: "Tinajo", islandId: "lanzarote" }, { name: "Yaiza", islandId: "lanzarote" },
		  { name: "Agaete", islandId: "gran-canaria" }, { name: "Agüimes", islandId: "gran-canaria" },
      { name: "La Aldea de San Nicolás", islandId: "gran-canaria" }, { name: "Artenara", islandId: "gran-canaria" },
      { name: "Arucas", islandId: "gran-canaria" }, { name: "Firgas", islandId: "gran-canaria" },
      { name: "Gáldar", islandId: "gran-canaria" }, { name: "Ingenio", islandId: "gran-canaria" },
      { name: "Las Palmas de Gran Canaria", islandId: "gran-canaria" }, { name: "Mogán", islandId: "gran-canaria" },
      { name: "Moya", islandId: "gran-canaria" }, { name: "San Bartolomé de Tirajana", islandId: "gran-canaria" },
      { name: "Santa Brígida", islandId: "gran-canaria" }, { name: "Santa Lucía de Tirajana", islandId: "gran-canaria" },
      { name: "Santa María de Guía de Gran Canaria", islandId: "gran-canaria" }, { name: "Tejeda", islandId: "gran-canaria" },
      { name: "Telde", islandId: "gran-canaria" }, { name: "Teror", islandId: "gran-canaria" },
      { name: "Valleseco", islandId: "gran-canaria" }, { name: "Valsequillo de Gran Canaria", islandId: "gran-canaria" },
      { name: "Vega de San Mateo", islandId: "gran-canaria" },
    ];

    // --- Datos del Juego: Cultura ---
    const allCulturalQuestions = [
        // El Hierro
        { question: "¿En qué isla se encuentra el árbol Garoé, sagrado para los bimbaches?", islandId: "el-hierro" },
        { question: "¿Qué isla es conocida por su lucha por la sostenibilidad y el objetivo de ser 100% autosuficiente con energías renovables?", islandId: "el-hierro" },
        { question: "¿En qué isla se celebra la Bajada de la Virgen de los Reyes cada cuatro años?", islandId: "el-hierro" },
        { question: "¿Qué isla fue considerada durante siglos el \"Fin del Mundo\" occidental, marcando el meridiano cero?", islandId: "el-hierro" },
        { question: "¿Dónde se practica la tradicional lucha del garrote, herencia de los antiguos aborígenes?", islandId: "el-hierro" },
        { question: "¿Qué isla es famosa por sus sabinas retorcidas por el viento?", islandId: "el-hierro" },
        { question: "¿En qué isla se encuentra el Centro de Interpretación Vulcanológico, debido a su reciente actividad volcánica submarina?", islandId: "el-hierro" },
        { question: "¿Qué isla tiene una Reserva Marina, La Restinga, de gran importancia para el buceo?", islandId: "el-hierro" },
        { question: "¿En qué isla se elabora un queso ahumado tradicional con denominación de origen?", islandId: "el-hierro" },
        { question: "¿Qué isla es la más pequeña y occidental del archipiélago canario?", islandId: "el-hierro" },
        // La Palma
        { question: "¿En qué isla se celebra la Danza de los Enanos durante las Fiestas Lustrales de la Bajada de la Virgen de las Nieves?", islandId: "la-palma" },
        { question: "¿Qué isla es conocida como \"La Isla Bonita\" por su exuberante vegetación y paisajes?", islandId: "la-palma" },
        { question: "¿Dónde se encuentra el Observatorio del Roque de los Muchachos?", islandId: "la-palma" },
        { question: "¿En qué isla se produjo la erupción volcánica de Cumbre Vieja en 2021?", islandId: "la-palma" },
        { question: "¿Qué isla es famosa por sus puros artesanales, herencia de la emigración a Cuba?", islandId: "la-palma" },
        { question: "¿En qué isla se encuentra el Parque Nacional de la Caldera de Taburiente?", islandId: "la-palma" },
        { question: "¿Qué isla celebra \"Los Indianos\", una parodia carnavalesca del regreso de los emigrantes de América?", islandId: "la-palma" },
        { question: "¿Dónde se pueden encontrar ejemplos de arquitectura tradicional con balcones de madera ricamente decorados?", islandId: "la-palma" },
        { question: "¿Qué isla es un importante centro de senderismo con una extensa red de caminos reales?", islandId: "la-palma" },
        { question: "¿En qué isla se encuentra el Bosque de Los Tilos, una importante reserva de laurisilva?", islandId: "la-palma" },
        // La Gomera
        { question: "¿En qué isla se practica el Silbo Gomero, un lenguaje silbado Patrimonio de la Humanidad?", islandId: "la-gomera" },
        { question: "¿Dónde se encuentra el Parque Nacional de Garajonay, famoso por su bosque de laurisilva?", islandId: "la-gomera" },
        { question: "¿Qué isla fue la última escala de Cristóbal Colón antes de partir hacia América en 1492?", islandId: "la-gomera" },
        { question: "¿En qué isla es tradicional el \"almogrote\", una pasta picante a base de queso curado?", islandId: "la-gomera" },
        { question: "¿Qué isla es conocida por sus abruptos barrancos y paisajes volcánicos ancestrales?", islandId: "la-gomera" },
        { question: "¿Dónde se celebra la Bajada de la Virgen de Guadalupe cada cinco años?", islandId: "la-gomera" },
        { question: "¿Qué isla tiene una tradición musical rica en chácaras y tambores?", islandId: "la-gomera" },
        { question: "¿En qué isla se encuentra el Monumento Natural de Los Órganos?", islandId: "la-gomera" },
        { question: "¿Qué isla es famosa por su miel de palma, obtenida de la savia de la palmera canaria?", islandId: "la-gomera" },
        { question: "¿Desde qué isla partió Beatriz de Bobadilla, figura histórica ligada a la conquista?", islandId: "la-gomera" },
        // Tenerife
        { question: "¿En qué isla se encuentra el Teide, el pico más alto de España?", islandId: "tenerife" },
        { question: "¿Dónde se celebra uno de los carnavales más famosos del mundo, el Carnaval de Santa Cruz?", islandId: "tenerife" },
        { question: "¿Qué isla alberga la ciudad de San Cristóbal de La Laguna, Patrimonio de la Humanidad?", islandId: "tenerife" },
        { question: "¿En qué isla lucharon los guanches, liderados por menceyes como Bencomo?", islandId: "tenerife" },
        { question: "¿Qué isla es la más poblada del archipiélago canario?", islandId: "tenerife" },
        { question: "¿Dónde se encuentran los Acantilados de Los Gigantes?", islandId: "tenerife" },
        { question: "¿En qué isla se originó la leyenda de la Cueva del Viento, uno de los tubos volcánicos más largos del mundo?", islandId: "tenerife" },
        { question: "¿Qué isla es conocida por sus \"guachinches\"?", islandId: "tenerife" },
        { question: "¿Dónde tuvo lugar la Batalla de Acentejo, una importante victoria guanche?", islandId: "tenerife" },
        { question: "¿En qué isla se encuentra el Auditorio de Tenerife, obra de Santiago Calatrava?", islandId: "tenerife" },
        // Gran Canaria
        { question: "¿En qué isla se encuentran las Dunas de Maspalomas?", islandId: "gran-canaria" },
        { question: "¿Dónde se celebra el Carnaval de Las Palmas, conocido por su Gala Drag Queen?", islandId: "gran-canaria" },
        { question: "¿Qué isla es a menudo descrita como un \"continente en miniatura\"?", islandId: "gran-canaria" },
        { question: "¿En qué isla se encuentra el Roque Nublo, un monolito volcánico emblemático?", islandId: "gran-canaria" },
        { question: "¿Dónde se pueden visitar yacimientos como la Cueva Pintada de Gáldar?", islandId: "gran-canaria" },
        { question: "¿Qué isla fue foco de la conquista, con figuras como Tenesor Semidán (Fernando Guanarteme)?", islandId: "gran-canaria" },
        { question: "¿En qué isla se celebra la Fiesta de la Rama en Agaete?", islandId: "gran-canaria" },
        { question: "¿Qué isla es conocida por su producción de plátanos y tomates de exportación?", islandId: "gran-canaria" },
        { question: "¿Dónde se encuentra el barrio histórico de Vegueta en su capital?", islandId: "gran-canaria" },
        { question: "¿En qué isla es tradicional el \"sancocho canario\"?", islandId: "gran-canaria" },
        // Fuerteventura
        { question: "¿Qué isla es conocida como \"la playa de Canarias\" por sus extensas playas de arena dorada?", islandId: "fuerteventura" },
        { question: "¿En qué isla se practica tradicionalmente el juego del palo canario?", islandId: "fuerteventura" },
        { question: "¿Dónde se encuentra el Parque Natural de Corralejo, con sus dunas e Isla de Lobos?", islandId: "fuerteventura" },
        { question: "¿Qué isla es un destino mundialmente famoso para el windsurf y el kitesurf?", islandId: "fuerteventura" },
        { question: "¿En qué isla se produce el queso majorero, con Denominación de Origen?", islandId: "fuerteventura" },
        { question: "¿Qué isla fue lugar de destierro para Miguel de Unamuno?", islandId: "fuerteventura" },
        { question: "¿Dónde se encuentra la Montaña de Tindaya, sagrada por los majos?", islandId: "fuerteventura" },
        { question: "¿Qué isla es la más antigua geológicamente del archipiélago?", islandId: "fuerteventura" },
        { question: "¿En qué isla se pueden ver molinos de viento tradicionales?", islandId: "fuerteventura" },
        { question: "¿Qué isla, junto con Lanzarote, forma parte de una Reserva de la Biosfera desde 2009?", islandId: "fuerteventura" },
        // Lanzarote
        { question: "¿En qué isla dejó una profunda huella el artista César Manrique?", islandId: "lanzarote" },
        { question: "¿Dónde se encuentra el Parque Nacional de Timanfaya o \"Montañas del Fuego\"?", islandId: "lanzarote" },
        { question: "¿Qué isla es famosa por su paisaje volcánico único de erupciones del siglo XVIII?", islandId: "lanzarote" },
        { question: "¿En qué isla se cultivan vides en hoyos cónicos en ceniza volcánica (picón)?", islandId: "lanzarote" },
        { question: "¿Dónde se pueden visitar los Jameos del Agua y la Cueva de los Verdes?", islandId: "lanzarote" },
        { question: "¿Qué isla es conocida por sus casas blancas con carpintería verde o azul?", islandId: "lanzarote" },
        { question: "¿En qué isla se encuentra el Jardín de Cactus, creación de César Manrique?", islandId: "lanzarote" },
        { question: "¿Qué isla, junto con el Archipiélago Chinijo, es Reserva de la Biosfera desde 1993?", islandId: "lanzarote" },
        { question: "¿Desde qué isla se pueden realizar excursiones a La Graciosa?", islandId: "lanzarote" },
        { question: "¿En qué isla se celebra la festividad de Nuestra Señora de los Dolores (o de los Volcanes)?", islandId: "lanzarote" },
    ];

    const TOTAL_ROUNDS = 10;

    // --- Estado Global ---
    let isPlaying = false;
    let score = 0;
    let roundsPlayed = 0;
    let currentItem = null; // Renombrado de currentMunicipality
    let itemsPool = [];   // Renombrado de municipalitiesPool
    let timeoutId = null;
    let currentlySelectedPath = null;
    let currentGameMode = null; // 'municipalities' o 'culture'

    // --- Funciones del Juego y UI ---

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function selectNextItem() { // Renombrado
        if (itemsPool.length === 0) {
            // Esta lógica de rellenar ya no es necesaria aquí si startGame prepara el pool exacto para TOTAL_ROUNDS
            console.warn("El pool de items está vacío. Esto no debería suceder si startGame funciona correctamente.");
            return null;
        }
        return itemsPool.pop();
     }

    function displayIslandInfo(data) {
        if (data) {
            infoBoxIntro.classList.add('hidden');
            islandDetailsDiv.classList.remove('hidden');
            infoName.textContent = data.name;
            infoCapital.textContent = data.capital;
            infoArea.textContent = data.area.toLocaleString('es-ES');
            infoPopulation.textContent = data.population.toLocaleString('es-ES');
        } else {
            infoBoxIntro.classList.remove('hidden');
            islandDetailsDiv.classList.add('hidden');
            infoName.textContent = '---';
            infoCapital.textContent = '---';
            infoArea.textContent = '---';
            infoPopulation.textContent = '---';
        }
    }

    function clearIslandStyles() {
        islandPaths.forEach(p => {
            p.classList.remove('correct-island', 'incorrect-island', 'selected-island', 'show-correct-answer-feedback');
        });
         currentlySelectedPath = null;
    }

    function setIslandClickable(clickable) {
        islandPaths.forEach(path => {
            path.style.pointerEvents = clickable ? 'auto' : 'none';
        });
    }

   function startGame() {
        if (!currentGameMode) {
            console.error("Modo de juego no seleccionado.");
            return;
        }
        console.log(`Iniciando juego en modo: ${currentGameMode}...`);
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        isPlaying = true;
        score = 0;
        roundsPlayed = 0;
        
        let sourceArray;
        if (currentGameMode === 'municipalities') {
            sourceArray = [...allMunicipalities];
            itemTypeLabelEl.textContent = "Municipio:";
        } else if (currentGameMode === 'culture') {
            sourceArray = [...allCulturalQuestions];
            itemTypeLabelEl.textContent = "Pregunta Cultural:";
        } else {
            console.error("Modo de juego desconocido:", currentGameMode);
            return;
        }

        shuffleArray(sourceArray);
        
        // Asegurar que tenemos suficientes items para TOTAL_ROUNDS, o ajustar TOTAL_ROUNDS si no.
        // Esto es opcional, pero previene errores si TOTAL_ROUNDS es mayor que los items disponibles.
        let actualTotalRounds = TOTAL_ROUNDS;
        if (sourceArray.length < TOTAL_ROUNDS) {
            console.warn(`Hay menos de ${TOTAL_ROUNDS} items (${sourceArray.length}) para el modo ${currentGameMode}. Se jugarán ${sourceArray.length} rondas.`);
            actualTotalRounds = sourceArray.length;
            itemsPool = sourceArray; // Usar todos los disponibles
        } else {
            itemsPool = sourceArray.slice(0, TOTAL_ROUNDS);
        }
        scoreTotalRoundsEl.textContent = actualTotalRounds; // Actualizar el total de rondas en la UI

        if (itemsPool.length === 0) {
            gameStatus.textContent = `No hay ${currentGameMode === 'municipalities' ? 'municipios' : 'preguntas'} disponibles para este modo.`;
            municipalitiesButton.disabled = false;
            cultureButton.disabled = false;
            isPlaying = false;
            return;
        }

        clearIslandStyles();
        displayIslandInfo(null);
        infoBox.classList.add('hidden');

        municipalitiesButton.disabled = true;
        cultureButton.disabled = true;
        // No cambiamos el texto del botón aquí, se mantiene "Jugando!" en gameStatus

        itemDisplay.classList.remove('hidden');
        scoreDisplay.classList.remove('hidden');
        updateScoreDisplay(actualTotalRounds); // Pasar el número real de rondas
        nextRound();
    }

    function nextRound() {
        clearIslandStyles();
        if (timeoutId) clearTimeout(timeoutId);

        const actualTotalRounds = parseInt(scoreTotalRoundsEl.textContent, 10); // Obtener el total real de rondas

        if (roundsPlayed >= actualTotalRounds || itemsPool.length === 0) {
            endGame();
        } else {
            roundsPlayed++;
            currentItem = selectNextItem();
            
            if (!currentItem) { 
                endGame("Error al obtener el siguiente item."); 
                return; 
            }

            if (currentGameMode === 'municipalities') {
                itemNameOrQuestionEl.textContent = currentItem.name;
            } else if (currentGameMode === 'culture') {
                itemNameOrQuestionEl.textContent = currentItem.question;
            }
            
            gameStatus.textContent = `Ronda ${roundsPlayed} de ${actualTotalRounds}. Haz clic en la isla correcta.`;
            updateScoreDisplay(actualTotalRounds);
            setIslandClickable(true);
        }
    }

    function endGame(message = "¡Juego terminado!") {
        console.log("Fin del juego.");
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        isPlaying = false;
        clearIslandStyles();
        setIslandClickable(true);

        const actualTotalRounds = parseInt(scoreTotalRoundsEl.textContent, 10);
        gameStatus.textContent = `${message} Tu puntuación final es ${score} de ${actualTotalRounds} en modo ${currentGameMode}. Selecciona un modo de juego o clica una isla para ver su info.`;
        itemDisplay.classList.add('hidden');
        infoBox.classList.remove('hidden');
        displayIslandInfo(null);

        municipalitiesButton.disabled = false;
        cultureButton.disabled = false;
        currentGameMode = null; // Resetear modo de juego
    }

    function updateScoreDisplay(totalRoundsForGame = TOTAL_ROUNDS) { // Acepta el total de rondas para la partida actual
        scorePointsEl.textContent = score;
        scoreTotalRoundsEl.textContent = totalRoundsForGame;
    }

     function getIslandNameById(id) {
        return islandData[id] ? islandData[id].name : id;
     }

    function handleIslandClick(event) {
        const clickedPath = event.target.closest('path[id]');
        if (!clickedPath) return;

        if (isPlaying) {
            if (!currentItem) return;

            const clickedIslandId = clickedPath.id;
            const isCorrect = (clickedIslandId === currentItem.islandId);

            setIslandClickable(false);

            if (isCorrect) {
                score++;
                clickedPath.classList.add('correct-island');
                gameStatus.textContent = "¡Correcto!";
            } else {
                clickedPath.classList.add('incorrect-island');
                 const correctIslandPathId = currentItem.islandId;
                 const correctPathElement = svgMap.querySelector(`#${correctIslandPathId}`);
                 if (correctPathElement) {
                    correctPathElement.classList.add('show-correct-answer-feedback');
                 }
                gameStatus.textContent = `Incorrecto. La respuesta era ${getIslandNameById(currentItem.islandId)}.`;
            }
            updateScoreDisplay(parseInt(scoreTotalRoundsEl.textContent, 10));
            timeoutId = setTimeout(nextRound, 1800);

        } else {
            // --- LÓGICA MODO INFO (sin cambios) ---
            const islandId = clickedPath.id;
            const data = islandData[islandId];

            if (currentlySelectedPath && currentlySelectedPath !== clickedPath) {
                currentlySelectedPath.classList.remove('selected-island');
            }

            if (currentlySelectedPath === clickedPath) {
                clickedPath.classList.remove('selected-island');
                currentlySelectedPath = null;
                displayIslandInfo(null);
            } else {
                clickedPath.classList.add('selected-island');
                currentlySelectedPath = clickedPath;
                displayIslandInfo(data);
            }
        }
    }

    // --- Event Listeners ---
    municipalitiesButton.addEventListener('click', () => {
        currentGameMode = 'municipalities';
        startGame();
    });
    cultureButton.addEventListener('click', () => {
        currentGameMode = 'culture';
        startGame();
    });

    islandPaths.forEach(path => {
        path.addEventListener('click', handleIslandClick);
    });

    // --- Inicialización UI ---
    itemDisplay.classList.add('hidden');
    scoreDisplay.classList.add('hidden');
    infoBox.classList.remove('hidden');
    displayIslandInfo(null);
    gameStatus.textContent = "Selecciona un modo de juego ('Municipios' o 'Cultura') o clica una isla para ver su info."; // Mensaje inicial actualizado

    // Validaciones iniciales
    if (islandPaths.length === 0) {
        console.warn("¡Advertencia! No se encontró ningún elemento 'path[id]' dentro de '#canary-map'. El juego no funcionará.");
        municipalitiesButton.disabled = true;
        cultureButton.disabled = true;
        gameStatus.textContent = "Error: No se pudo cargar el mapa correctamente.";
    } else if (allMunicipalities.length === 0 && allCulturalQuestions.length === 0) {
        console.warn("¡Advertencia! Las listas de municipios y preguntas culturales están vacías.");
        municipalitiesButton.disabled = true;
        cultureButton.disabled = true;
        gameStatus.textContent = "Error: No hay datos para jugar.";
    } else {
        console.log(`Mapa listo con ${islandPaths.length} islas.`);
        if(allMunicipalities.length === 0) console.warn("No hay municipios para el modo 'Municipios'.");
        if(allCulturalQuestions.length === 0) console.warn("No hay preguntas para el modo 'Cultura'.");
    }
});
