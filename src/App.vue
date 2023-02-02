<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else>Language: {{  currentLanguage }}</p>
    <input type="text" v-model="textToTranslate" />
    <button @click="translate">Translate</button>
    <p v-if="translationDone">Translation is done: {{ translatedText }}</p>
    <button v-if="translationDone" @click="goToOriginalPage">Go back to original page</button>
  </div>
</template>
<script>
import axios from 'axios';

export default {
data() {
return {
textToTranslate: '',
translationComplete: false,
translatedText: '',
currentLanguage: 'en' 
};
},
computed: {
loading() {
return this.$store.state.loading;
}
},
methods: {
async translate() {
this.translationDone = false;

  if (!this.currentLanguage) {
    try {
      const response = await axios.post('https://google-translate1.p.rapidapi.com/language/detect', {
        text: this.textToTranslate
      }, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': '6bfed0b588mshe2ece70985e9f9fp10e5aajsnf638a2326ae2',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        }
        
      });

      this.currentLanguage = response.data.language;
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const response = await axios.post('https://google-translate1.p.rapidapi.com/language/translate/v2', {
      text: this.textToTranslate,
      source: 'en',
      target: this.currentLanguage
    }, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '6bfed0b588mshe2ece70985e9f9fp10e5aajsnf638a2326ae2',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      }
    });

    this.translatedText = response.data.translatedText;
    this.translationDone = true;
  } catch (error) {
    console.error(error);
  }
},
goToOriginalPage() {
  this.$router.push({ path: '/original-page' });
}
}
};
</script>



