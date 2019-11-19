"use strict";

const titleClickHandler = function (event) {
	event.preventDefault();
	const clickedElement = this;
	//console.log("Link was clicked!");

	/* [DONE] remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll(".titles a.active");

	for (let activeLink of activeLinks) {
		activeLink.classList.remove("active");
	}

	/* [DONE] add class 'active' to the clicked link */
	//console.log("clickedElement:", clickedElement);
	clickedElement.classList.add("active");

	/* [DONE] remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll(".posts .active");

	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove("active");
	}

	/* [DONE] get 'href' attribute from the clicked link */
	const articleSelector = clickedElement.getAttribute("href");
	//console.log(articleSelector);

	/* [DONE] find the correct article using the selector (value of 'href' attribute) */
	const targetArticle = document.querySelector(articleSelector);
	//console.log(targetArticle);

	/* [DONE] add class 'active' to the correct article */
	//console.log("clickedElement:", clickedElement);
	targetArticle.classList.add("active");
};

const optArticleSelector = ".post",
	optTitleSelector = ".post-title",
	optTitleListSelector = ".titles",
	optArticleTagsSelector = ".post-tags .list",
	optArticleAuthorsSelector = ".post-author";

function generateTitleLinks(customSelector = '') {
	/* remove contents of titleList */
	const articles = document.querySelectorAll(optArticleSelector + customSelector);

	const titleList = document.querySelector(optTitleListSelector);
	titleList.innerHTML = "";
	//console.log(titleList);

	/* for each article */

	let html = "";

	for (let article of articles) {

		/* get the article id */
		const articleId = article.getAttribute("id");
		//console.log(articleId);

		/* find the title element */
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;
		// console.log(articleTitle);

		/* get the title from the title element [COMPLEATED WITH ABOVE LINE] */

		/* create HTML of the link */
		const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + "</span></a></li>";
		/* console.log(linkHTML); */

		/* insert link into titleList */
		html = html + linkHTML;
		//console.log(customSelector);
	}
	titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll(".titles a");
/* console.log(links); */

for (let link of links) {
	link.addEventListener("click", titleClickHandler);
};

function generateTags() {
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);

	/* START LOOP: for every article: */
	for (let article of articles) {

		/* find tags wrapper */
		const tagsList = article.querySelector(optArticleTagsSelector);
		tagsList.innerHTML = "";
		// console.log(tagsList);

		/* make html variable with empty string */
		let html = "";

		/* get tags from data-tags attribute */
		const articleTags = article.getAttribute("data-tags");
		// console.log(articleTags);

		/* split tags into array */
		const articleTagsArray = articleTags.split(' ');
		// console.log(articleTagsArray);

		/* START LOOP: for each tag */
		for (let tag of articleTagsArray) {
			// console.log(tag);

			/* generate HTML of the link */
			const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
			// console.log(linkHTML);

			/* add generated code to html variable */
			html = html + linkHTML;

			/* END LOOP: for each tag */
		}

		/* insert HTML of all the links into the tags wrapper */
		tagsList.innerHTML = html;

		/* END LOOP: for every article: */
	}
}

generateTags();

function tagClickHandler(event) {
	/* prevent default action for this event */
	event.preventDefault();

	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;

	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute("href");
	//console.log(href);
	/* make a new constant "tag" and extract tag from the "href" constant */
	const tag = href.replace('#tag-', '');
	//console.log(tag);
	/* find all tag links with class active */
	const activeTags = document.querySelectorAll('a.active[href^="#tag - "]');
	//console.log(activeTags);

	/* START LOOP: for each active tag link */
	for (let activeTag of activeTags) {

		/* remove class active */
		activeTag.classList.remove("active");

		/* END LOOP: for each active tag link */
	}
	/* find all tag links with "href" attribute equal to the "href" constant */
	const tagLinks = document.querySelectorAll('.post-tags a[href*=' + tag + ']');
	// console.log(tagSelector);
	/* START LOOP: for each found tag link */
	for (let targetTag of tagLinks) {

		/* add class active */
		targetTag.classList.add("active");
		//console.log(targetTag);
		/* END LOOP: for each found tag link */
	}

	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
	/* find all links to tags */
	const tags = document.querySelectorAll('a[href^="#tag-"]');

	/* START LOOP: for each link */
	for (let tag of tags) {

		/* add tagClickHandler as event listener for that link */
		tag.addEventListener("click", tagClickHandler);

		/* END LOOP: for each link */
	}
}

addClickListenersToTags();

// generating authors

function generateAuthors() {
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);

	/* START LOOP: for every article: */
	for (let article of articles) {

		/* find tags wrapper */
		const author = article.querySelector(optArticleAuthorsSelector);
		author.innerHTML = "";
		//console.log(author);

		/* make html variable with empty string */
		let html = "";

		/* get tags from data-tags attribute */
		const articleAuthors = article.getAttribute("data-author");
		//console.log(articleAuthors);

		/* generate HTML of the link */
		const linkHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + "</a>";
		html = html + linkHTML;

		/* insert HTML of all the links into the tags wrapper */
		author.innerHTML = html;
		console.log(html);

		/* END LOOP: for every article: */
	}
}

generateAuthors();

function authorsClickHandler(event) {
	/* prevent default action for this event */
	event.preventDefault();

	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;

	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute("href");
	console.log(href);

	/* make a new constant "tag" and extract tag from the "href" constant */
	//const author = href.replace('#tag-', '');
	//console.log(tag);

	/* find all tag links with class active */
	//const activeTags = document.querySelectorAll('a.active[href^="#tag - "]');
	//console.log(activeTags);

	/* START LOOP: for each active tag link */
	//for (let activeTag of activeTags) {

	/* remove class active */
	//		activeTag.classList.remove("active");

	/* END LOOP: for each active tag link */
	//	}
	/* find all tag links with "href" attribute equal to the "href" constant */
	//	const tagLinks = document.querySelectorAll('.post-tags a[href*=' + tag + ']');
	// console.log(tagSelector);
	/* START LOOP: for each found tag link */
	//	for (let targetTag of tagLinks) {

	/* add class active */
	//		targetTag.classList.add("active");
	//		console.log(targetTag);
	/* END LOOP: for each found tag link */

	authorsClickHandler('[data-author="' + tag + '"]');
}

/* execute function "generateTitleLinks" with article selector as argument */
//	generateTitleLinks('[data-tags~="' + tag + '"]');
//}
