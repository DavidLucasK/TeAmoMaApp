// textUtils.ts
export const getRandomTextos = (
    textos1: string[],
    textos2: string[],
    textos3: string[],
    textos4: string[],
    textos5: string[],
    textos6: string[],
    textos7: string[],
    textos8: string[],
    textos9: string[],
    textos10: string[],
    textos11: string[]
) => {
    const randomIndex = Math.floor(Math.random() * 11); // Gera um número aleatório entre 0 e 10
    switch (randomIndex) {
        case 0:
            return textos1;
        case 1:
            return textos2;
        case 2:
            return textos3;
        case 3:
            return textos4;
        case 4:
            return textos5;
        case 5:
            return textos6;
        case 6:
            return textos7;
        case 7:
            return textos8;
        case 8:
            return textos9;
        case 9:
            return textos10;
        case 10:
            return textos11;
        default:
            return textos1; // Fallback
    }
};

export const typeWriter = (
    text: string,
    index: number,
    setTypedText: (text: string) => void,
    callback: () => void
) => {
    if (index < text.length) {
        setTypedText((prev) => prev + text[index]); // Adiciona o próximo caractere
        setTimeout(() => typeWriter(text, index + 1, setTypedText, callback), 20); // Tempo de digitação
    } else {
        // Quando a linha é completada, chama o callback após um pequeno atraso
        setTimeout(() => {
            setTypedText((prev) => prev + '\n'); // Adiciona uma nova linha após cada texto
            callback();
        }, 1000); // Tempo de espera antes de iniciar a próxima linha (1 segundo)
    }
};