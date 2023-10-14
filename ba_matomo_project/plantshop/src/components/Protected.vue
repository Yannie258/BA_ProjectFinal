<template>
  <div>
    <div class="container text-center">
      <h2>Please enter password to access this page.</h2>

      <div class="row">
        <div class="col-md-6 offset-md-3">
          <form v-on:submit.prevent="validateBeforeSubmit">
            <div class="form-group text-left">
              <label class="custom-label control-label">Password</label>
              <input class="form-control password-field" type="password" name="password" v-model.trim="password">
              <span class="error help-block" ></span>
            </div>
            <div class="text-danger" v-if="error"><p>Incorrect password.</p></div>
            <button class="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storageHelper from 'storage-helper'
export default {
  data () {
    return {
      error: null,
      password: null
    }
  },
  methods: {
    validateBeforeSubmit () {
      if (this.password === 'replace-this-with-your-password') {
        this.error = false
        storageHelper.setItem('user-password', this.password)
        // eslint-disable-next-line no-undef
        router.push('/$i18n.locale')
      } else {
        this.error = true
      }
    }
  }
}
</script>