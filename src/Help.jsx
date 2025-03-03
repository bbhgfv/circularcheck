import React from 'react';
import assessment from './resources/assessment.png'
import questions from './resources/questions.png'
import results from './resources/results.gif'
import morphology from './resources/morphology.png'

const Help = (props) => {

    function hidePopUp(target) {
        if (target === document.getElementById("help")) {
            target.classList.toggle("hide");
        }
    }

    return (
        <div id="help" className="pop-up flex hide" onClick={(e) => hidePopUp(e.target)}>
            <div className="question-card flex center column">
                <div className="help-text center-text">
                    <h1>Anleitung</h1>
                    <p>
                        Willkommen zum Circularity Check. Hier erfahren Sie, wie das Tool verwendet wird.
                    </p>
                    <br/>
                    <h2>Assessment</h2>
                    <p>
                        Um den zirkulären Reifegrad Ihres aktuellen Geschäftsmodells berechnen, ein Zielbild zu definieren und entsprechende Handlungsempfehlungen zu erhalten,
                        müssen Sie den Fragebogen vollständig ausfüllen. 
                    </p>
                    <img src={assessment} width="100%"/>
                    <p>
                        Der Fragebogen ist aufgeteilt in Dimensionen des Business Model Canvas und zugeordneten Handlungsfeldern.
                        Innerhalb der Handlungsfelder finden Sie Fragen, die je einem Reifeelement zugeordnet sind.
                        Die Fragen eines Handlungsfeldes öffnen sich durch das Klicken auf den jeweiligen Start-Button.
                        Wenn Sie mit dem Zeiger über das Informationssymbol gehen, erhalten Sie weitere Informationen über das jeweilige Handlungsfeld.
                        Die Beantwortung jeder Frage erfordert die Festlegung des aktuellen sowie des anvisierten Zustands.
                    </p>
                    <img src={questions} width="100%"/>
                    <p>
                        Um die Fragen zu schließen, klicken Sie auf einen beliebigen Punkt im Hintergrund. Haben Sie alle
                        Fragen beantwortet, so können Sie den Reifegrad Ihres zirkulären Geschäftsmodells ausgeben lassen.
                    </p>
                    <br/>
                    <h2>Ergebnisse</h2>
                    <p>
                        Im Ergebnisfeld sehen Sie eine Auflistung aller Handlungsfelder, die nach der gewichteten Differenz zwischen Ist- und Zielbild sortiert sind.
                        Weiterhin sehen Sie die Unterschiede zwischen Ist- und Zielbild ebenfalls in Netzdiagrammen - je eines für die Dimensionen und eins für die Handlungsfelder.

                        Die Ergebnisse können Sie mithilfe der Export-Funktion in eine PDF-Datei umwandeln und speichern.
                        
                        Weiter unten finden Sie unter "Maßnahmen" eine Liste mit Handlungsempfehlungen, welche basierend auf den Top-3-Handlungsfeldern Ihrer individuellen Reifegraduntersuchung erstellt wird.
                        Wählen Sie die Maßnahmen aus, die Sie in Ihrem zirkulären Geschäftsmodell umsetzen wollen, sodass diese in die Morphologie überführt werden.
                    </p>
                    <img src={results} width="100%"/>
                    <p>
                        Nach der Auswahl Ihrer Maßnahmen gelangen Sie direkt zur Morphologie.
                    </p>
                    <br/>
                    <h2>Morphologie</h2>
                    <img src={morphology} width="100%"/>
                    <p>
                        Die Morphologie fungiert als Geschäftsmodell-Baukasten und erlaubt Ihnen, Ihr eigenes Geschäftsmodell auszugestalten.
                        Ausprägungen der Morphologie, die mit den von Ihnen ausgewählten Maßnahmen zusammenhängen, sind bereits vorausgewählt und erscheinen in grün.
                        Sollten Sie Ausprägungen an- oder abwählen wollen, so gelingt dies über einen einfachen Klick auf die jeweilige Ausprägung.

                        Auch hier können Sie die Export-Funktion nutzen, um eine PDF-Datei mit Ihrer ausgefüllten Morphologie erstellen zu lassen.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Help;
