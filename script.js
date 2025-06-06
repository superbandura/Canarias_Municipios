document.addEventListener('DOMContentLoaded', async () => {
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
    let allMunicipalities = [];
    let allCulturalQuestions = [];
    try {
        const [munRes, quesRes] = await Promise.all([
            fetch("municipalities.json"),
            fetch("questions.json")
        ]);
        allMunicipalities = await munRes.json();
        allCulturalQuestions = await quesRes.json();
    } catch (err) {
        console.error("Error al cargar archivos JSON", err);
    }


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
