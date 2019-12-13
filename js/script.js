"use strict";

const templates = {
	articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
	tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
	authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
	tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
	authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}


const optArticleSelector = ".post",
	optTitleSelector = ".post-title",
	optTitleListSelector = ".titles",
	optArticleTagsSelector = ".post-tags .list",
	optArticleAuthorsSelector = ".post-author",
	optTagsListSelector = ".tags.list",
	optAuthorsListSelector = ".authors.list",
	optCloudClassCount = 5,
	optCloudClassPrefix = "tag-size-";
;

const titleClickHandler = function (event) {
	event.preventDefault();
	const clickedElement = this;

	/* [DONE] remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll(".titles a.active");

	for (let activeLink of activeLinks) {
		activeLink.classList.remove("active");
	}

	/* [DONE] add class 'active' to the clicked link */
	clickedElement.classList.add("active");

	/* [DONE] remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll(".posts .active");

	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove("active");
	}

	/* [DONE] get 'href' attribute from the clicked link */
	const articleSelector = clickedElement.getAttribute("href");

	/* [DONE] find the correct article using the selector (value of 'href' attribute) */
	const targetArticle = document.querySelector(articleSelector);

	/* [DONE] add class 'active' to the correct article */
	targetArticle.classList.add("active");
	//console.log(targetArticle);
};

function generateTitleLinks(customSelector = '') {
	/* remove contents of titleList */
	const articles = document.querySelectorAll(optArticleSelector + customSelector);
	const titleList = document.querySelector(optTitleListSelector);
	titleList.innerHTML = "";

	/* for each article */
	let html = "";

	for (let article of articles) {

		/* get the article id */
		const articleId = article.getAttribute("id");

		/* find the title element */
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;

		/* get the title from the title element [COMPLEATED WITH ABOVE LINE] */

		/* create HTML of the link */
		const linkHTMLData = { id: articleId, title: articleTitle };
		const linkHTML = templates.articleLink(linkHTMLData);

		/* insert link into titleList */
		html = html + linkHTML;
	}
	titleList.innerHTML = html;

	const links = document.querySelectorAll(".titles a");
	console.log(links);
	for (let link of links) {
		link.addEventListener("click", titleClickHandler);
	};
}


generateTitleLinks();



function calculateTagsParams(tags) {
	const params = {
		min: 999999,
		max: 0
	};
	for (let tag in tags) {
		params.max = tags[tag] > params.max ? tags[tag] : params.max;
		params.min = tags[tag] < params.min ? tags[tag] : params.min;
	}
	return params;
}

function calculateTagClass(count, params) {
	const normalizedCount = count - params.min;
	const normalizedMax = params.max - params.min;
	const percentage = normalizedCount / normalizedMax;
	const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
	return optCloudClassPrefix + classNumber;
}


function generateTags() {
	/* [NEW] create a new variable allTags with an empty object */
	let allTags = {};

	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);

	/* START LOOP: for every article: */
	for (let article of articles) {

		/* find tags wrapper */
		const tagsList = article.querySelector(optArticleTagsSelector);
		tagsList.innerHTML = "";

		/* make html variable with empty string */
		let html = "";

		/* get tags from data-tags attribute */
		const articleTags = article.getAttribute("data-tags");

		/* split tags into array */
		const articleTagsArray = articleTags.split(' ');

		/* START LOOP: for each tag */
		for (let tag of articleTagsArray) {

			/* generate HTML of the link */
			const linkHTMLData = { tag: tag };
			const linkHTML = templates.tagLink(linkHTMLData);

			/* add generated code to html variable */
			html = html + linkHTML;

			/* [NEW] check if this link is NOT already in allTags */
			if (!allTags.hasOwnProperty(tag)) {
				/* [NEW] add tag to allTags object*/
				allTags[tag] = 1;
			} else {
				allTags[tag]++;
			}
			/* END LOOP: for each tag */
		}

		/* insert HTML of all the links into the tags wrapper */
		tagsList.innerHTML = html;

		/* END LOOP: for every article: */
	}
	/* [NEW] find list of tags in right column */
	const tagList = document.querySelector('.tags');
	const tagsParams = calculateTagsParams(allTags);

	/* [NEW] create variable for all links HTML code */
	const allTagsData = { tags: [] };

	/*[NEW] START LOOP: for each tag in allTags: */
	for (let tag in allTags) {
		/* [NEW] generate code of a link and add it to allTagsHTML */

		allTagsData.tags.push({
			tag: tag,
			count: allTags[tag],
			className: calculateTagClass(allTags[tag], tagsParams)
		});
		/* [NEW] END LOOP: for each tag in allTahs: */
	}

	/* [NEW] add html from allTagsHTML to tagList */
	tagList.innerHTML = templates.tagCloudLink(allTagsData);
}


generateTags();

function tagClickHandler(event) {
	/* prevent default action for this event */
	event.preventDefault();

	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;

	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute("href");

	/* make a new constant "tag" and extract tag from the "href" constant */
	const tag = href.replace('#tag-', '');

	/* find all tag links with class active */
	const activeTags = document.querySelectorAll('a.active[href^="#tag - "]');

	/* START LOOP: for each active tag link */
	for (let activeTag of activeTags) {

		/* remove class active */
		activeTag.classList.remove("active");

		/* END LOOP: for each active tag link */
	}
	/* find all tag links with "href" attribute equal to the "href" constant */
	const tagLinks = document.querySelectorAll('.post-tags a[href*=' + tag + ']');

	/* START LOOP: for each found tag link */
	for (let targetTag of tagLinks) {

		/* add class active */
		targetTag.classList.add("active");

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


function calculateAuthorsParams(authors) {
	const params = {
		min: 999999,
		max: 0
	};
	for (let author in authors) {
		params.max = authors[author] > params.max ? authors[author] : params.max;
		params.min = authors[author] < params.min ? authors[author] : params.min;
	}
	return params;
}

function calculateAuthorsClass(count, params) {
	const normalizedCount = count - params.min;
	const normalizedMax = params.max - params.min;
	const percentage = normalizedCount / normalizedMax;
	const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
	return optCloudClassPrefix + classNumber;
}

function generateAuthors() {
	/* [NEW] create a new variable allAuthors with an empty object */
	let allAuthors = {};

	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);

	/* START LOOP: for every article: */
	for (let article of articles) {

		/* find author wrapper */
		const authorContainer = article.querySelector(optArticleAuthorsSelector);

		/* make html variable with empty string */

		/* get author from data-authors attribute */
		const articleAuthor = article.getAttribute("data-author");

		/* generate HTML of the link */
		if (!allAuthors.hasOwnProperty(articleAuthor)) {
			/* [NEW] add author to authors object*/
			allAuthors[articleAuthor] = 1;
		} else {
			allAuthors[articleAuthor]++;
		}
		/* insert HTML of all the links into the authors wrapper */
		const linkHTMLData = { author: articleAuthor };
		const linkHTML = templates.authorLink(linkHTMLData);
		authorContainer.innerHTML = linkHTML;
		/* END LOOP: for every article: */
	}
	/* [NEW] find list of articles in right column */
	const authorList = document.querySelector('.authors');
	const authorsParams = calculateAuthorsParams(allAuthors);
	const allAuthorsData = { authors: [] };

	/*[NEW] START LOOP: for each tag in allTags: */
	for (let articleAuthor in allAuthors) {
		allAuthorsData.authors.push({
			author: articleAuthor,
			count: allAuthors[articleAuthor],
			className: calculateAuthorsClass(allAuthors[articleAuthor], authorsParams)
		});
	}
	/* [NEW] add html from allTagsHTML to tagList */
	authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthors();

function authorsClickHandler(event) {
	/* prevent default action for this event */
	event.preventDefault();

	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;

	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute("href");

	/* make a new constant "author" and extract tag from the "href" constant */
	const author = href.replace('#author-', '');

	/* find all authors links with class active */
	const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

	/* START LOOP: for each active tag link */
	for (let activeAuthor of activeAuthors) {

		/* remove class active */
		activeAuthor.classList.remove("active");

		/* END LOOP: for each active tag link */
	}
	/* find all tag links with "href" attribute equal to the "href" constant */
	const authorsLinks = document.querySelectorAll('.post-author a[href="#author-' + author + '"]');

	/* START LOOP: for each found tag link */
	for (let targetAuthor of authorsLinks) {

		/* add class active */
		targetAuthor.classList.add("active");

		/* END LOOP: for each found author link */
	}
	generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
	/* find all links to tags */
	const authors = document.querySelectorAll('a[href^="#author-"]');

	/* START LOOP: for each link */
	for (let author of authors) {

		/* add tagClickHandler as event listener for that link */
		author.addEventListener("click", authorsClickHandler);

		/* END LOOP: for each link */
	}
}
addClickListenersToAuthors();

function addClickListenersToReset() {
	const resetLink = document.querySelector(".section-title a.reset");
	resetLink.addEventListener("click", function () {
		generateTitleLinks();
	})
}
addClickListenersToReset();