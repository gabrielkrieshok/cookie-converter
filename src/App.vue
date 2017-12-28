<template>
<div id="app">

<section class="hero is-primary">
<div class="hero-body">
  <div class="container has-text-centered">
    <div class="column is-10 is-offset-1">

    <img src="./assets/cookie.svg" />
    <h1 id="headline" class="title is-size-1">
      Depressing Cookie Calorie Converter
    </h1>
    <h1 class="subtitle is-size-5">
      Not affiliated or associated with <strong><a href="http://www.girlscouts.org/en/cookies/all-about-cookies/Meet-the-Cookies.html">Girl Scout Thin Mint Cookies</a></strong> — but those are objectively the most delicious cookies.
    </h1>

    <div class="column is-4 is-offset-4">
      <div class="form-group" v-bind:class="{ 'form-group--error': $v.cookies.$error }">
        <input class="input is-large form__input" v-model.trim="cookiesInput" type="number" @blur="$v.cookies.$touch()" @input="handleInput" placeholder="Cookies">
      </div>

      <span class="form-group__message" >Enter a number between 1 and 10,000
      </span>

      <div id="cookies" class="column is-10 is-offset-1">
        <transition-group name="slide-fade">
          <span v-for="sleeve in sleeves" :key="sleeve"><img src="./assets/sleeve.svg" style="vertical-align: top;"/>
          </span>
        </transition-group>
      </div>

      <div class="column is-10 is-offset-1">
        <transition-group name="slide-fade">
          <span v-for="singleCookie in singleCookies" :key="singleCookie" v-if="singleCookie <18"><img width="50" src="./assets/cookie.svg" style="vertical-align: top;">
          </span>
        </transition-group>
      </div>
    </div>
    <transition name="long">
      <h1 class="subtitle is-size-4" v-show="cookiesInput>0">Weighing in at <strong>{{ caloriesDisplay }}</strong> calories, it will take this long [<span class="is-size-5"><a href="https://www.health.harvard.edu/diet-and-weight-loss/calories-burned-in-30-minutes-of-leisure-and-routine-activities">source</a></span>] of one of these activities to burn off ...
      </h1> 
    </transition>


      <nav class="level" v-show="cookiesInput>0">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-2">🏃</p>
            <p class="heading">Running</p>
            <p class="title is-size-4">{{ running }} Minutes</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-2">🏊</p>
            <p class="heading">Swimming</p>
            <p class="title is-size-4">{{ swimming }} Minutes</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-2">🧘</p>
            <p class="heading">Yoga</p>
            <p class="title is-size-4">{{ yoga }} Minutes</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-2">💺</p>
            <p class="heading">Sitting</p>
            <p class="title is-size-4">{{ sitting }} Minutes</p>
          </div>
        </div>
      </nav>
    </div>
  </div>
</div>
  <div class="hero-foot">
    <div class="container">
      <div class="column is-10 is-offset-1 has-text-centered">
        <h1 class="title is-size-6">Made with ♥ by <a href="https://gabrielkrieshok.com">Gabriel Krieshok</a> as a way to learn <a href="https://vuejs.org">Vue.js</a>, hosted on <a href="https://github.com/gabrielkrieshok/mint">Github</a>.</h1>
      </div>
    </div>
  </div>
</section>
</div>
</template>

<script>
import { between } from 'vuelidate/lib/validators' // required, minLength

export default {
  name: 'app',
  data () {
    return {
      cookiesInput: null,
      cookiesInputCleaned: null
    }
  },
  computed: {
    singleCookies: function () {
      var a = this.cookiesInputCleaned % 18
      return a
    },
    caloriesCalculator: function () {
      return this.cookiesInputCleaned * 40
    },
    caloriesDisplay: function () {
      return this.caloriesCalculator.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    sleeves: function () {
      return Math.floor(this.cookiesInputCleaned / 18)
    },
    running: function () {
      return (this.caloriesCalculator / 6.67).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    swimming: function () {
      return (this.caloriesCalculator / 8.87).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    yoga: function () {
      return (this.caloriesCalculator / 5.93).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    sitting: function () {
      return (this.caloriesCalculator / 1.67).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  validations: {
    cookies: {
      between: between(0, 10000)
    }
  },
  methods: {
    handleInput: function (event) {
      var value = Number(event.target.value)
      if (value > 10000) {
        this.cookiesInput = 10000
      } else if (value < 0 || Number.isNaN(value)) {
        this.cookiesInput = null
      } else {
        this.cookiesInputCleaned = this.cookiesInput
      }
    }
  }
}
</script>



<style lang = "scss">

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #1e965b;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

html {
  background-color: $primary;
}

.title {
  margin-top: 30px;
}

#headline {
  margin-bottom: 50px;
}

.form-group {
  margin-bottom: 0px;
}

.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s ease;
}

.long-enter-active, .long-leave-active {
  transition: opacity 5s;
}

.long-enter, .long-leave-leave-to {
  opacity: 0;
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(0px);
  opacity: 0;
}

.underline {
  text-decoration: underline dotted;
}

#cookies {
  margin-top: 30px;
}

a {
  border-bottom: 1px dashed #fff;
  padding-bottom: 2px;
}
</style>
