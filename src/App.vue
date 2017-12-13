<template>
<div id="app">

<section class="hero is-success">
  <!-- Hero head: will stick at the top -->
<div class="hero-head">
  
  <header class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item">
          Thin Mint Calculator
        </a>
      </div>
    </div>
  </header>

</div>

  <!-- Hero content: will be in the middle -->
<div class="hero-body">
  <div class="container has-text-centered">

    <img src="./assets/cookie.svg" />
    <h1 class="title is-size-3" style="margin-top:30px;">
      Depressing Thin Mint Equivalency Calculator
    </h1>

    <div class="column is-4 is-offset-4">
<!--       <b-field>
        <b-input placeholder="Number of cookies"
          size="is-large"
          v-model.number="cookiesInput"
          min="0"
          max="1000"
          type="number">
        </b-input>
      </b-field> -->

        <div class="form-group" v-bind:class="{ 'form-group--error': $v.age.$error }">
    <input class="input is-large form__input" v-model.trim="cookiesInput" type="number" @blur="$v.age.$touch()" @input="handleInput" placeholder="Number of cookies">
  </div><span class="form-group__message" v-if="!$v.age.between">Must be between {{$v.age.$params.between.min}} and {{$v.age.$params.between.max}}</span>
<!--   <pre>age: {{ $v.age }}</pre>
 -->

      <h2 class="subtitle">Cookies: {{ cookiesInput2 }}</h2>
    </div>
  </div>
</div>
</section>
<section class="hero is-success">
  <div class="container has-text-centered">
    <div class="column is-10 is-offset-1">
      <span v-for="sleeve in sleeves" :key="sleeve.id" v-if="sleeve < 4"><img src="./assets/sleeve.svg"></span>
      <span v-for="singleCookie in singleCookies" :key="singleCookie.id" v-if="singleCookie <18"><img width="50" src="./assets/cookie.svg"></span>
    </div>

    <h2 class="subtitle">Calories: {{ calories }}</h2>
    <h2 class="subtitle">Sleeves: {{ sleeves }}</h2>
    <h2 class="subtitle">Single Cookies: {{ singleCookies }}</h2>



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
      cookiesInput: null,
      cookiesInput2: null
    }
  },
  computed: {
    singleCookies: function () {
      var a = this.cookiesInput2 % 18
      return a
    },
    calories: function () {
      return this.cookiesInput2 * 40
    },
    sleeves: function () {
      return Math.floor(this.cookiesInput2 / 18)
    }
  },
  validations: {
    age: {
      between: between(20, 30)
    }
  },
  methods: {
    handleInput: function (event) {
      var value = Number(event.target.value)
      if (value > 1000) {
        this.cookiesInput2 = 1000
      } else if (value < 0 || Number.isNaN(value)) {
        this.cookiesInput = 0
      } else {
        this.cookiesInput2 = this.cookiesInput
      }
    }
  }
}
</script>

<style>
.hero.is-success {
  background-color: #27ae60;
}
.meow {
  background-color: black;
}
</style>
