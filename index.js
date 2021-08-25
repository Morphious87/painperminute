// constants
const writtenText = document.getElementsByClassName("writtenText")[0];
const wrongText = document.getElementsByClassName("wrongText")[0];
const remainingText = document.getElementsByClassName("remainingText")[0];
let expectedString = "";

generatePain((str) => { expectedString = str; updateElements(); });

// variables
let typedString = "";

// functions
window.addEventListener('keydown', function (e)
{
    const c = e.keyCode;
    if ((c >= 65 && c <= 90) || c == 32 || c == 8)
    {
        if (c == 8)
            typedString = typedString.slice(0, typedString.length - 1);
        else if (typedString.length < expectedString.length)
            typedString += String.fromCharCode(c);

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
            break;
        }

        if (i == typedString.length - 1)
            writtenText.textContent = typedString.slice(0, typedString.length);
    }

    remainingText.textContent = expectedString.slice(typedString.length, expectedString.length);
}
