Code review per SE2_16_173462_P

author:
- Campagnaro Enrico 172023


# User Experience

Il sito risulta molto semplice e la pagina di login è ben strutturata.
Ho notato da subito però un problema di gestione negli account nel caso in cui vengano inseriti lo stesso nome con password diverse. Probabilmente una funzionalità per il momento tralasciata ma non poco importante per un sito che richiede il login.
Nella prenotazione delle corse da scegliere ho notato che sbagliando la data, si viene reindirizzati alla pagina automatica di errore, senza gestire in nessun modo l'errore causato dall'inserimento errato per esempio con uno script.
Inoltre le prenotazioni non mi funzionano proprio sempre e bisogna per forza compiare ed incollare l'esatta data, partenza e arrivo.


# Code review

Files considerati per la review:
- userManager.js
- abbonamenti/abbonamento.html
- home/controlhome.js
- home/home.html

Analisi del codice preso in esame:
-A livello strutturale avrei messo tutte le pagine html e template in un'unica cartella client, divise anche in cartelle come lo sono nel progetto o forse meglio con un unico file di script senza suddivisioni di cartelle.
-In userManager.js si poteva pensare ad una funzione a parte per la connessione al database dato che la parte "pg.connect..." viene ripetuta più volte. Anche qui noto un'indentazione piuttosto confusionaria. Il codice risulta abbastanza poco commentato soprattutto nelle parti centrali delle chiamate. Nella chiamata a '/my_prenotazioni/' si poteva anche omettere la parte di iniziale della tabella e scriverla direttamente nel file html, per concentrarsi solo nel corpo centrale. Funzioni come lunghezza() e prenota_values(...) sarebbe più opportuno metterle in un file a parte che racchiude la modellazione dei dati in quanto queste operano con il database.
-in abbonamento.html l'indentazione dei vari elementi non è proprio ben strutturata e non capisco l'inserimento di attributi action vuoti in alcuni elementi. Per il resto il file sembra rispettare le regole.
-controlhome.js sembra essere fatto correttamente a parte sempre qualche piccolo difetto di indentazione
-home.html contiene un attributo background in body che dovrebbe essere inserito il un file css a parte. Inoltre ha il solito problema dell'indentazione


Segue il template per la code review fornito a lezione

##	General
- [ ] MVC pattern used
- [ ]	Images have been optimized

##	Markup
- [ ]	Code does not contain inline style attributes
- [x]	Code does not contain deprecated elements & attributes
- [ ]	Code is indented using hard tabs
- [x]	Tags and attributes are lowercase
- [x]	Tags are closed and nested properly (alcuni files html non sono indentati correttamente)
- [x]	Tables are only used to display tabular data
- [x]	Element IDs are unique
- [ ]	Code validates against the W3C validator
- [ ]	All user input is “sanitized” (No: quando si ordina un pasto non si capisce se la richiesta e' stata processata con successo o meno)

##	Accessibility
- [x]	Page has a proper outline (H1-H6 order)
- [ ]	Alt attributes exist on all <img> elements

##	CSS
- [ ]	Style blocks are externalized to .css files
- [x]	Consistent naming conventions are used
- [x]	CSS validates against the W3C validator (CSS is mostly the bootstrap distribution)
- [ ]	A print-friendly .css file is included in the page (non in tutte)

##	Mobile
- [x]	Functions with JavaScript turned off
- [ ]	Image file sizes do not exceed 70kb
- [X]	Appropriate use of HTML inputs (e.g. email, phone, etc) to trigger corresponding on-screen keyboards (Only input field found is a login form)

##	JavaScript
- [ ]	Script blocks are externalized to .js files (Mixed: there is both inline and externalized js)
- [ ]	Consistent naming conventions are used 
- [x]	Core page features function with JavaScript disabled
- [x]	Script blocks are placed before the closing < body > tag
- [ ]	Code has been run through JSHint (jshint.com) (No: 7 warnings)

## Code Base Checks
- [ ]  All code is checked into SVN or other source code repository
- [ ]	Client-side code is free of any references to development and staging environments, URLs, or other development settings
- [x]	Does the code completely and correctly implement the design?
- [ ]	Is the code well-structured, consistent in style, and consistently formatted? (il pattern MVC non è rispettato in quanto le separazioni non sono evidenti)
- [ ]	Are there any uncalled or unneeded procedures or any unreachable code? (No)
- [ ]	Are there any leftover stubs or test routines in the code? (No)
- [x]	Can any code be replaced by calls to external reusable components or library functions? 
- [x]	Are there any blocks of repeated code that could be condensed into a single procedure? (Yes: connection to database)
- [ ]	Are any modules excessively complex and should be restructured or split into multiple routines? 
- [ ]	Are there any redundant or unused variables?

##	Loops and branches
- [ ]	Are all loops, branches, and logic constructs complete, correct, and properly nested?
- [x]	Are the most common cases tested first in IF- -ELSEIF chains?
- [x]	Are all cases covered in an IF- -ELSEIF or CASE block, including ELSE or DEFAULT clauses?
- [x]	Does every case statement have a default?
- [ ]	Are loop termination conditions obvious and invariably achievable?
- [ ]	Are indexes or subscripts properly initialized, just prior to the loop? (No: sometimes global variables are used)
- [ ]	Can any statements that are enclosed within loops be placed outside the loops?
- [x]	Does the code in the loop avoid manipulating the index variable or using it upon exit from the loop?

## Documentation
- [ ]	Is the code clearly and adequately documented with an easy-to-maintain commenting style?
- [x]	Are all comments consistent with the code?
