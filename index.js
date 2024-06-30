const inputValue = document.getElementById("inputValue")
const search = document.querySelector(".icon-search")
const changeWord = document.getElementById("word-change")
const meaningWord = document.getElementById("meaningWord")
const partOfSpeech = document.getElementById("partOfSpeech")


const searchDef = () => {

    let word = inputValue.value;

    const data = async (word) => {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        try {

            let response = await fetch(url)

            let results = await response.json();

            console.log(results[0])

            changeWord.textContent = word;

            const result2 = results[0].meanings.map((meaning) => ({
                def: meaning.definitions.map((meaning) => ({
                    meaning: meaning.definition
                }))
            }))

            // meaningWord.textContent = result2[0].def.map((mean)=>{return mean.meaning})

            // console.log(result2[0])

            const val = result2[0].def.map((mean) =>  mean.meaning)
            for (let index = 0; index < val.length; index++) {
                const wordArrange = document.createElement("p")
                wordArrange.className = "wordArran"
                wordArrange.textContent = val[index]
                meaningWord.appendChild(wordArrange)
            }

            let upper = results[0].meanings[0].partOfSpeech

            partOfSpeech.textContent = upper.toUpperCase()


            // meaningWord.appendChild(wordArrange)

        } catch (error) {
            console.log(error.response);
        }

        console.log(url)
    }

    data(word)

    inputValue.value = ""

    // console.log(input)


}


inputValue.addEventListener('keydown', (e) => {

    if (e.key === "Enter") {
        e.preventDefault();
        searchDef();
    }

})