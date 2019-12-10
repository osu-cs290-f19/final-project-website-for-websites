function insertNewPost(postCateg, postTitle, postLink, postPoster/*, postComments*/) {
  var postContext = {
   category: postCateg,
   title: postTitle,
   link: postLink,
   poster: postPoster,
   comments: /*postComments*/[]
  };

  //console.log("postContext = ", postContext);
  var postHTML = Handlebars.templates.postHandleFile(postContext);
  //console.log("postHTML = ", postHTML);

  var postList = document.getElementById('posts');
  postList.insertAdjacentHTML('beforeend', postHTML);
}


var allPosts = [];

/*
 * This function checks whether all of the required inputs were supplied by
 * the user and, if so,i nserting a new post into the page constructed using
 * these inputs.  If the user did not supply a required input, they instead
 * recieve an alert, and no new post is inserted.
 */
function handleModalInsert()
{
  var title = document.getElementById('post-title-input').value.trim();
  var link = document.getElementById('post-link-input').value.trim();
  var poster = document.getElementById('poster-name-input').value.trim();
  var category = document.getElementById('post-categ-input').value.trim();
  //var condition = document.querySelector('#post-condition-fieldset input:checked').value;

  if (!title || !link || !poster || !category) {
    alert("You must fill in all of the fields!");
  } else {

    allPosts.push({
      category: category,
      title: title,
      link: link,
      poster: poster,
      comments: []
    });
    insertNewPost(category, title, link, poster/*, postComments*/)

    title.value = "";
    link.value = "";
    poster.value = "";
    category.value = "";

    hideInsertModal();
  }
}


function handleModalFilter()
{
  hideFilterModal();
}


function applyNewCategories()
{
  console.log("applying new categories");
}

function showInsertModal()
{
  var insertModal = document.getElementById('create-new-post-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  alert("showing insert modal");

  insertModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');
}

function hideInsertModal()
{

  var insertModal = document.getElementById('create-new-post-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  insertModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  alert("hiding insert modal");

  document.getElementById('post-title-input').value = "";
  document.getElementById('post-link-input').value = "";
  document.getElementById('poster-name-input').value = "";
  document.getElementById('post-categ-input').value = "";
}


function showFilterModal() {
  var searchModal = document.getElementById('search-something');
  var modalBackdrop = document.getElementById('modal-backdrop');

  alert("showing filter modal");

  searchModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');
}

function hideFilterModal()
{
  var searchModal = document.getElementById('search-something');
  var modalBackdrop = document.getElementById('modal-backdrop');

  alert("hiding filter modal");

  searchModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  document.getElementById('search-text-input').value = "";
}


function showCategModal()
{
  var categModal = document.getElementById('choose-categories-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  alert("showing categories modal");

  categModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');
}

function hideCategModal()
{

  var categModal = document.getElementById('choose-categories-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  alert("hiding categories modal");

  categModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');
}


//Wait until the DOM content is loaded, and then hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function ()
{
  //Remember all of the initial post elements initially displayed in the page.
  var postElems = document.getElementsByClassName('post');
  for (var i = 0; i < postElems.length; i++) {
    allPosts.push(parsePostElem(postElems[i]));
  }

  //insert modal event listeners
  var insertButton = document.getElementById('create-new-post');
  if (insertButton) {
    insertButton.addEventListener('click', showInsertModal);
  }

  var insertAcceptButton = document.getElementById('modal-accept');
  if (insertAcceptButton) {
    insertAcceptButton.addEventListener('click', handleModalInsert);
  }

  var insertHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < insertHideButtons.length; i++) {
    insertHideButtons[i].addEventListener('click', hideInsertModal);
  }


  //search modal event listeners
  var searchButton = document.getElementById('filter-input-container');
  if (searchButton) {
    searchButton.addEventListener('click', showFilterModal);
  }

  var searchAcceptButton = document.getElementById('modal-accept');
  if (searchAcceptButton) {
    searchAcceptButton.addEventListener('click', handleModalFilter);
  }

  var searchHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < searchHideButtons.length; i++) {
    searchHideButtons[i].addEventListener('click', hideFilterModal);
  } //there's no apply/cancel buttons in the search modal


  //categories modal event listeners
  var categButton = document.getElementById('show-categories');
  if (categButton) {
    categButton.addEventListener('click', showCategModal);
  }

  var categApplyButton = document.getElementById('categ-modal-accept');
  if (categApplyButton) {
    categApplyButton.addEventListener('click', showCategModal);
  }

  var categHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < categHideButtons.length; i++) {
    categHideButtons[i].addEventListener('click', hideCategModal);
  }
});



/*
 * This function parses an existing DOM element representing a single post
 * into an object representing that post and returns that object.  The object
 * is structured like this:
 *
 * {
 *   category: "...",
 *   title: "...",
 *   link: ...,
 *   poster: "...",
 *   comments: []
 * }
 */
function parsePostElem(postElem) {
  var post = {
    category: postElem.getAttribute('category'),
    title: postElem.getAttribute('title'),
    link: postElem.getAttribute('link'),
    poster: postElem.getAttribute('poster'),
    comments: []//should be fixed
  };

  return post;
}
