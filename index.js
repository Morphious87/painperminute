// constants
const writtenText = document.getElementsByClassName("writtenText")[0];
const wrongText = document.getElementsByClassName("wrongText")[0];
const remainingText = document.getElementsByClassName("remainingText")[0];
const resultText = document.getElementsByClassName("resultText")[0];
const STATE_LOADING = 0; const STATE_IDLE = 1; const STATE_STARTED = 2; const STATE_ENDED = 3;

// variables
let typedString = "";
let expectedString = "";
let mistakes = 0;
let hasMistake = false;
let state = STATE_LOADING;
let startTime;

// begin loading
generatePain((str) => { expectedString = str; updateElements(); state = 1; });

// functions
window.addEventListener('keydown', function (e)
{
    if (state == STATE_LOADING || state == STATE_ENDED) return;

    const c = e.keyCode;
    if ((c >= 65 && c <= 90) || c == 32 || c == 8)
    {
        if (c == 8)
            typedString = typedString.slice(0, typedString.length - 1);
        else if (typedString.length < expectedString.length)
        {
            typedString += String.fromCharCode(c);
            if (state == STATE_IDLE)
            {
                state = STATE_STARTED;
                startTime = Date.now();
            }
            else if (state == STATE_STARTED && typedString == expectedString)
            {
                state = STATE_ENDED;
                let secondsPassed = (Date.now() - startTime) / 1000;
                let wpm = Math.floor(expectedString.split(" ").length / (secondsPassed / 60));
                resultText.innerHTML = `Awesome!<br><br>Your WPM is ${wpm}.<br>You have made ${mistakes} mistake${mistakes == 1 ? "" : "s"}.`;
            }
        }

        updateElements();
    }
}, false);

function updateElements ()
{
    writtenText.textContent = "";
    wrongText.textContent = "";
    for (let i = 0; i < typedString.length; i++)
    {
        const expectedChar = expectedString[i];
        const typedChar = typedString[i];
        if (typedChar != expectedChar)
        {
            writtenText.textContent = typedString.slice(0, i);
            wrongText.textContent = expectedString.slice(i, typedString.length);
            if (!hasMistake)
            {
                hasMistake = true;
                mistakes++;
            }
            break;
        }

        if (i == typedString.length - 1)
        {
            hasMistake = false;
            writtenText.textContent = typedString.slice(0, typedString.length);
        }
    }

    remainingText.textContent = expectedString.slice(typedString.length, expectedString.length);
}
