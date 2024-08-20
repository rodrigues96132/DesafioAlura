const shift = 3;

function encryptText() {
    const input = document.getElementById('inputText').value;
    const encrypted = caesarCipher(input, shift);
    const resultText = `
        <strong>Texto Criptografado:</strong> ${encrypted}<br>
    `;
    document.getElementById('resultText').innerHTML = resultText;
    document.getElementById('img').style.display = 'none';
}

function decryptText() {
    const resultElement = document.getElementById('resultText');
    const resultHTML = resultElement.innerHTML;
    const match = resultHTML.match(/Texto Criptografado:<\/strong> (.*?)<br>/);
    if (match) {
        const encrypted = match[1];
        const decrypted = caesarCipher(encrypted, -shift);
        const resultText = `
            <strong>Texto Descriptografado:</strong> ${decrypted}
        `;
        resultElement.innerHTML = resultText;
    } else {
        alert('Nenhum texto criptografado encontrado para descriptografar.');
    }
    
    document.getElementById('img').style.display = 'none';
}

function copyEncryptedText() {
    const resultElement = document.getElementById('resultText');
    const resultHTML = resultElement.innerHTML;
    const match = resultHTML.match(/Texto Criptografado:<\/strong> (.*?)<br>/);
    if (match) {
        const encrypted = match[1];
        const textarea = document.createElement('textarea');
        textarea.value = encrypted;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999); 
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Texto criptografado copiado: ' + encrypted);
    } else {
        alert('Nenhum texto criptografado encontrado para copiar.');
    }
}

function caesarCipher(text, shift) {
    return text.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
            return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26 + 26) % 26 + 97);
        } else if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26 + 26) % 26 + 65);
        } else {
            return char;
        }
    }).join('');
}