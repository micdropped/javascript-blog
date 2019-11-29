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
	optArticleAuthorsSelector = ".post-author",
	optTagsListSelector = ".tags.list",
	optCloudClassCount = 5,
	optCloudClassPrefix = "tag-size-";

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
		//console.log(articleTitle);

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

function calculateTagsParams() {
	const params = {
		min: 999999,
		max: 0
	};
	/*for (let tag in tags) {
		if (tags[tag] > params.max) {
			params.max = tags[tag];
		}
		else if (tags[tag] < params.min) {
			params.min = tags[tag];
		}
	}
	return params;
	console.log(tag + ' is used ' + tags[tag] + ' times');
*/
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
	console.log('tagsParams:', tagsParams);
	/* [NEW] create variable for all links HTML code */
	let allTagsHTML = '';

	/*[NEW] START LOOP: for each tag in allTahs: */
	for (let tag in allTags) {
		/* [NEW] generate code of a link and add it to allTagsHTML */
		allTagsHTML += tag + ' (' + allTags[tag] + ') ';
	}
	/* [NEW] END LOOP: for each tag in allTahs: */

	/* [NEW] add html from allTahsHTML to tagList */
	tagList.innerHTML = allTagsHTML;
	console.log(allTags);

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
	console.log(tagLinks);
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

		/* generating author tag name*/
		//const authorSelector = articleAuthors.replace(" ", "");
		//console.log(authorSelector);

		/* generate HTML of the link */
		const linkHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + "</a>";
		html = html + linkHTML;
		console.log(linkHTML);
		/* insert HTML of all the links into the tags wrapper */
		author.innerHTML = html;
		//console.log(html);

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

	/* make a new constant "author" and extract tag from the "href" constant */
	const author = href.replace('#author-', '');
	console.log(author);

	/* find all authors links with class active */
	const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
	console.log(activeAuthors);

	/* START LOOP: for each active tag link */
	for (let activeAuthor of activeAuthors) {

		/* remove class active */
		activeAuthor.classList.remove("active");

		/* END LOOP: for each active tag link */
	}
	/* find all tag links with "href" attribute equal to the "href" constant */
	const authorsLinks = document.querySelectorAll('.post-author a[href="#author-' + author + '"]');
	console.log(authorsLinks);

	/* START LOOP: for each found tag link */
	for (let targetAuthor of authorsLinks) {

		/* add class active */
		//clickedElement.classList.add("active");

		targetAuthor.classList.add("active");

		/* END LOOP: for each found author link */
		console.log(targetAuthor);
		console.log(targetAuthor.text);
	}
	//let dataAuthor = authorsLinks.innerText;
	//let articleAuthor = targetAuthor.text;
	//log(articleAuthor);

	generateTitleLinks('[data-author="' + author + '"]');
}


/* execute function "generateTitleLinks" with article selector as argument */
//	generateTitleLinks('[data-tags~="' + tag + '"]');
//}


function addClickListenersToAuthors() {
	/* find all links to tags */
	const authors = document.querySelectorAll('a[href^="#author-"]');
	//console.log(authors);
	/* START LOOP: for each link */
	for (let author of authors) {

		/* add tagClickHandler as event listener for that link */
		author.addEventListener("click", authorsClickHandler);

		/* END LOOP: for each link */
	}
}
addClickListenersToAuthors();

