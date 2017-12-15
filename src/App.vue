<template>
<div id="app">

<section class="hero is-primary">
  <!-- Hero head: will stick at the top -->
<div class="hero-head">

</div>

  <!-- Hero content: will be in the middle -->
<div class="hero-body">
  <div class="container has-text-centered">

    <img src="./assets/cookie.svg" />
    <h1 class="title is-size-1" style="margin-top:30px;">
      Depressing Thin Mint Equivalency Calculator
    </h1>
    <div class="column is-4 is-offset-4">

      <div class="form-group" v-bind:class="{ 'form-group--error': $v.cookies.$error }" style="margin-bottom: 30px;">
    <input class="input is-large form__input" v-model.trim="cookiesInput" type="number" @blur="$v.cookies.$touch()" @input="handleInput" placeholder="number of cookies">
  </div><span class="form-group__message" v-if="!$v.cookies.between">Must be between {{$v.cookies.$params.between.min}} and {{$v.cookies.$params.between.max}}</span>

    <div class="column is-10 is-offset-1">
      <span v-for="sleeve in sleeves" :key="sleeve.id" v-if="sleeve < 4"><img src="./assets/sleeve.svg"></span>
      <span v-for="singleCookie in singleCookies" :key="singleCookie.id" v-if="singleCookie <18"><img width="50" src="./assets/cookie.svg"></span>
    </div>

    <h1 class="title is-size-2" v-show="cookiesInput>0">{{ caloriesDisplay }} Calories</h1>
    <!-- <h2 class="subtitle">Sleeves: {{ sleeves }}</h2> -->
    <!-- <h2 class="subtitle">Single Cookies: {{ singleCookies }}</h2> -->
    </div>
  <transition name="slide-fade">

<nav class="level" v-show="cookiesInput>0">

      <div class="level-item has-text-centered">
    <div>
      <p class="heading is-size-2">🏃</p>
      <p class="heading">Running</p>
      <p class="title">{{ running }} Minutes</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading is-size-2">🏊</p>
      <p class="heading">Swimming</p>
      <p class="title">{{ swimming }} Minutes</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading is-size-2">🧘</p>
      <p class="heading">Yoga</p>
      <p class="title">{{ yoga }} Minutes</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading is-size-2">💺</p>
      <p class="heading">Sitting</p>
      <p class="title">{{ sitting }} Minutes</p>
    </div>
  </div>
</nav>
</transition>
  </div>


<br /><br /><br /><br /><br /><br />

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
      cookiesInput: null
    }
  },
  computed: {
    singleCookies: function () {
      var a = this.cookiesInput % 18
      return a
    },
    caloriesCalculator: function () {
      return this.cookiesInput * 40
    },
    caloriesDisplay: function () {
      return this.caloriesCalculator.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    sleeves: function () {
      return Math.floor(this.cookiesInput / 18)
    },
    running: function () {
      return (this.caloriesCalculator / 6.67).toFixed(0)
    },
    swimming: function () {
      return (this.caloriesCalculator / 8.87).toFixed(0)
    },
    yoga: function () {
      return (this.caloriesCalculator / 5.93).toFixed(0)
    },
    sitting: function () {
      return (this.caloriesCalculator / 1.67).toFixed(0)
    }
  },
  validations: {
    cookies: {
      between: between(0, 1000)
    }
  },
  methods: {
    handleInput: function (event) {
      var value = Number(event.target.value)
      if (value > 1000) {
        this.cookiesInput = 1000
      } else if (value < 0 || Number.isNaN(value)) {
        this.cookiesInput = 0
      } else {
        this.cookiesInput2 = this.cookiesInput
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

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
