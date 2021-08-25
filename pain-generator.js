const keys = `1234567890-=QWERTYUIOP[]\ASDFGHJKL;'ZXCVBNM,./`;

let positionMap = [];
let x = 0;
let y = 0;
for (let char of keys)
{
    if (char == "Q") { x = 0.5; y++; }
    else if (char == "A") { x = 0.75; y++; }
    else if (char == "Z") { x = 1.25; y++; }
    else x++;
    positionMap[char] = [x, y];
}

/*var wordsFile = new XMLHttpRequest();
wordsFile.open("GET", "https://pastebin.com/aD849rhB", true);
wordsFile.send();
wordsFile.onreadystatechange = function ()
{
    console.log("wa");
    if (wordsFile.readyState == 4 && wordsFile.status == 200)
    {
        console.log(words.responseText);
    }
}*/

let sorted;
function processWords ()
{
    const oFrame = document.getElementById("frmFile");
    const wordsTxt = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    const words = wordsTxt.split("\n");

    let typingDistanceMap = [];
    for (let word of words)
        typingDistanceMap[word] = getTypingDistance(word, true, true);

    sorted = [];
    for (let word in typingDistanceMap) sorted.push([word, typingDistanceMap[word]]);
    sorted.sort(function (a, b) { return b[1] - a[1]; });
}

function getTypingDistance (word, average = false, startAtCenter = false)
{
    let distance = 0;
    let lastPos = positionMap[startAtCenter ? "G" : word[0]]; // center key
    for (let char of word)
    {
        let pos = positionMap[char];
        distance += Math.hypot(pos[0] - lastPos[0], pos[1] - lastPos[1]);

        lastPos = pos;
    }
    return average ? distance / word.length : distance;
}

function generatePain (callback, length = 20, alternating = false)
{
    if (sorted == undefined)
    {
        console.log("retrying...");
        setTimeout(() => { generatePain(callback, length, alternating) }, 100);
        return;
    }

    let words = [];
    for (let i = 0; i < length; i++)
    {
        var offset = Math.floor(Math.random() * 0.05 * sorted.length);
        let index;
        if (alternating) index = i % 2 == 0 ? offset : sorted.length - 1 - offset;
        else index = sorted.length - 1 - offset;
        words.push(sorted[index][0]);
    }

    callback(words.join(" "));
}