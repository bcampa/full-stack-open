sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser redraws the notes, adding the new note
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa<br>{"content":"single page app does not reload the whole page","date":"2019-05-25T15:15:59.905Z"}
    activate server
    Note left of server: The server adds the note in the body of the request to its array of notes
    server-->>browser: {"message":"note created"}
    deactivate server