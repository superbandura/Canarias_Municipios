document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a Elementos del DOM ---
    const svgMap = document.getElementById('canary-map');
    const playButton = document.getElementById('play-button');
    const gameStatus = document.getElementById('game-status');
    const municipalityDisplay = document.getElementById('municipality-display');
    const municipalityNameEl = document.getElementById('municipality-name');
    const scoreDisplay = document.getElementById('score-display');
    const scorePointsEl = document.getElementById('score-points');
    const scoreTotalRoundsEl = document.getElementById('score-total-rounds');
    const infoBox = document.getElementById('info-box');
    const islandDetailsDiv = document.getElementById('island-details'); // Para modo info
    const infoName = document.getElementById('info-name');             // Para modo info
    const infoCapital = document.getElementById('info-capital');       // Para modo info
    const infoArea = document.getElementById('info-area');           // Para modo info
    const infoPopulation = document.getElementById('info-population'); // Para modo info
    const infoBoxIntro = document.querySelector('#info-box p:first-child'); // Para modo info
    const islandPaths = svgMap.querySelectorAll('path[id]');

    // --- Datos Completos (Incluyendo info original) ---
    const islandData = {
        // Asegúrate de que los IDs coinciden y los datos son correctos
        'el-hierro': { name: 'El Hierro', capital: 'Valverde', area: 268.71, population: 11836 },
        'la-palma': { name: 'La Palma', capital: 'Santa Cruz de La Palma', area: 708.32, population: 84338 },
        'la-gomera': { name: 'La Gomera', capital: 'San Sebastián de La Gomera', area: 369.76, population: 22361 },
        'tenerife': { name: 'Tenerife', capital: 'Santa Cruz de Tenerife', area: 2034.38, population: 948815 },
        'gran-canaria': { name: 'Gran Canaria', capital: 'Las Palmas de Gran Canaria', area: 1560.11, population: 863309 },
        'fuerteventura': { name: 'Fuerteventura', capital: 'Puerto del Rosario', area: 1659.74, population: 124152 },
        'lanzarote': { name: 'Lanzarote', capital: 'Arrecife', area: 845.94, population: 161463 },
        // 'la-graciosa': { name: 'La Graciosa', capital: 'Caleta de Sebo', area: 29.05, population: 737 } // Si tienes path
    };

    // --- Datos del Juego ---
    // !!! RECUERDA COMPLETAR ESTA LISTA !!!
    const allMunicipalities = [
	  { name: "Adeje", islandId: "tenerife" },
      { name: "Arafo", islandId: "tenerife" },
      { name: "Arico", islandId: "tenerife" },
      { name: "Arona", islandId: "tenerife" },
      { name: "Buenavista del Norte", islandId: "tenerife" },
      { name: "Candelaria", islandId: "tenerife" },
      { name: "Fasnia", islandId: "tenerife" },
      { name: "Garachico", islandId: "tenerife" },
      { name: "Granadilla de Abona", islandId: "tenerife" },
      { name: "La Guancha", islandId: "tenerife" },
      { name: "Guía de Isora", islandId: "tenerife" },
      { name: "Güímar", islandId: "tenerife" },
      { name: "Icod de los Vinos", islandId: "tenerife" },
      { name: "La Matanza de Acentejo", islandId: "tenerife" },
      { name: "La Orotava", islandId: "tenerife" },
      { name: "Puerto de la Cruz", islandId: "tenerife" },
      { name: "Los Realejos", islandId: "tenerife" },
      { name: "El Rosario", islandId: "tenerife" },
      { name: "San Cristóbal de La Laguna", islandId: "tenerife" },
      { name: "San Juan de la Rambla", islandId: "tenerife" },
      { name: "San Miguel de Abona", islandId: "tenerife" },
      { name: "Santa Cruz de Tenerife", islandId: "tenerife" },
      { name: "Santa Úrsula", islandId: "tenerife" },
      { name: "Santiago del Teide", islandId: "tenerife" },
      { name: "El Sauzal", islandId: "tenerife" },
      { name: "Los Silos", islandId: "tenerife" },
      { name: "Tacoronte", islandId: "tenerife" },
      { name: "El Tanque", islandId: "tenerife" },
      { name: "Tegueste", islandId: "tenerife" },
      { name: "La Victoria de Acentejo", islandId: "tenerife" },
      { name: "Vilaflor de Chasna", islandId: "tenerife" },
	    { name: "Valverde", islandId: "el-hierro" },
        { name: "La Frontera", islandId: "el-hierro" },
        { name: "El Pinar de El Hierro", islandId: "el-hierro" },
		  { name: "Barlovento", islandId: "la-palma" },
          { name: "Breña Alta", islandId: "la-palma" },
          { name: "Breña Baja", islandId: "la-palma" },
          { name: "Fuencaliente de La Palma", islandId: "la-palma" },
          { name: "Garafía", islandId: "la-palma" },
          { name: "Los Llanos de Aridane", islandId: "la-palma" },
          { name: "El Paso", islandId: "la-palma" },
          { name: "Puntagorda", islandId: "la-palma" },
          { name: "Puntallana", islandId: "la-palma" },
          { name: "San Andrés y Sauces", islandId: "la-palma" },
          { name: "Santa Cruz de La Palma", islandId: "la-palma" },
          { name: "Tazacorte", islandId: "la-palma" },
          { name: "Tijarafe", islandId: "la-palma" },
          { name: "Villa de Mazo", islandId: "la-palma" },
		    { name: "Agulo", islandId: "la-gomera" },
            { name: "Alajeró", islandId: "la-gomera" },
            { name: "Hermigua", islandId: "la-gomera" },
            { name: "San Sebastián de La Gomera", islandId: "la-gomera" },
            { name: "Valle Gran Rey", islandId: "la-gomera" },
            { name: "Vallehermoso", islandId: "la-gomera" },
			  { name: "Antigua", islandId: "fuerteventura" },
              { name: "Betancuria", islandId: "fuerteventura" },
              { name: "La Oliva", islandId: "fuerteventura" },
              { name: "Pájara", islandId: "fuerteventura" },
              { name: "Puerto del Rosario", islandId: "fuerteventura" },
              { name: "Tuineje", islandId: "fuerteventura" },
			    { name: "Arrecife", islandId: "lanzarote" },
                { name: "Haría", islandId: "lanzarote" },
                { name: "San Bartolomé", islandId: "lanzarote" },
                { name: "Teguise", islandId: "lanzarote" },
                { name: "Tías", islandId: "lanzarote" },
                { name: "Tinajo", islandId: "lanzarote" },
                { name: "Yaiza", islandId: "lanzarote" },
		{ name: "Agaete", islandId: "gran-canaria" },
        { name: "Agüimes", islandId: "gran-canaria" },
        { name: "La Aldea de San Nicolás", islandId: "gran-canaria" },
        { name: "Antigua", islandId: "gran-canaria" }, // ¡Ojo! Antigua pertenece a Fuerteventura, no a Gran Canaria.
        { name: "Artenara", islandId: "gran-canaria" },
        { name: "Arucas", islandId: "gran-canaria" },
        { name: "Firgas", islandId: "gran-canaria" },
        { name: "Gáldar", islandId: "gran-canaria" },
        { name: "Ingenio", islandId: "gran-canaria" },
        { name: "Las Palmas de Gran Canaria", islandId: "gran-canaria" },
        { name: "Mogán", islandId: "gran-canaria" },
        { name: "Moya", islandId: "gran-canaria" },
        { name: "San Bartolomé de Tirajana", islandId: "gran-canaria" },
        { name: "Santa Brígida", islandId: "gran-canaria" },
        { name: "Santa Lucía de Tirajana", islandId: "gran-canaria" },
        { name: "Santa María de Guía de Gran Canaria", islandId: "gran-canaria" },
        { name: "Tejeda", islandId: "gran-canaria" },
        { name: "Telde", islandId: "gran-canaria" },
        { name: "Teror", islandId: "gran-canaria" },
        { name: "Valleseco", islandId: "gran-canaria" },
        { name: "Valsequillo de Gran Canaria", islandId: "gran-canaria" },
        { name: "Vega de San Mateo", islandId: "gran-canaria" },	

        // Añade muchos más...
    ];
    const TOTAL_ROUNDS = 10; // Reducido para pruebas, ajústalo a 30 o más

    // --- Estado Global ---
    let isPlaying = false;
    let score = 0;
    let roundsPlayed = 0;
    let currentMunicipality = null;
    let municipalitiesPool = [];
    let timeoutId = null;
    let currentlySelectedPath = null; // Para modo INFO y modo JUEGO (feedback visual)

    // --- Funciones del Juego y UI ---

    function shuffleArray(array) { /* ... (igual que antes) ... */
      for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    function selectNextMunicipality() { /* ... (igual que antes) ... */
        if (municipalitiesPool.length === 0) {
             console.warn("Reiniciando lista de municipios.");
            municipalitiesPool = [...allMunicipalities];
            shuffleArray(municipalitiesPool);
            if (municipalitiesPool.length > 1 && currentMunicipality && municipalitiesPool[municipalitiesPool.length - 1].name === currentMunicipality.name) {
                 [municipalitiesPool[municipalitiesPool.length - 1], municipalitiesPool[0]] = [municipalitiesPool[0], municipalitiesPool[municipalitiesPool.length - 1]];
            }
        }
         if (municipalitiesPool.length === 0) {
            console.error("No hay municipios disponibles.");
            return null;
        }
        return municipalitiesPool.pop();
     }

    // Muestra la información de la isla (Modo Info)
    function displayIslandInfo(data) {
        if (data) {
            infoBoxIntro.classList.add('hidden');
            islandDetailsDiv.classList.remove('hidden');
            infoName.textContent = data.name;
            infoCapital.textContent = data.capital;
            infoArea.textContent = data.area.toLocaleString('es-ES');
            infoPopulation.textContent = data.population.toLocaleString('es-ES');
        } else { // Ocultar detalles, mostrar intro
            infoBoxIntro.classList.remove('hidden');
            islandDetailsDiv.classList.add('hidden');
            // Limpiar spans (opcional, ya que se ocultan)
            infoName.textContent = '---';
            infoCapital.textContent = '---';
            infoArea.textContent = '---';
            infoPopulation.textContent = '---';
        }
    }

    // Limpia estilos de islas (feedback juego o selección info)
    function clearIslandStyles() {
        islandPaths.forEach(p => {
            p.classList.remove('correct-island', 'incorrect-island', 'selected-island');
        });
         currentlySelectedPath = null; // Olvidar selección
    }

     // Habilita o deshabilita el clic en las islas
    function setIslandClickable(clickable) { /* ... (igual que antes) ... */
        islandPaths.forEach(path => {
            path.style.pointerEvents = clickable ? 'auto' : 'none';
        });
    }

    function startGame() {
        console.log("Iniciando juego...");
        isPlaying = true;
        score = 0;
        roundsPlayed = 0;
        municipalitiesPool = [...allMunicipalities];
        shuffleArray(municipalitiesPool);
        if (municipalitiesPool.length > TOTAL_ROUNDS) {
             municipalitiesPool = municipalitiesPool.slice(0, TOTAL_ROUNDS);
        }

        clearIslandStyles(); // Limpiar selección previa del modo info
        displayIslandInfo(null); // Asegurarse de que info box está reseteado
        infoBox.classList.add('hidden'); // Ocultar info box

        playButton.disabled = true;
        playButton.textContent = "¡Jugando!";
        municipalityDisplay.classList.remove('hidden');
        scoreDisplay.classList.remove('hidden');
        updateScoreDisplay();
        nextRound();
    }

    function nextRound() {
        // Limpiar feedback visual anterior
         islandPaths.forEach(p => {
            p.classList.remove('correct-island', 'incorrect-island');
            // No quitamos 'selected-island' aquí, se gestiona en el clic o al final/inicio
        });
        if (timeoutId) clearTimeout(timeoutId);

        if (roundsPlayed >= TOTAL_ROUNDS || municipalitiesPool.length === 0) {
            endGame();
        } else {
            roundsPlayed++;
            currentMunicipality = selectNextMunicipality();
            if (!currentMunicipality) { endGame("Error al obtener municipio."); return; }

            municipalityNameEl.textContent = currentMunicipality.name;
            gameStatus.textContent = `Ronda ${roundsPlayed} de ${TOTAL_ROUNDS}. Haz clic en la isla correcta.`;
            updateScoreDisplay();
            setIslandClickable(true);
        }
    }

    function endGame(message = "¡Juego terminado!") {
        console.log("Fin del juego.");
        isPlaying = false;
        currentMunicipality = null;
        clearIslandStyles(); // Limpiar estilos de feedback
        setIslandClickable(true); // Permitir clics para modo info

        gameStatus.textContent = `${message} Tu puntuación final es ${score} de ${TOTAL_ROUNDS}. Pulsa 'Jugar de Nuevo' o clica una isla para ver su info.`;
        municipalityDisplay.classList.add('hidden');
        infoBox.classList.remove('hidden'); // Mostrar info box para modo info
        displayIslandInfo(null); // Mostrar mensaje inicial en info box

        playButton.disabled = false;
        playButton.textContent = "¡Jugar de Nuevo!";
    }

    function updateScoreDisplay() { /* ... (igual que antes) ... */
        scorePointsEl.textContent = score;
        scoreTotalRoundsEl.textContent = TOTAL_ROUNDS;
    }
     function getIslandNameById(id) { /* ... (igual que antes) ... */
        switch(id) {
            case 'el-hierro': return 'El Hierro'; case 'la-palma': return 'La Palma';
            case 'la-gomera': return 'La Gomera'; case 'tenerife': return 'Tenerife';
            case 'gran-canaria': return 'Gran Canaria'; case 'fuerteventura': return 'Fuerteventura';
            case 'lanzarote': return 'Lanzarote'; default: return id;
        }
     }

    // --- MANEJADOR DE CLIC PRINCIPAL (MODO JUEGO / MODO INFO) ---
    function handleIslandClick(event) {
        const clickedPath = event.target.closest('path[id]');
        if (!clickedPath) return; // Clic fuera de un path válido

        if (isPlaying) {
            // --- LÓGICA DEL JUEGO ---
            if (!currentMunicipality) return; // Salir si no hay municipio activo

            const clickedIslandId = clickedPath.id;
            const isCorrect = (clickedIslandId === currentMunicipality.islandId);

            setIslandClickable(false); // Deshabilitar clics durante feedback

            if (isCorrect) {
                score++;
                clickedPath.classList.add('correct-island');
                gameStatus.textContent = "¡Correcto!";
            } else {
                clickedPath.classList.add('incorrect-island');
                // Opcional: Mostrar la correcta también
                 const correctPath = svgMap.querySelector(`#${currentMunicipality.islandId}`);
                 if (correctPath && correctPath !== clickedPath) {
                    // Podrías añadir aquí un estilo tenue a la correcta si quieres
                    // correctPath.classList.add('show-correct-answer'); // Necesitarías CSS para esto
                 }
                gameStatus.textContent = `Incorrecto. ${currentMunicipality.name} está en ${getIslandNameById(currentMunicipality.islandId)}.`;
            }
            updateScoreDisplay();
            timeoutId = setTimeout(nextRound, 1500); // Pasar a siguiente ronda tras pausa

        } else {
            // --- LÓGICA MODO INFO (cuando no se está jugando) ---
            const islandId = clickedPath.id;
            const data = islandData[islandId];

            // Quitar selección anterior si existe y es diferente
            if (currentlySelectedPath && currentlySelectedPath !== clickedPath) {
                currentlySelectedPath.classList.remove('selected-island');
            }

            // Seleccionar/Deseleccionar la isla actual
            if (currentlySelectedPath === clickedPath) {
                // Clic en la ya seleccionada -> Deseleccionar
                clickedPath.classList.remove('selected-island');
                currentlySelectedPath = null;
                displayIslandInfo(null); // Ocultar info
            } else {
                // Clic en nueva isla -> Seleccionar
                clickedPath.classList.add('selected-island');
                currentlySelectedPath = clickedPath;
                displayIslandInfo(data); // Mostrar info
            }
        }
    }

    // --- Event Listeners ---
    playButton.addEventListener('click', startGame);

    islandPaths.forEach(path => {
        path.addEventListener('click', handleIslandClick);
        // El hover sigue funcionando vía CSS para el resaltado amarillo
    });

    // --- Inicialización UI ---
    municipalityDisplay.classList.add('hidden');
    scoreDisplay.classList.add('hidden');
    infoBox.classList.remove('hidden'); // Empezar mostrando info box
    displayIslandInfo(null); // Mostrar mensaje inicial
    gameStatus.textContent = "Pulsa '¡Jugar!' para empezar o clica una isla para ver su info.";

    // Comprobación inicial mapa
    if (islandPaths.length === 0) {
        console.warn("¡Advertencia! No se encontró ningún elemento 'path[id]' dentro de '#canary-map'.");
        playButton.disabled = true;
        gameStatus.textContent = "Error: No se pudo cargar el mapa correctamente.";
    } else {
        console.log(`Mapa listo con ${islandPaths.length} islas.`);
    }
});