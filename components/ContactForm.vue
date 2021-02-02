<template>
	<el-form
		name="contact-form"
		class="contact-form"
		:model="contactForm"
		:rules="rules"
		ref="contact-form"
		label-width="auto"
		label-position="right"
		data-netlify="true"
		netlify-honeypot="bot-field"
		status-icon
	>
		<input type="hidden" name="form-name" value="contact-form" />

		<el-form-item :label="this.$t('contact_me.titles.name')" prop="name">
			<el-input
				v-model="contactForm.name"
				:placeholder="this.$t('contact_me.copy.name_placeholder')"
				required
			></el-input>
		</el-form-item>

		<el-form-item :label="this.$t('contact_me.titles.email')" prop="email">
			<el-input
				v-model="contactForm.email"
				type="email"
				:placeholder="this.$t('contact_me.copy.email_placeholder')"
			></el-input>
		</el-form-item>

		<el-form-item :label="this.$t('contact_me.titles.message')" prop="message">
			<el-input
				type="textarea"
				v-model="contactForm.message"
				:placeholder="this.$t('contact_me.copy.message_placeholder')"
				:rows="4"
			></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click.prevent="maybeSubmitForm" icon="el-icon-s-promotion">
				{{ this.$t('contact_me.titles.send') }}
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import axios from 'axios'

export default {
	name: 'ContactForm',
	data() {
		return {
			contactForm: {
				name: '',
				email: '',
				message: '',
			},
			rules: {
				name: [
					{ required: true, message: '¡Sin un nombre, no sé a quién dirigirme!', trigger: 'blur' },
					{ min: 3, message: 'Un poco corto, ¿no te parece?', trigger: 'blur' },
					{ max: 20, message: '¡Un nombre tan largo no sé ni cómo agendarlo!', trigger: 'blur' },
				],
				email: [
					{ required: true, message: 'Si no me ponés tu email, ¿cómo te respondo?', trigger: 'blur' },
					{ pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: '¿Estás seguro que ese es tu correo?', trigger: 'blur' },
				],
				message: [
					{ required: true, message: '¡Si no me escribís nada, no sé qué responderte!', trigger: 'blur' },
					{ min: 20, message: 'Seguro tenés algo más para contarme... ¡Ánimo!', trigger: 'blur' },
				],
			},
		}
	},
	methods: {
		encode(data) {
			return Object.keys(data)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
				.join('&')
		},

		submitForm() {
			const formData = this.encode({
				'form-name': 'contact-form',
				...this.contactForm,
			})

			axios
				.post('/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: formData,
				})
				.then(() => console.log('yay!'))
				.catch((error) => alert(error))
		},

		maybeSubmitForm() {
			this.$refs['contact-form'].validate((valid) => {
				if (!valid) {
					console.error('There was a problem!')
					return false
				}

				this.submitForm()
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.contact-form {
	max-width: 80%;
	margin: 2rem auto 0;
}
</style>
