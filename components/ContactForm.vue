<template>
	<div class="contact-form">
		<el-form
			name="contact-form"
			:model="contactForm"
			:rules="rules"
			ref="contact-form"
			label-width="auto"
			label-position="right"
			data-netlify="true"
			netlify-honeypot="fake"
			status-icon
			v-show="!formSent"
		>
			<input type="hidden" name="form-name" value="contact-form" />
			<input v-show="false" name="fake" />

			<el-form-item :label="this.$t('contact_me.form.fields.name')" prop="name">
				<el-input
					name="name"
					v-model="contactForm.name"
					:placeholder="this.$t('contact_me.form.placeholders.name')"
				></el-input>
			</el-form-item>

			<el-form-item :label="this.$t('contact_me.form.fields.email')" prop="email">
				<el-input
					name="email"
					v-model="contactForm.email"
					type="email"
					:placeholder="this.$t('contact_me.form.placeholders.email')"
				></el-input>
			</el-form-item>

			<el-form-item :label="this.$t('contact_me.form.fields.message')" prop="message">
				<el-input
					name="message"
					type="textarea"
					v-model="contactForm.message"
					:placeholder="this.$t('contact_me.form.placeholders.message')"
					:rows="4"
				></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click.prevent="maybeSubmitForm" icon="el-icon-s-promotion">
					{{ this.$t('contact_me.form.fields.send') }}
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'ContactForm',
	data() {
		return {
			formSent: false,
			contactForm: {
				name: '',
				email: '',
				message: '',
				fake: '',
			},
			rules: {
				name: [
					{ required: true, message: this.$t('contact_me.form.messages.name_empty'), trigger: 'blur' },
					{ min: 3, message: this.$t('contact_me.form.messages.name_short'), trigger: 'blur' },
				],
				email: [
					{ required: true, message: this.$t('contact_me.form.messages.email_empty'), trigger: 'blur' },
					{
						pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/,
						message: this.$t('contact_me.form.messages.email_wrong'),
						trigger: 'blur',
					},
				],
				message: [
					{ required: true, message: this.$t('contact_me.form.messages.message_empty'), trigger: 'blur' },
					{ min: 20, message: this.$t('contact_me.form.messages.message_short'), trigger: 'blur' },
				],
			},
		}
	},
	methods: {
		encode(data) {
			const formData = new FormData()

			for (const key of Object.keys(data)) {
				formData.append(key, data[key])
			}

			return formData
		},

		submitForm() {
			const axiosConfig = {
				header: { 'Content-Type': 'application/x-www-form-urlencoded' },
			}

			const formData = this.encode({
				'form-name': 'contact-form',
				...this.contactForm,
			})

			axios
				.post(location.href, formData, axiosConfig)
				.then(() => {
					this.formSubmitted()
				})
				.catch((error) => {
					this.$notify({
						title: this.$t('contact_me.titles.form_error'),
						message: this.$t('contact_me.copy.form_error'),
						type: 'error',
						position: 'bottom-right',
					})
				})
		},

		maybeSubmitForm() {
			this.$refs['contact-form'].validate((valid) => {
				if (!valid) return false

				this.submitForm()
			})
		},

		formSubmitted() {
			this.$refs['contact-form'].resetFields()

			this.$notify({
				title: this.$t('contact_me.titles.form_success'),
				message: this.$t('contact_me.copy.form_success'),
				type: 'success',
				position: 'bottom-right',
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.contact-form {
	@include breakpoint('medium') {
		max-width: none;
	}

	@include breakpoint('small') {
		::v-deep .el-form-item > * {
			float: none !important;
			margin-left: 0 !important;
		}
	}
}
</style>
