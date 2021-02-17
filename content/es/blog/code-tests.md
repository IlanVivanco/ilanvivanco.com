---
title: Code Tests
description: Post de pruebas.
thumbnail: 'images/blog/snippet.png'
tags: ['Testing']
date: 2021-01-01
show: false
languages:
   - locale: en
     path: /en/portfolio/example-portfolio
---

<style>
	.post-header{
		display: hidden;
	}

	.nuxt-content-highlight pre {
		padding-top: 3rem;
		box-shadow: rgb(0 0 0 / 55%) 0px 17px 25px;
		width: 85%;
		margin: 10rem auto;
		position: relative;
	}

	.nuxt-content-highlight pre::before {
		content: '';
		display: block;
		width: 12px;
		height: 12px;
		background: #E0443E;
		border-radius: 50%;
		position: absolute;
		top: 12px;
		left: 12px;
	}

	.nuxt-content-highlight pre::after {
		content: '';
		display: block;
		width: 12px;
		height: 12px;
		background: #DEA123;
		border-radius: 50%;
		position: absolute;
		top: 12px;
		left: 30px;
	}

	.nuxt-content-highlight code::before {
		content: '';
		display: block;
		width: 12px;
		height: 12px;
		background: #1AAB29;
		border-radius: 50%;
		position: absolute;
		top: 12px;
		left: 48px;
	}
</style>

```css
.icon {
	--scale: 1;
	font-size: 14px;
	content: 'asdasd';

	/* this works */
	font-size: calc(var(--scale) * 1rem);
}
```
