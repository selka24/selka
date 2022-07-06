<template>
    <div class="col-md-12 col-sm-12" style="margin-right: auto;padding: 40px;">
        <h2 class="register-header">Account</h2>
        <formulate-form @submit="submit">
            <formulate-input label="Email*"
                             type="email"
                             validation="required|email"
                             error-behavior="live"
                             v-model="email"/>

            <div class="d-flex flex-wrap gap-1 w-100">
                <FormulateInput
                    class="col-md-6"
                    label="New password"
                    type="password"
                    name="password"
                    validation="^required|min:8,length"
                />
                <FormulateInput
                    class="col-md-6"
                    label="Confirm password"
                    type="password"
                    name="password_confirm"
                    validation="^required|min:8,length|confirm"
                    validation-name="Password confirmation"
                />
            </div>
            <FormulateInput
                type="checkbox"
                label="I agree to the processing of data *"
                name="terms"
                v-model="accepted"
                validation="accepted"
            />
        </formulate-form>


<!--        <formulate-input label="Password*"-->
<!--                         type="password"-->
<!--                         error-behavior="live"-->
<!--                         validation="^required|min:8,length"-->
<!--                         v-model="password"/>-->

    </div>
</template>

<script>
export default {
    name: "register",
    data(){
        return {
            email: '',
            password: '',
            accepted: false,
        }
    },
    methods:{
        submit(){

        }
    }
}
</script>

<style scoped>

</style>
