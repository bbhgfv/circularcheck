## Table of Contents  
[1. Benötigte Software](#benötigte-software)  
[2. JSON-Basics](#json-basics)  
[3. Editieren der Handlungen](#editieren-der-handlungen)  
[3. Editieren der Morphologie](#editieren-der-morphologie)  
<a name="headers"/>

## Benötigte Software

- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/)
- Die neueste Version des [GitHub-Repository](https://github.com/arcan0pulse/circularitycheck) 

> [!IMPORTANT]
> Falls Sie das GitHub-Repository als .zip-Archiv heruntergeladen haben, müssen Sie dieses erst entpacken!

Haben Sie alles vorbereitet, öffnen Sie Visual Studio Code. Innerhalb Visual Studio Code, öffnen Sie nun den Ordner, in dem
sich das Repository befindet. Der Datei-Explorer auf der linken Seite muss nun ungefähr so aussehen:
<br>
![File Structure](https://cdn.discordapp.com/attachments/466541614052016141/1341409583079493652/image.png?ex=67b5e486&is=67b49306&hm=6874ddfd3530fdf7ea5e20ba203a0afd80843ef5152e5d7fe0e8e47a3044614e&)

Als nächstes öffnen Sie ein neues Terminal (Strg + Shift + Ö) und führen die folgenden Kommandos in dieser Reihenfolge im Terminal aus:

`cd bachelor-project`

`npm install`

`npm audit fix`

Nun sind Sie bereit, updates an der Webseite durchzuführen.

## JSON-Basics

Unter JSON, dem Format in dem die Handlungen, Morphologie, Reifeelemente und Handlungsfelder gespeichert sind, gibt es ein
paar Regeln, die einzuhalten sind.
Schauen wir uns ein Beispiel aus `measures.json` an.
```jsonc
{
    "measure" : "Abfallaufkommen reduzieren",
    "description" : "Verringern Sie das Abfallaufkommen und die damit verbundenen stofflichen und energetischen Aufwände durch eine optimierte Kaskadennutzung.",
    "dimensions" : ["Schlüsselaktivitäten"],
    "action fields" : ["Herstellung/Produktion"],
    "characteristics" : ["Kombination aus Produkt und Dienstleistung", "Refuse"]
},
```
Die geschweiften Klammern zeigen an, dass es sich um ein Objekt handelt. Alles innerhalb der geschweiften Klammern gehört zu dem Objekt.
In diesem Beispiel ist das Objekt eine Handlung. Das Objekt hat fünf Werte: `measure, description, dimensions, action fields` und `characteristics`.
Ein Wert in einem Objekt ist immer in dem Format `"key" : <value>`, wobei `"key"` der Name des Werts ist und `<value>` mit dem entsprechenden Wert ersetzt wird.
Beachten Sie auch, dass verschiede Werte mit einem Komma getrennt werden. Dies ist unbedingt nötig, außer bei dem letzten Wert eines Objekts.

Die ersten beiden Werte in diesem Fall sind Strings, angezeigt durch die Anführungszeichen `"`. Falls Sie Anführungsstriche innerhalb des Strings haben,
stellen sie ein Backslash `\` davor, damit das Anführungszeichen als Teil des Strings erkannt wird.

Die letzten drei Werte sind Arrays, erkenntlich an den eckigen Klammern `[ ]`. In diesem Fall handelt es sich um einen Array von Strings. Einzelne Elemente
des Arrays werden mit einem Komma getrennt, wie zu sehen in `characteristics`. Ein Array kann auch ein Array von weiteren Objekten sein, also in der Form
```jsonc
{
    "meinArray" : [                     // Array
        {
            "meinObjekt" : "nummer_1"
        },                              // Erstes Objekt im Array
        {
            "meinObjekt" : "nummer_2"
        }                               // Zweites Objekt im Array
    ]
}
```

## Editieren der Handlungen

Die Handlungen sind in der Datei `measures.json` gespeichert, diese findet sich in dem Ordner `/bachelor-project/src/resources`.
Schauen wir uns eine Handlung als Beispiel an:
```jsonc
{
    "measure" : "Abfallaufkommen reduzieren",
    "description" : "Verringern Sie das Abfallaufkommen und die damit verbundenen stofflichen und energetischen Aufwände durch eine optimierte Kaskadennutzung.",
    "dimensions" : ["Schlüsselaktivitäten"],
    "action fields" : ["Herstellung/Produktion"],
    "characteristics" : [2, 23]
}
```
Um eine neue Handlung einzufügen, können Sie eine der bereits vorhandenen Handlungen einfach kopieren und wie folgt einfügen:
```jsonc
{
    "measure" : "Abfallaufkommen reduzieren",
    "description" : "Verringern Sie das Abfallaufkommen und die damit verbundenen stofflichen und energetischen Aufwände durch eine optimierte Kaskadennutzung.",
    "dimensions" : ["Schlüsselaktivitäten"],
    "action fields" : ["Herstellung/Produktion"],
    "characteristics" : [2, 23]
}, // Das Komma hier beachten!
{
    "measure" : "Abfallaufkommen reduzieren",
    "description" : "Verringern Sie das Abfallaufkommen und die damit verbundenen stofflichen und energetischen Aufwände durch eine optimierte Kaskadennutzung.",
    "dimensions" : ["Schlüsselaktivitäten"],
    "action fields" : ["Herstellung/Produktion"],
    "characteristics" : [2, 23]
}
```
Achten Sie insbesondere darauf, nicht das Komma nach der geschweiften Klammer am Ende zu vergessen.
Nun können Sie in der neuen Kopie all die Werte zu denen ändern, die zur neuen Handlung passen.
Die Werte innerhalb der Handlung sind:

- measure: Typ String, der Name der Handlung. Dieser muss einmalig sein!
- description: Typ String, die Erklärung für den Nutzer
- dimensions: Typ Array von Strings, eine Liste der verbundenen Dimensionen
- action fields: Typ Array von Strings, eine Liste der verbundenen Handlungsfelder
- characteristics: Typ Array von Numbers, eine Liste von IDs der verbundenen Charakteristiken aus der Morphologie

Um eine existierende Handlung oder ihre Verbindungen zu z.B. Handlungsfeldern zu bearbeiten, finden Sie die zu ändernde Handlung
und schreiben Sie einfach die zu ändernden Werte um.

> [!IMPORTANT]
> Besonders bei den Listen der Dimensionen und Handlungsfelder ist auf Groß- und Kleinschreibung zu achten!
> Stimmen diese nicht genau mit der Schreibweise in den anderen Dateien überein, wird der Zusammenhang nicht erkannt!

## Editieren eines Handlungsfeldes

Die Handlungsfelder sind in der Datei `maturity_elements.json` gespeichert, diese findet sich in dem Ordner `/bachelor-project/src/resources`.
Schauen wir uns erneut ein Beispiel hierzu an:
```jsonc
{
    "action field" : "Zielgruppendefinition",
    "weight" : 88,
    "description" : "In diesem Handlungsfeld wird die Zielgruppe des Unternehmens untersucht. Hierbei wird unter anderem auf die Unterscheidung zwischen Eigentum und Funktionalität, das Kaufverhalten der Kundengruppe sowie die Nutzung von Rückführungsmöglichkeiten eingegangen.",
    "elements" :
    [
        ... // Für den Inhalt von elements, siehe unten
    ]
}
```

Genau wie oben bei den Handlungen beschrieben, können Sie ein existierendes Handlungsfeld duplizieren und die Werte anpassen. Auch hier ist wieder auf das Komma zu achten, wenn Sie ein neues Handlungsfeld eintragen.
Die Werte eines Handlungsfeldes sind:

- action field: Typ String, der Name vom Handlungsfeld.
- weight: Typ Number, das Gewicht vom Handlungsfeld. Die Gewichte sind relativ, d.h. das eingetragene Gewicht wird durch die Summe der Gewichte
aller Handlungsfelder geteilt. Das heißt insbesondere, dass das Erhöhen eines Gewichts alle anderen senkt.
- description: Typ String, eine Beschreibung für das Handlungsfeld welche in einem Tooltip angezeigt wird.

Zuletzt der Wert elements: Typ Array von Objekten. Schauen wir uns auch hier ein Beispiel an.
```jsonc
"elements" :
    [
        {
            "name" : "Produktbetrachtung",
            "description" : "Dieses Reifeelement zielt darauf ab, wie Ihre Kunden das Produkt betrachten. Steht das Eigentum oder die Funktionalität im Fokus des Kunden?",
            "weight" : 0.4,
            "levels" :
            [
                "Der Kunde will das Produkt als Eigentum erwerben. Das Eigentum steht über der Funktionalität.",
                "Der Kunde verhält sich indifferent. Eigentum und Funktionalität sind gleichbedeutend.",
                "Der Kunde kauft das Produkt nicht als Eigentum, sondern als Funktionalität. Die Funktionalität steht über dem Eigentum."
            ]
        },
        {
            "name" : "Kaufverhalten",
            "description" : "Dieses Reifeelement beschreibt das Kaufverhalten Ihrer Kunden. Dabei geht es besonders um die Bedeutung der Langlebigkeit der Produkte für den Kunden.",
            "weight" : 0.2,
            "levels" :
            [
                "Die Kunden ersetzen das Produkt trotz vollständiger Funktionalität (z.B. weil eine neuere Version auf den Markt kommt).",
                "Die Kunden nutzen nur den Mängelhaftungszeitraum, um die Funktionalität zu sichern.",
                "Die Kunden wollen den Produktlebenszyklus maximieren. Dafür werden z.B. Wartung/ Reparatur auch nach der Mängelhaftungsfrist in Anspruch genommen oder wiederaufbereitete Produkte genutzt."
            ]
        }
    ]
```
Hier ist ein Array "elements" mit zwei Objekten. Jedes Objekt ist eine Frage in dem Aktionsfeld.
Ein Objekt muss die folgenden Werte haben:

- name: Typ String, der Titel der Frage
- description: Typ String, die zu stellende Frage
- weight: Typ Number das Gewicht innerhalb des Handlungsfeldes, beachten Sie dass die Gewichte der Fragen summiert 1 ergeben.
- levels: Typ Array von Strings, die möglichen Antworten. Die Antworten müssen so sortiert sein, dass die "schlechteste" zuerst kommt und die "beste" zuletzt.

Um das Handlungsfeld dann tatsächlich ins Modell einzufügen, müssen Sie nun in die Datei `model.json`, im selben Ordner.
Hier suchen Sie sich die Dimension raus, in die das Handlungsfeld soll, und tragen es in das zugehörige Array `action fields` mit ein.

## Editieren der Morphologie

Die Morphologie finden Sie in der Datei `morphology.json`. Die Morphologie besteht aus vier ineinander verschachtelten Dimensionen:
```jsonc
{
    "name" : "Produkt- & Dienstleistungsorientierung",
    "lower dimensions" : [
        ... // Hier die nächste untere Dimension
    ]
}
```
In das Array `"lower dimensions"` kommen nun all die Dimensionen, welche
direkt unter dieser liegen (diese folgen dem selben Format).

Falls es sich um die vierte, unterste Dimension handelt. sieht es etwas anders aus:
```jsonc
{
    "name" : "Produkt- & Dienstleistungsorientierung (Was genau wird angeboten?)",
    "characteristics" : [
        [0, "Produkt"],
        [1, "Dienstleistung"],
        [2, "Kombination aus Produkt und Dienstleistung"]
    ]
}
```
Es ändert sich das Array `"lower dimensions"` zu dem Array `"characteristics"`. Dieses beinhaltet nun weitere Arrays. Jedes dieser Arrays repräsentiert eine Charakteristik innerhalb dieser untersten Dimension. Links im Array ist eine ID-Nummer, welche einzigartig sein muss. Diese müssen nicht zwangsläufig in Reihe sein, Sie können eine beliebige Zahl in beliebiger Reihenfolge wählen, <it>solange diese noch nicht verwendet wird!</it>

> [!IMPORTANT]
> Sie können beliebig viele Dimensionen hinzufügen oder entfernen, aber beachten Sie, dass Charakteristiken NUR in der vierten Dimension erscheinen können!

Um neue Dimensionen hinzuzufügen, orientieren Sie sich ähnlich wie bei den anderen Dateien an den bereits existierenden Dimensionen, um die korrekte Syntax beizubehalten.

## Hochladen eines Updates auf die Webseite
Zuerst speichern Sie alle Dateien in Visual Studio Code ab (Strg + S). Nun öffnen Sie ein neues Terminal (Strg + Shift + Ö) und führen die folgenden Kommandos aus:

`cd bachelor-project`

`npm run build`


Dies wird neben dem Ordner "src" einen weiteren Ordner "dist" erstellen (oder falls dieser bereits existiert, die Inhalte aktualisieren). Loggen Sie sich zunächst auf dem [Web-Interface](https://whs01.hrz.tu-darmstadt.de:8443/smb/web/view) der Webseite ein. Haben Sie sich angemeldet, sollten Sie dieses Interface sehen.


![image](https://github.com/user-attachments/assets/dcad9c48-31ab-4d9c-9435-6ac73588fae4)


Klicken Sie hier auf "Files". Das wird Sie zu diesem Fenster weiterleiten:


![image](https://github.com/user-attachments/assets/d51a3b1b-50c5-459b-a1ea-44a1f2914694)


Hier klicken Sie auf das blaue + und dann auf Upload File. Wählen Sie hier die Datei index.html aus Ihrem dist-Ordner aus. Plesk wird Sie fragen, ob Sie die Datei ersetzen wollen, was Sie bestätigen.
Nun navigieren Sie auf Plesk in den Ordner assets. Hier wählen Sie alle Dateien aus und löschen sie, indem sie auf Remove klicken. Sobald das getan ist, klicken Sie erneut auf das blaue + und Upload File. Jetzt laden Sie die Inhalte von dem Ordner assets hoch (nicht den Ordner selbst!), Sie können alle Dateien auf einmal auswählen und hochladen.

Damit ist es schon getan, das Update ist hochgeladen. Besuchen Sie die Webseite und schauen Sie nach ihren Änderungen um sicherzustellen, dass alles geklappt hat.
