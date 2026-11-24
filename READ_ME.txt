PROJEKT: Interaktywna strona edukacyjna poświęcona Józefowi Piłsudskiemu
-------------------------------------------------------------------------

1. JAK URUCHOMIĆ APLIKACJĘ:
   - Wypakuj całą zawartość folderu projektu na komputerze.
   - Otwórz plik `index.html` w dowolnej nowoczesnej przeglądarce internetowej 
     (np. Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
   - Aplikacja działa w 100% lokalnie i nie wymaga dostępu do internetu ani 
     instalacji dodatkowych serwerów czy środowisk.

2. STRUKTURA I PLIKI PROJEKTU:
   - index.html        -> Główny szkielet interfejsu oraz podstrony aplikacji.
   - css/style.css     -> Style graficzne nadające historyczny klimat epoki.
   - js/app.js         -> Logika przełączania ekranów, interakcji oraz mechanika quizu.
   - js/quiz-data.js   -> Lokalna baza pytań, wariantów odpowiedzi i wyjaśnień.
   - assets/images/    -> Grafika referencyjna / tło strony głównej.
   - assets/video/     -> Lokalny plik wideo odtwarzany w sekcji MAPA.

3. JAK EDYTOWAĆ I DODADEĆ PYTANIA DO QUIZU:
   - Otwórz plik `js/quiz-data.js` w dowolnym edytorze tekstowym (np. Notatnik, Notepad++, VS Code).
   - Każde pytanie ma strukturę obiektu w tablicy `quizData`:
     {
         question: "Treść pytania?",
         options: [
             "a) Odpowiedź pierwsza",
             "b) Odpowiedź druga",
             "c) Odpowiedź trzecia"
         ],
         correct: 0, // Indeks poprawnej odpowiedzi (licząc od 0: 0 to pierwsza, 1 to druga itd.)
         explanation: "Treść wyjaśnienia wyświetlana po udzieleniu odpowiedzi."
     }
   - Po zapisaniu pliku wystarczy odświeżyć stronę `index.html` w przeglądarce.