const inputValue = document.getElementById("inputValue")
const search = document.querySelector(".icon-search")
const changeWord = document.getElementById("word-change")
const meaningWord = document.getElementById("meaningWord")
const partOfSpeech = document.getElementById("partOfSpeech")
const meaningExample = document.getElementById("meaningExample")
const examples = document.getElementById("examples")


const searchDef = () => {

    let word = inputValue.value;

    const data = async (word) => {


        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        try {

            let response = await fetch(url)

            let results = await response.json();

            console.log(results[0].meanings[0].definitions.map((e)=>e.example))

            changeWord.textContent = word;

            const result2 = results[0].meanings.map((meaning) => ({
                def: meaning.definitions.map((meaning) => ({
                    meaning: meaning.definition
                }))
            }))

            const val = result2[0].def.map((mean) => mean.meaning)

            for (let index = 0; index < val.length; index++) {

                const mea = document.createElement("p")
                mea.innerHTML = "Meaning"
                mea.className = "styyle"

                const wordArrange = document.createElement("p")


                wordArrange.className = "wordArran"
                wordArrange.textContent = val[index]

                wordArrange.appendChild(mea)
                meaningWord.appendChild(wordArrange)

            }

            const examp = results[0].meanings[0].definitions.map((e)=>e.example)

            // examples.textContent = examp

            for (let index = 0; index < examp.length; index++) {

                const meaExample = document.createElement("p")
                meaExample.innerHTML = "Example"
                meaExample.className = "styleExample"

                const wordArrangeTwo = document.createElement("p")
                wordArrangeTwo.className = "wordArran"
                wordArrangeTwo.textContent = examp[index]

                wordArrangeTwo.appendChild(meaExample)
                examples.appendChild(wordArrangeTwo)

            }

            let upper = results[0].meanings[0].partOfSpeech

            partOfSpeech.textContent = upper.toUpperCase()


            // meaningWord.appendChild(wordArrange)

        } catch (error) {
            console.log(error.response);
        }

        console.log(url)
    }


    meaningWord.textContent = '';
    examples.textContent = '';

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