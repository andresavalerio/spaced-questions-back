CREATE TYPE UserRole AS ENUM ('Free', 'Premium');
CREATE TYPE FlashcardAge AS ENUM (
    'New',
    'Learning',
    'Review',
    'Young',
    'Mature',
    'Relearn'
);
CREATE TYPE FlashcardType AS ENUM ('Basic', 'BasicRev', 'Typing', 'TypingRev');
CREATE TYPE Rating AS ENUM ('Null', 'Bad', 'Fail', 'Pass', 'Good', 'Bright');
CREATE TABLE User (
    username text NOT NULL,
    email text NOT NULL,
    pass text NOT NULL,
    createdAt timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    firstName text NOT NULL,
    lastName text NOT NULL,
    active boolean NOT NULL,
    photoURL text NOT NULL,
    userRole UserRole DEFAULT 'Free',
    PRIMARY KEY (username)
);
CREATE TABLE Accounting (
    username text NOT NULL,
    availableCredits int NOT NULL,
    currencyType char(3) NOT NULL,
    currencyName text NOT NULL,
    paymentMethod text NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (username) REFERENCES User(username)
);
CREATE TABLE Notebook (
    notebookId text NOT NULL,
    notebookName text NOT NULL,
    owner text NOT NULL,
    PRIMARY KEY (notebookId),
    FOREIGN KEY (owner) REFERENCES User(username)
);
CREATE TABLE Flashcard (
    flashcardId text NOT NULL,
    owner text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    age FlashcardAge NOT NULL,
    type FlashcardType NOT NULL,
    PRIMARY KEY (flashcardId),
    FOREIGN KEY (owner) REFERENCES User(username)
);
CREATE TABLE Note (
    notebookId text NOT NULL,
    noteId text NOT NULL,
    content text NOT NULL,
    title text NOT NULL,
    PRIMARY KEY (noteId),
    FOREIGN KEY (notebookId) REFERENCES Notebook(notebookId)
);
CREATE TABLE FlashcardReference (
    flashcardId text NOT NULL,
    noteId text NOT NULL,
    PRIMARY KEY (flashcardId, noteId),
    FOREIGN KEY (noteId) REFERENCES Note(noteId),
    FOREIGN KEY (flashcardId) REFERENCES Flashcard(flashcardId)
);
CREATE TABLE FlashcardExecution (
    flashcardId text NOT NULL,
    datetimeExec timestamp with time zone DEFAULT CURRENT_TIMESTAMP userInput text NOT NULL,
    timeElapsed time NOT NULL,
    answerDiff text NOT NULL,
    systemRating Rating NOT NULL,
    userRating Rating NOT NULL,
    PRIMARY KEY (flashcardId, datetimeExec),
    FOREIGN KEY (flashcardId) REFERENCES Flashcard(flashcardId),
);