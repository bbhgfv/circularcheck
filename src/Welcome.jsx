/* Landing page upon loading the website. */

import React from 'react';

    const Welcome = (props) => {
    return(
        <div className="flex center column">          
        <h1>Circularity Check</h1>
        <p>
            Willkommen beim Circularity Check! Finden Sie mit unserem Tool den Einstieg in die Kreislaufwirtschaft, indem Sie Ihr
            aktuelles Geschäftsmodell analysieren und einen Zielzustand definieren.
        </p>
        <p>
            Auf Basis Ihrer Antworten erhalten Sie Handlungsempfehlungen zur Entwicklung Ihres zirkulären Geschäftsmodells,
            die Sie direkt in einen Geschäftsmodell-Baukasten überführen können.
        </p>
        <p>
            Eine detaillierte Erklärung der Funktionsweise finden Sie unten rechts über den "Hilfe"-Button.
        </p>
        <button onClick={() => props.setActivePage("Assessment")}>Reifegradbestimmung Starten</button>
        
        </div>
    )
}

export default Welcome;
